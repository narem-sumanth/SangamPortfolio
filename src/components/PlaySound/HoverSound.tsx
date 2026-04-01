"use client"

import { useRef } from "react"
import { themeControls } from "@/store/theme-store"

type Props = {
  src: string
  children: React.ReactNode
  vol?: number
  playType?: "click" | "hover"
  pitch?: number
  onPlay?: () => void
  className?: string
}

export default function SoundHover({ src, children, vol = 1, playType, pitch = 1, onPlay, className }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const { volume } = themeControls();

  const playSound = () => {
    if (!audioRef.current || !volume) return

      // Disable pitch correction so playbackRate changes alter the actual pitch.
      ; (audioRef.current as HTMLAudioElement & {
        preservesPitch?: boolean
        mozPreservesPitch?: boolean
        webkitPreservesPitch?: boolean
      }).preservesPitch = false
      ; (audioRef.current as HTMLAudioElement & { mozPreservesPitch?: boolean }).mozPreservesPitch = false
      ; (audioRef.current as HTMLAudioElement & { webkitPreservesPitch?: boolean }).webkitPreservesPitch = false

    audioRef.current.volume = vol
    audioRef.current.playbackRate = pitch
    audioRef.current.currentTime = 0
    audioRef.current.play().catch(() => { })
    onPlay?.()
  }

  return (
    <>
      <audio ref={audioRef} src={src} preload="auto" />
      <div
        className={className}
        onClick={() => playType === "click" && playSound()}
        onMouseEnter={() => playType === "hover" && playSound()}
      >
        {children}
      </div>
    </>
  )
}
