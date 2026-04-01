"use client"

import { faq } from "@/constants/FAQPage";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faq.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            className="rounded-lg overflow-hidden border border-amber-100 dark:border-indigo-600 shadow-flat"
          >
            {/* Question */}
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex justify-between items-center p-4 text-left bg-amber-50 dark:bg-linear-to-br dark:from-wave-from dark:to-wave-from/50 dark:bg-black dark:text-white transition"
            >
              <span className="text-sm md:text-base font-medium tracking-wide">
                {item.q}
              </span>

              <ChevronDown
                className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                  }`}
                size={18}
              />
            </button>

            {/* Answer */}
            <div
              className={`grid transition-all duration-300 ease-in-out ${isOpen
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
                }`}
            >
              <div className="overflow-hidden">
                <div className="px-4 py-3 text-sm text-gray-700 dark:text-white bg-amber-50/20 dark:bg-background">
                  {item.a}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
