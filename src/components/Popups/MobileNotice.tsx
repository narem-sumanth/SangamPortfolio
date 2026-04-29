"use client"

import { useState, useEffect } from "react"
import SoundHover from "../PlaySound/HoverSound"

export default function MobileNotice({ hasOpenWindows }: { hasOpenWindows: boolean }) {
  const [dismissed, setDismissed] = useState(false)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setAnimate(true))
  }, [])

  const handleDismiss = () => {
    setAnimate(false)
    setTimeout(() => setDismissed(true), 300)
  }

  if (dismissed) return null

  return (
    <div
      className={`fixed inset-x-4 bottom-6 md:hidden transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${animate ? "translate-y-0" : "translate-y-[calc(100%+1.5rem)]"} ${hasOpenWindows ? "z-44" : "z-46"}`}
    >
      <div className="bg-window-bg border-2 border-window-border rounded-xl shadow-flat p-5 flex items-start flex-row gap-4">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-base mb-1">hey there!</p>
          <p className="text-sm opacity-70">
            Just letting you know that this site is best experienced on desktop, also click on frog to vibe, have fun !
          </p>
        </div>
        <div className="flex items-start shrink-0">
          <SoundHover playType="click" src="/assets/original/sounds/click_general.mp3" vol={0.5}>
            <button
              onClick={handleDismiss}
              className="shrink-0 relative inline-block px-4 py-0.5 pb-1 font-medium group"
            >
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-y-1 bg-slate-200 dark:bg-slate-500 group-hover:translate-y-0 rounded-lg" />
              <span className="absolute inset-0 w-full h-full bg-amber-50 dark:bg-linear-to-br dark:from-wave-from dark:to-wave-from/50 border border-amber-500 dark:border-white rounded-lg" />
              <span className="relative text-amber-700 dark:text-white text-sm">okay</span>
            </button>
          </SoundHover>
        </div>
      </div>
    </div>
  )
}
