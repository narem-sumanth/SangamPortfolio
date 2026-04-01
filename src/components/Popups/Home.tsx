/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client"

import React, { useRef, useState } from 'react'
import SoundHover from '../PlaySound/HoverSound'
import { HomePageData } from '@/constants/HomePage'
import { WindowName } from '../Window/DesktopShell';

export interface HomePopUp {
  handleClick: (name: WindowName) => void;
}

function HomePopUp({ handleClick }: HomePopUp) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<string>(HomePageData[0]?.title);

  const handleActiveTab = (tab: string) => {
    setActiveTab(tab);
  }

  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDown.current = true;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft || 0);
    scrollLeft.current = scrollRef.current?.scrollLeft || 0;
  };

  const handleMouseLeave = () => {
    isDown.current = false;
  };

  const handleMouseUp = () => {
    isDown.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX.current) * 1.5; // speed
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft.current - walk;
    }
  };

  return (
    <>
      <div
        className={`fixed left-[5vw] top-1/2 -translate-y-1/2 md:left-1/2 z-45 md:-translate-x-1/2 transition-all duration-200 ease-out`}
      >
        <div className="absolute -top-20 md:-top-24 left-0 md:-left-5 group py-5 w-16 hover:-mt-6">
          <SoundHover playType="hover" src="assets/original/sounds/star.mp3" vol={0.5}>
            <img
              className="group-hover:animate-bounce group-hover:cursor-pointer group-hover:drop-shadow-amber-300 group-hover:drop-shadow-xl size-12 md:size-16 block dark:hidden"
              src="assets/original/images/icon_star.webp"
            />
            <img
              className="group-hover:animate-bounce group-hover:cursor-pointer group-hover:drop-shadow-cyan-100 group-hover:drop-shadow-xl size-12 md:size-16 hidden dark:block"
              src="assets/original/images/icon_star_dark.webp"
            />
          </SoundHover>
          <p className="group-hover:block hidden text-amber-500 dark:text-cyan-100 font-semibold text-center w-full">
            fun stuff
          </p>
        </div>
        <div className="bg-window-bg w-[90vw] md:w-130 min-h-[50vh] h-[65vh] max-h-240 md:h-[60vh] md:max-h-120 lg:w-180 xl:w-200 lg:h-150 border-2 border-window-border rounded-xl shadow-flat overflow-hidden flex flex-col">
          <div
            className={`window-header text-white flex justify-between items-center bg-window-header px-6 py-2 rounded-t-[11px] border-b-2 border-window-border`}
          >
            <span className="text-lg">Home</span>
          </div>
          <div className='flex-1 min-h-0 overflow-y-auto scrollbar-hide'>
            <div className="p-6 flex flex-col gap-5">
              <div className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl'>
                hi! <span className='text-amber-500 dark:text-cyan-100 font-bold'>i&apos;m Sangam</span>
              </div>
              <div className='hidden lg:flex items-center justify-center'>
                <div className='flex items-start flex-wrap lg:items-center justify-center w-max'>
                  {
                    HomePageData?.map((item, key) => {
                      return (
                        <div className='h-10 group mx-1 first:ml-0 last:mr-0' key={key}>
                          <SoundHover playType="click" src="/assets/original/sounds/click_general.mp3" vol={0.5}>
                            <button
                              key={key}
                              className={`${activeTab === item?.title ? "shadow-flat bg-amber-50 dark:bg-linear-to-br dark:from-wave-from dark:to-wave-from/50 dark:bg-black dark:text-white" : ""} group-hover:mt-0.75 border-window-border border rounded-lg px-2 py-1 duration-150 text-sm sm:text-base`}
                              onClick={() => handleActiveTab(item?.title)}
                            >
                              {item?.title}
                            </button>
                          </SoundHover>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
              <div className='flex items-center justify-center lg:hidden'>
                <div className="w-full overflow-x-auto scrollbar-hide"
                  ref={scrollRef}
                  onMouseDown={handleMouseDown}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseUp}
                  onMouseMove={handleMouseMove}
                >
                  <div className='flex items-center gap-2 w-max'>
                    {
                      HomePageData?.map((item, key) => {
                        return (
                          <div className='h-10 group shrink-0' key={key}>
                            <SoundHover playType="click" src="/assets/original/sounds/click_general.mp3" vol={0.5}>
                              <button
                                className={`${activeTab === item?.title ? "shadow-flat bg-amber-50 dark:bg-linear-to-br dark:from-wave-from dark:to-wave-from/50 dark:bg-black dark:text-white" : ""} 
                                  group-hover:mt-0.75 border-window-border border rounded-lg px-3 py-1 duration-150 text-sm sm:text-base whitespace-nowrap`}
                                onClick={() => handleActiveTab(item?.title)}
                              >
                                {item?.title}
                              </button>
                            </SoundHover>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
              <div>
                <p className='text-amber-500 dark:text-cyan-100 font-semibold text-lg sm:text-2xl md:text-3xl lg:text-4xl'>
                  {
                    HomePageData.find(item => item?.title === activeTab)?.description
                  }
                </p>
              </div>
            </div>
            <div className="px-6 absolute bottom-6 hidden md:block">
              <SoundHover playType="click" src="/assets/original/sounds/click_general.mp3" vol={0.5}>
                <button className="relative inline-block px-4 py-2 font-medium group">
                  <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform  translate-y-1 bg-slate-200 dark:bg-slate-500 group-hover:translate-x-0 group-hover:translate-y-0 rounded-full"></span>
                  <span className="absolute inset-0 w-full h-full bg-amber-50 dark:bg-linear-to-br dark:from-wave-from dark:to-wave-from/50 dark:bg-black dark:text-white border border-amber-500 dark:border-white rounded-full"></span>
                  <span className="relative group-hover:text-black dark:text-white dark:group-hover:text-white">Download Resume</span>
                </button>
              </SoundHover>
            </div>
          </div>
          <div className='flex items-center justify-center flex-wrap gap-5 mb-6 md:hidden'>
            <SoundHover playType="click" src="/assets/original/sounds/click_general.mp3" vol={0.5}>
              <button
                className="size-12 flex items-center justify-center flex-col"
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

                <div className="font-roboto font-mono font-medium">work</div>
              </button>
            </SoundHover>
            <SoundHover playType="click" src="/assets/original/sounds/click_general.mp3" vol={0.5}>
              <button
                className="size-12 flex items-center justify-center flex-col"
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

                <div className="font-roboto font-mono font-medium">about</div>
              </button>
            </SoundHover>
            <SoundHover playType="click" src="/assets/original/sounds/click_general.mp3" vol={0.5}>
              <button
                className="size-12 flex items-center justify-center flex-col"
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

                <div className="font-roboto font-mono font-medium">faq</div>
              </button>
            </SoundHover>
            <SoundHover playType="click" src="/assets/original/sounds/click_general.mp3" vol={0.5}>
              <button
                className="size-12 flex items-center justify-center flex-col"
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

                <div className="font-roboto font-mono font-medium">contact</div>
              </button>
            </SoundHover>
          </div>
        </div>
      </div>
      <div className="fixed bottom-7 left-1/2 -translate-x-1/2 md:hidden z-50">
        <SoundHover
          playType="click"
          src="/assets/original/sounds/click_general.mp3"
          vol={0.5}
          className="inline-flex justify-center"
        >
          <button className="relative inline-block px-4 py-2 font-medium group">
            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform  translate-y-1 bg-slate-200 dark:bg-slate-500 group-hover:translate-x-0 group-hover:translate-y-0 rounded-full"></span>
            <span className="absolute inset-0 w-full h-full bg-amber-50 dark:bg-linear-to-br dark:from-wave-from dark:to-wave-from/50 dark:bg-black dark:text-white border border-amber-500 dark:border-white rounded-full"></span>
            <span className="relative group-hover:text-black dark:text-white dark:group-hover:text-white">Download&nbsp;Resume</span>
          </button>
        </SoundHover>
      </div>
    </>
  )
}

export default HomePopUp
