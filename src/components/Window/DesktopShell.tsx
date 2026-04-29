/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client"

import { useState, useRef, useEffect } from "react"
import Draggable from "react-draggable"
import type { DraggableData, DraggableEvent } from "react-draggable"
import Window from "./Window"
import HomePopUp from "../Popups/Home"
import SoundHover from "../PlaySound/HoverSound"
import About from "../Popups/About"
import { themeControls } from "@/store/theme-store"
import Work from "../Popups/Work"
import FAQSection from "../Popups/FAQ"
import Contact from "../Popups/Contact"
import MobileNotice from "../Popups/MobileNotice"

export type WindowName = "about" | "work" | "faq" | "contact"
type WindowSize = { width: number; height: number }

const LG_BREAKPOINT = 1024

const getWindowSizes = (viewportWidth: number): Record<WindowName, WindowSize> => {
  const width = viewportWidth >= LG_BREAKPOINT ? 900 : 800

  return {
    about: { width, height: 550 },
    work: { width, height: 550 },
    faq: { width, height: 550 },
    contact: { width, height: 550 },
  }
}

export default function DesktopShell() {
  const DRAG_THRESHOLD_PX = 4
  const SUPPRESS_CLICK_MS = 120

  const { volume } = themeControls();

  const [openWindows, setOpenWindows] = useState<WindowName[]>([]);
  const [windowSizes, setWindowSizes] = useState<Record<WindowName, WindowSize>>(
    typeof window !== "undefined" ? getWindowSizes(window.innerWidth) : getWindowSizes(LG_BREAKPOINT)
  )

  const [playBgm, setPlayBgm] = useState<boolean>(false);
  const [showFrogTooltip, setShowFrogTooltip] = useState<boolean>(false);

  const dragDistance = useRef(0)
  const suppressClickUntil = useRef(0)

  const aboutRef = useRef<HTMLDivElement | null>(null)
  const workRef = useRef<HTMLDivElement | null>(null)
  const faqRef = useRef<HTMLDivElement | null>(null)
  const contactRef = useRef<HTMLDivElement | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current || !volume) return;

    if (playBgm) {
      audioRef.current.volume = 0.3;
      audioRef.current.play();
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [playBgm]);

  useEffect(() => {
    const showTimer = setTimeout(() => setShowFrogTooltip(true), 1500)
    const hideTimer = setTimeout(() => setShowFrogTooltip(false), 5500)
    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setWindowSizes(getWindowSizes(window.innerWidth))
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleClick = (name: WindowName) => {
    if (Date.now() < suppressClickUntil.current) return;

    setOpenWindows((prev) => {
      if (prev.includes(name)) {
        if (prev[prev.length - 1] === name) return prev
        return [...prev.filter((w) => w !== name), name]
      }
      return [...prev, name];
    });
  };

  const closeWindow = (name: WindowName) => {
    setOpenWindows((prev) => prev.filter((w) => w !== name));
  };

  const focusWindow = (name: WindowName) => {
    setOpenWindows((prev) => {
      const index = prev.indexOf(name)
      if (index === -1 || index === prev.length - 1) return prev
      return [...prev.filter((w) => w !== name), name]
    })
  }

  const getWindowIndex = (name: WindowName) => {
    const index = openWindows.indexOf(name)
    return index === -1 ? 0 : index
  }

  const handlePlayBgm = () => {
    setPlayBgm(!playBgm)
  }

  const handleDragStart = () => {
    dragDistance.current = 0
  }

  const handleDrag = (_e: DraggableEvent, data: DraggableData) => {
    dragDistance.current += Math.abs(data.deltaX) + Math.abs(data.deltaY)
  }

  const handleDragStop = () => {
    if (dragDistance.current > DRAG_THRESHOLD_PX) {
      suppressClickUntil.current = Date.now() + SUPPRESS_CLICK_MS
    }
  }

  return (
    <>
      <main className="relative min-h-screen">
        <HomePopUp
          handleClick={handleClick}
        />
        <audio
          ref={audioRef}
          src="/assets/original/sounds/bgm.mp3"
          loop
        />
        {/* FLOATING ICONS LEFT */}
        <div className="absolute left-6 top-24 flex flex-col gap-10">

          {/* WORK */}
          <Draggable
            nodeRef={workRef}
            onStart={handleDragStart}
            onDrag={handleDrag}
            onStop={handleDragStop}
          >
            <div ref={workRef}>
              <SoundHover playType="click" src="/assets/original/sounds/click_general.mp3" vol={0.5}>
                <button
                  className="hidden size-12 md:flex items-center justify-center flex-col"
                  onClick={() => handleClick("work")}
                >
                  <img
                    draggable={false}
                    className="size-10 hover:size-11 duration-200 block dark:hidden"
                    src="/assets/original/images/icon_work.webp"
                  />

                  <img
                    draggable={false}
                    className="size-10 hover:size-11 duration-200 hidden dark:block"
                    src="/assets/original/images/icon_work_dark.webp"
                  />

                  <div className="label">work</div>
                </button>
              </SoundHover>
            </div>
          </Draggable>

          {/* CONTACT */}
          <Draggable
            nodeRef={contactRef}
            onStart={handleDragStart}
            onDrag={handleDrag}
            onStop={handleDragStop}
          >
            <div ref={contactRef}>
              <SoundHover playType="click" src="/assets/original/sounds/click_general.mp3" vol={0.5}>
                <button
                  className="hidden size-12 md:flex items-center justify-center flex-col"
                  onClick={() => handleClick("contact")}
                >
                  <img
                    draggable={false}
                    className="size-10 hover:size-11 duration-200 block dark:hidden"
                    src="/assets/original/images/icon_contact.webp"
                  />

                  <img
                    draggable={false}
                    className="size-10 hover:size-11 duration-200 hidden dark:block"
                    src="/assets/original/images/icon_contact_dark.webp"
                  />

                  <div className="label">contact</div>
                </button>
              </SoundHover>
            </div>
          </Draggable>

          {/* ABOUT */}
          <Draggable
            nodeRef={aboutRef}
            onStart={handleDragStart}
            onDrag={handleDrag}
            onStop={handleDragStop}
          >
            <div ref={aboutRef}>
              <SoundHover playType="click" src="/assets/original/sounds/click_general.mp3" vol={0.5}>
                <button
                  className="hidden size-12 md:flex items-center justify-center flex-col"
                  onClick={() => handleClick("about")}
                >
                  <img
                    draggable={false}
                    className="size-10 hover:size-11 duration-200 block dark:hidden"
                    src="/assets/original/images/icon_about.webp"
                  />

                  <img
                    draggable={false}
                    className="size-10 hover:size-11 duration-200 hidden dark:block"
                    src="/assets/original/images/icon_about_dark.webp"
                  />

                  <div className="label">about</div>
                </button>
              </SoundHover>
            </div>
          </Draggable>

          {/* FAQ */}
          <Draggable
            nodeRef={faqRef}
            onStart={handleDragStart}
            onDrag={handleDrag}
            onStop={handleDragStop}
          >
            <div ref={faqRef}>
              <SoundHover playType="click" src="/assets/original/sounds/click_general.mp3" vol={0.5}>
                <button
                  className="hidden size-12 md:flex items-center justify-center flex-col"
                  onClick={() => handleClick("faq")}
                >
                  <img
                    draggable={false}
                    className="size-10 hover:size-11 duration-200 block dark:hidden"
                    src="/assets/original/images/icon_faq.webp"
                  />

                  <img
                    draggable={false}
                    className="size-10 hover:size-11 duration-200 hidden dark:block"
                    src="/assets/original/images/icon_faq_dark.webp"
                  />

                  <div className="label">faq</div>
                </button>
              </SoundHover>
            </div>
          </Draggable>

          <div
            className="fixed bottom-4 md:bottom-6 right-4 md:right-6 size-18 md:size-24 group"
            onClick={() => handlePlayBgm()}
          >
            {!playBgm && (
              <div className={`hidden md:block absolute bottom-full right-0 mb-3 pointer-events-none transition-[opacity,transform] duration-200 ease-out group-hover:opacity-100 group-hover:translate-y-0 ${showFrogTooltip ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}`}>
                <div className="relative bg-window-bg border-2 border-window-border rounded-xl shadow-flat px-4 py-3 text-sm whitespace-nowrap">
                  Click on frog to vibe...
                  <div className="absolute -bottom-2.25 right-4 size-3.5 bg-window-bg border-r-2 border-b-2 border-window-border rotate-45" />
                </div>
              </div>
            )}
            {playBgm ?
              <>
                <img className="group-hover hover:cursor-pointer block dark:hidden duration-300" src="assets/original/images/player/froggert_play.webp" alt="froggert" />
                <img className="group-hover hover:cursor-pointer hidden dark:block duration-300" src="assets/original/images/player/froggert_play_dark.webp" alt="froggert" />
              </> :
              <>
                <SoundHover src="/assets/original/sounds/froghover.mp3" playType="hover" vol={0.7}>
                  <img className="group-hover hover:cursor-pointer block dark:hidden duration-300" src="assets/original/images/player/froggert_stop.webp" alt="froggert" />
                  <img className="group-hover hover:cursor-pointer hidden dark:block duration-300" src="assets/original/images/player/froggert_stop_dark.webp" alt="froggert" />
                </SoundHover>
              </>
            }
          </div>
        </div>

      </main>

      {openWindows.includes("work") && (
        <Window
          title="Work"
          onClose={() => closeWindow("work")}
          onActivate={() => focusWindow("work")}
          child={getWindowIndex("work")}
          width={windowSizes.work.width}
          height={windowSizes.work.height}
        >
          <Work />
        </Window>
      )}

      {openWindows.includes("contact") && (
        <Window
          title="Contact"
          onClose={() => closeWindow("contact")}
          onActivate={() => focusWindow("contact")}
          child={getWindowIndex("contact")}
          width={windowSizes.contact.width}
          height={windowSizes.contact.height}
        >
          <Contact />
        </Window>
      )}

      {/* WINDOWS */}
      {openWindows.includes("about") && (
        <Window
          title="About"
          onClose={() => closeWindow("about")}
          onActivate={() => focusWindow("about")}
          child={getWindowIndex("about")}
          width={windowSizes.about.width}
          height={windowSizes.about.height}
        >
          <About />
        </Window>
      )}

      <MobileNotice hasOpenWindows={openWindows.length > 0} />

      {openWindows.includes("faq") && (
        <Window
          title="FAQ's"
          onClose={() => closeWindow("faq")}
          onActivate={() => focusWindow("faq")}
          child={getWindowIndex("faq")}
          width={windowSizes.faq.width}
          height={windowSizes.faq.height}
        >
          <FAQSection />
        </Window>
      )}
    </>
  )
}
