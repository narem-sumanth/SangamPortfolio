"use client";
/* eslint-disable @next/next/no-img-element */
import { useCallback, useState } from "react";
import { WorkPageData } from "@/constants/WorkPage";
import Link from "next/link";
import SoundHover from "@/components/PlaySound/HoverSound";

const BASE_PITCH = 1.0;
const PITCH_STEP = 0.08;
const MAX_PITCH = 2.0;

export default function Work() {
  const { tools, dev, behance } = WorkPageData;
  const [hoverCount, setHoverCount] = useState(0);

  const currentHoverPitch = Math.min(
    MAX_PITCH,
    BASE_PITCH + hoverCount * PITCH_STEP
  );

  const handleHoverSoundPlay = useCallback(() => {
    setHoverCount((count) => {
      const pitchAtCurrentStep = Math.min(
        MAX_PITCH,
        BASE_PITCH + count * PITCH_STEP
      );

      return pitchAtCurrentStep >= MAX_PITCH ? 0 : count + 1;
    });
  }, []);

  return (
    <div className="pb-5 work-popup-content">
      {/* Info Box */}
      {/* <div className="bg-[#4b88bf] rounded p-4 mb-6">
        <b>Accepting work offers via email.</b>
        <br />
        I do illustration, animation, web design, and web/app development :)
      </div> */}

      {/* Tools + Dev */}
      <div className="tools-dev-grid gap-4.5">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-medium mb-2 font-roboto">
            TOOLS
          </h2>

          <div className="flex flex-wrap gap-3">
            {tools.map((tool) => (
              <div
                key={tool}
                className="
                  px-2.5 py-1
                  border border-gray-200
                  rounded-lg
                  text-sm sm:text-base
                  dark:bg-[rgba(17,19,24,0.55)]
                  transition
                  hover:translate-y-0.75
                  hover:shadow-lg
                  darkhover:bg-[rgba(37,48,70,0.85)]
                  shadow-flat cursor-default
                  "
              >
                <SoundHover
                  src="/assets/original/sounds/hover.mp3"
                  vol={0.3}
                  playType="hover"
                  pitch={currentHoverPitch}
                  onPlay={handleHoverSoundPlay}
                >
                  {tool}
                </SoundHover>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-medium mb-2 font-roboto">
            DEVELOPMENT
          </h2>

          <div className="flex flex-wrap gap-3">
            {dev.map((item) => (
              <div
                key={item}
                className="
                  px-2.5 py-1
                  border border-gray-200
                  rounded-lg
                  text-sm sm:text-base
                  dark:bg-[rgba(17,19,24,0.55)]
                  transition
                  hover:translate-y-0.75
                  hover:shadow-lg
                  dark:hover:bg-[rgba(37,48,70,0.85)]
                  shadow-flat cursor-default
                  "
              >
                <SoundHover
                  src="/assets/original/sounds/hover.mp3"
                  vol={0.3}
                  playType="hover"
                  pitch={currentHoverPitch}
                  onPlay={handleHoverSoundPlay}
                >
                  {item}
                </SoundHover>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/25 my-5" />

      {/* Behance Section */}
      <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-medium mb-2 font-roboto uppercase">
        Selected works
      </h2>

      <p className="opacity-90 mb-3">
        Stories from the SaaS products I helped shape in the real world
      </p>

      {/* Projects */}
      <div className="work-projects-grid">
        {behance.projects.map((project, key) => (
          <Link key={key} href={project?.url} className="group h-full">
            <article
              key={project.title}
              className="
                border border-gray-200
                rounded-[10px]
                h-full flex flex-col
                dark:bg-[rgba(17,19,24,0.55)]
                dark:hover:bg-[rgba(37,48,70,0.85)]
                hover:bg-gray-50/50
                p-2.5 cursor-pointer shadow-flat duration-150 group-hover:translate-y-1.75
              "
            >
              <div className="overflow-hidden rounded-lg w-full aspect-video relative flex items-center justify-center">
                <img
                  src={project.cover}
                  alt={project.title}
                  className="h-full aspect-video object-cover object-top absolute"
                  loading="lazy"
                />
              </div>
              <div className="flex items-start flex-col gap-1.5 my-2.5">
                <h3 className="text-lg font-semibold">
                  {project.title}
                </h3>
                <p className="text-base">
                  {project.description}
                </p>
              </div>
            </article>
          </Link>
        ))}
      </div>

      <div className="mt-3">
        See all projects on&nbsp;
        <a
          href={behance.profile}
          target="_blank"
          rel="noopener noreferrer"
          className="dark:text-cyan-200 text-blue-600 underline"
        >
          Behance
        </a>
      </div>
    </div>
  );
}
