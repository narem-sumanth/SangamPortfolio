"use client"

import { useEffect, useState } from "react"
import { Rnd } from "react-rnd"
import SoundHover from "../PlaySound/HoverSound"
import { ChevronDown, PictureInPicture2, X } from "lucide-react"

export default function Window({
  title,
  children,
  onClose,
  onActivate,
  child,
  width,
  height,
}: {
  title: string
  children: React.ReactNode
  onClose: () => void
  onActivate: () => void
  child: number
  width: number
  height: number
}) {

  const DESKTOP_TOP_OFFSET = 60
  const MOBILE_TOP_OFFSET = 50
  const MARGIN = 0
  const STACK_OFFSET = 20
  const MOBILE_BREAKPOINT = 640
  const getTopOffset = (viewportWidth: number) =>
    viewportWidth <= MOBILE_BREAKPOINT ? MOBILE_TOP_OFFSET : DESKTOP_TOP_OFFSET

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= MOBILE_BREAKPOINT : false
  )

  const DEFAULT_WIDTH = typeof window !== "undefined"
    ? (window.innerWidth <= MOBILE_BREAKPOINT
      ? window.innerWidth
      : Math.min(width, window.innerWidth - MARGIN * 2))
    : width

  const DEFAULT_HEIGHT =
    typeof window !== "undefined"
      ? (() => {
        const topOffset = getTopOffset(window.innerWidth)
        return window.innerWidth <= MOBILE_BREAKPOINT
          ? window.innerHeight - topOffset
          : Math.min(height, window.innerHeight - topOffset - MARGIN)
      })()
      : height

  const getCenteredPosition = (
    windowWidth: number,
    windowHeight: number,
    width: number,
    height: number,
    offset: number,
    topOffset: number
  ) => ({
    x: Math.min(
      Math.max(MARGIN, windowWidth - width - MARGIN),
      Math.max(MARGIN, (windowWidth - width) / 2 + offset)
    ),
    y: Math.min(
      Math.max(topOffset, windowHeight - height - MARGIN),
      Math.max(topOffset, (windowHeight - height) / 2 + offset)
    ),
  })

  const [dragging, setDragging] = useState(false)
  const [animate, setAnimate] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)

  const [size, setSize] = useState({
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  })

  const [position, setPosition] = useState(() => {
    if (typeof window === "undefined") return { x: 0, y: DESKTOP_TOP_OFFSET }
    const offset = child * STACK_OFFSET
    const mobileViewport = window.innerWidth <= MOBILE_BREAKPOINT
    const topOffset = getTopOffset(window.innerWidth)

    if (mobileViewport) {
      return { x: 0, y: topOffset }
    }

    return getCenteredPosition(
      window.innerWidth,
      window.innerHeight,
      DEFAULT_WIDTH,
      DEFAULT_HEIGHT,
      offset,
      topOffset
    )
  })

  const [restoreBounds, setRestoreBounds] = useState<{
    size: { width: number; height: number }
    position: { x: number; y: number }
  } | null>(null)

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setAnimate(true)
    })
    return () => cancelAnimationFrame(id)
  }, [])

  /**
   * Handle viewport resize
   */
  useEffect(() => {

    const handleResize = () => {
      const mobileViewport = window.innerWidth <= MOBILE_BREAKPOINT
      const topOffset = getTopOffset(window.innerWidth)
      const nextWidth = mobileViewport
        ? window.innerWidth
        : Math.min(size.width, window.innerWidth - MARGIN * 2)
      const nextHeight = mobileViewport
        ? window.innerHeight - topOffset
        : Math.min(size.height, window.innerHeight - topOffset - MARGIN)

      setIsMobile(mobileViewport)
      setSize((prev) => (
        prev.width === nextWidth && prev.height === nextHeight
          ? prev
          : { width: nextWidth, height: nextHeight }
      ))

      setPosition((prev) => ({
        x: mobileViewport ? 0 : Math.max(MARGIN, Math.min(prev.x, window.innerWidth - nextWidth - MARGIN)),
        y: mobileViewport ? topOffset : Math.max(topOffset, Math.min(prev.y, window.innerHeight - nextHeight - MARGIN)),
      }))

      if (mobileViewport && isMaximized) {
        setIsMaximized(false)
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize()
    return () => window.removeEventListener("resize", handleResize)

  }, [isMaximized, size.height, size.width])

  /**
   * Sync maximized window
   */
  useEffect(() => {

    if (!isMaximized) return

    const syncToViewport = () => {
      const topOffset = getTopOffset(window.innerWidth)
      setPosition({ x: 0, y: topOffset })
      setSize({
        width: window.innerWidth,
        height: window.innerHeight - topOffset,
      })
    }

    window.addEventListener("resize", syncToViewport)
    return () => window.removeEventListener("resize", syncToViewport)

  }, [isMaximized])

  const handleClose = () => {
    setAnimate(false)
    setTimeout(() => onClose(), isMobile ? 300 : 200)
  }

  const handleMaximizeToggle = () => {

    if (typeof window === "undefined" || isMobile) return

    if (isMaximized) {
      if (restoreBounds) {
        setSize(restoreBounds.size)
        setPosition(restoreBounds.position)
      }
      setIsMaximized(false)
      return
    }

    setRestoreBounds({
      size,
      position,
    })

    const topOffset = getTopOffset(window.innerWidth)
    setPosition({ x: 0, y: topOffset })
    setSize({
      width: window.innerWidth,
      height: window.innerHeight - topOffset,
    })

    setIsMaximized(true)
  }

  return (
    <Rnd
      size={size}
      position={position}
      minWidth={300}
      minHeight={200}
      maxWidth={isMaximized ? undefined : (typeof window !== "undefined" ? window.innerWidth - MARGIN * 2 : undefined)}
      maxHeight={isMaximized ? undefined : (typeof window !== "undefined" ? window.innerHeight - getTopOffset(window.innerWidth) : undefined)}
      bounds={isMaximized ? undefined : "window"}
      dragHandleClassName="window-header"
      cancel=".window-action-btn, .window-action-btn *"
      enableResizing={!isMaximized && !isMobile}
      disableDragging={isMaximized || isMobile}
      onDragStart={() => setDragging(true)}
      onDragStop={(_e, data) => {
        setDragging(false)
        setPosition({ x: data.x, y: data.y })
      }}
      onResizeStop={(_e, _direction, ref, _delta, nextPosition) => {
        setSize({
          width: parseFloat(ref.style.width),
          height: parseFloat(ref.style.height),
        })
        setPosition(nextPosition)
      }}
      className="window-rnd"
      style={{ zIndex: 45 + child + 1, position: "fixed" }}
    >

      <div
        onMouseDownCapture={onActivate}
        onTouchStartCapture={onActivate}
        className={`bg-window-bg sm:border-2 sm:border-window-border rounded-xl shadow-flat overflow-hidden h-full flex flex-col ${isMobile ? "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]" : "transition-[opacity,transform] duration-200 ease-out"}
        ${isMobile
            ? (animate ? "translate-y-0" : "translate-y-full")
            : (animate ? "scale-100 opacity-100" : "scale-90 opacity-0")
          }`}>

        {/* header */}
        <div
          className={`window-header text-white dark:text-background sm:dark:text-white font-medium flex justify-between items-center dark:bg-white bg-window-header sm:dark:bg-window-header sm:bg-window-header px-6 py-2 rounded-t-[11px] border-b-2 border-window-border`}
        >
          <span className="text-lg">{title}</span>
          <div className="flex items-center justify-center gap-2">
            {!isMobile && (
              <SoundHover playType="click" src="assets/original/sounds/click_close.mp3" vol={0.5}>
                <button
                  onClick={handleMaximizeToggle}
                  onTouchStart={(e) => e.stopPropagation()}
                  className="window-action-btn hover:opacity-60 flex items-center justify-center hover:bg-slate-100/10 rounded-sm"
                  aria-label={isMaximized ? "Restore window" : "Maximize window"}
                >
                  {/* <PictureInPicture2 size={20} className="" /> */}
                  <div className="relative p-1.5 size-8 flex items-center justify-center">
                    <div className="size-3 border-2 rounded-xs absolute -mt-1"></div>
                    <div className="size-3 border-2 rounded-xs absolute mt-1 -ml-1 bg-window-header"></div>
                  </div>
                </button>
              </SoundHover>
            )}
            <SoundHover playType="click" src="assets/original/sounds/click_close.mp3" vol={0.5}>
              <button
                onClick={handleClose}
                onTouchStart={(e) => e.stopPropagation()}
                className="window-action-btn font-bold hover:opacity-60 leading-none flex items-center justify-center hover:bg-slate-100/10 rounded-sm p-1.5 size-8"
                aria-label={isMobile ? "Collapse window" : "Close window"}
              >
                {isMobile ? (
                  <ChevronDown size={22} className="" />
                ) : (
                  <X size={20} className="" />
                )}
              </button>
            </SoundHover>
          </div>
        </div>

        {/* body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {children}
        </div>

      </div>

    </Rnd>
  )
}
