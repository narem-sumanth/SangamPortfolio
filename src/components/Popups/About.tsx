/* eslint-disable @next/next/no-img-element */
"use client"

import { AboutPageData } from "@/constants/AboutPage";

const About = () => {
  return (
    <div className="about-container">

      {/* Header */}
      <div className="about-header border-b border-wave-to pb-5">
        {/* Image */}
        <div>
          <img
            src={AboutPageData.image}
            alt={AboutPageData.name}
            className="rounded-full size-32 sm:size-40"
          />
        </div>

        {/* Name + Role */}
        <div className="about-header-content">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-amber-500 dark:text-cyan-100 font-bold">
            {AboutPageData.name}
          </h2>

          <div className="text-sm sm:text-base lg:text-lg opacity-90">
            {AboutPageData.role}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-5 pt-5">

        {/* About */}
        <div className="flex flex-col gap-2">
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
            About me
          </div>
          <p className="text-sm sm:text-base lg:text-base">
            {AboutPageData.about}
          </p>
        </div>

        {/* Education */}
        <div className="flex flex-col gap-2">
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
            Education
          </div>

          <div className="flex flex-row sm:items-center justify-between w-full gap-1">
            <b className="text-sm sm:text-base lg:text-lg">
              {AboutPageData.education.degree}
            </b>
            <div className="text-sm sm:text-base">
              ({AboutPageData.education.year})
            </div>
          </div>

          <div className="text-sm sm:text-base">
            {AboutPageData.education.description}
          </div>
        </div>

        {/* Experience */}
        <div className="flex flex-col gap-2">
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
            Experience
          </div>

          <div className="grid gap-4">
            {AboutPageData.experience.map((exp, index) => (
              <div key={index}>

                <div className="flex flex-row sm:items-center justify-between w-full mb-1 gap-1">
                  <b className="text-base sm:text-lg lg:text-xl">
                    {exp.company}
                  </b>
                  <div className="text-sm sm:text-base">
                    ({exp.duration})
                  </div>
                </div>

                <div>
                  <b className="text-sm sm:text-base lg:text-base">
                    {exp.role}
                  </b>
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
  );
};

export default About;