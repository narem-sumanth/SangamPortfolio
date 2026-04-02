/* eslint-disable @next/next/no-img-element */
"use client"

import { AboutPageData } from "@/constants/AboutPage";

const About = () => {
  return (
    <div className="about-container">

      {/* Header */}
      <div className="about-header">
        <div className="about-header-main border border-wave-to rounded-3xl flex flex-col items-center justify-center bg-amber-50/50 dark:bg-linear-to-br dark:from-[#0D1F3B] dark:to-[#2355A1] dark:bg-black dark:text-white">
          {/* Image */}
          <div className="about-header-image p-3 aspect-square size-52">
            <img
              src={AboutPageData.image}
              alt={AboutPageData.name}
              className="size-full border border-wave-to rounded-xl object-cover"
            />
          </div>
          <div className="about-header-divider bg-black dark:bg-white"></div>
          {/* Name + Role */}
          <div className="about-header-content flex flex-col items-center justify-center gap-2 w-full">
            <div className="border-b border-wave-to p-3 pt-2 w-full">
              <h2 className="text-2xl text-amber-500 dark:text-cyan-100 font-bold text-center">
                {AboutPageData.introTitle}
              </h2>
            </div>

            <div className="text-sm sm:text-base opacity-90 p-3 pt-2">
              <p>
                {AboutPageData.intro}
              </p>
            </div>
          </div>
        </div>
        <div className="about-header-side border border-wave-to rounded-3xl bg-amber-50/50 dark:bg-linear-to-br dark:from-[#0D1F3B] dark:to-[#2355A1] dark:bg-black dark:text-white">
          <div className="border-b border-wave-to p-3 pt-2 w-full">
            <p className="text-xl text-amber-500 dark:text-cyan-100 font-medium text-center about-header-copy">
              {AboutPageData.academicWeapon.title}
            </p>
          </div>
          <div className="text-sm sm:text-base opacity-90 p-3 pt-2">
            <p>
              {AboutPageData.academicWeapon.description}
            </p>
          </div>
        </div>
      </div>
      <div className="about-header mt-6">
        <div className="gap-6 grid">
          {/* Hobbies */}
          <div className="border border-wave-to rounded-3xl bg-amber-50/50 dark:bg-linear-to-br dark:from-[#0D1F3B] dark:to-[#2355A1] dark:bg-black dark:text-white">
            <div className="border-b border-wave-to p-3 pt-2 w-full">
              <p className="text-xl text-amber-500 dark:text-cyan-100 font-medium text-center about-header-copy">
                {AboutPageData.hobbies.title}
              </p>
            </div>
            <div className="text-sm sm:text-base opacity-90 p-3 pt-2">
              <p>
                {AboutPageData.hobbies.description}
              </p>
            </div>
          </div>
          {/* Genuine Review */}
          <div className="border border-wave-to rounded-3xl bg-amber-50/50 dark:bg-linear-to-br dark:from-[#0D1F3B] dark:to-[#2355A1] dark:bg-black dark:text-white">
            <div className="border-b border-wave-to p-3 pt-2 w-full">
              <p className="text-xl text-amber-500 dark:text-cyan-100 font-medium text-center about-header-copy">
                {AboutPageData.review.title}
              </p>
            </div>
            <div className="text-sm sm:text-base opacity-90 p-3 pt-2">
              <p>
                {AboutPageData.review.quote}
              </p>
            </div>
            <div className="text-[12px] sm:text-sm opacity-90 p-3 pt-2">
              <p>
                - {AboutPageData.review.author}
              </p>
            </div>
          </div>
        </div>
        <div className="border border-wave-to rounded-3xl bg-amber-50/50 dark:bg-linear-to-br dark:from-[#0D1F3B] dark:to-[#2355A1] dark:bg-black dark:text-white">
          <div className="border-b border-wave-to p-3 pt-2 w-full">
            <p className="text-xl text-amber-500 dark:text-cyan-100 font-medium text-center about-header-copy">
              Work Experience:
            </p>
          </div>
          <div className="text-sm sm:text-base opacity-90 p-3 pt-2">
            <div className="grid gap-4">
              {AboutPageData.experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex flex-row sm:items-center justify-between w-full mb-1 gap-1">
                    <p className="text-base sm:text-lg font-medium">
                      {exp.company} - {exp.role}
                    </p>
                  </div>
                  <div className="mt-1 text-sm sm:text-base">
                    {exp.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
