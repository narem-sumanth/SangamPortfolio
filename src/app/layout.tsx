import type { Metadata } from "next";
import { Zen_Kaku_Gothic_New, Roboto } from "next/font/google";
import "./globals.css";

const gothic_new = Zen_Kaku_Gothic_New({
  variable: "--font-gothic-new",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

const robot = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://sangampazare.online"),
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  title: "Sangam Pazare - Graphic & UI/UX Designer",
  description:
    "Portfolio of Sangam Pazare, a multidisciplinary designer from IDC IIT Bombay with 3+ years across B2B SaaS, fintech, branding, and mobile. Currently at Rever.",
  keywords: [
    "Sangam Pazare",
    "Graphic designer",
    "UI UX designer",
    "IIT Bombay",
    "IDC",
    "multidisciplinary designer",
    "B2B SaaS design",
    "fintech UX",
    "branding",
    "motion graphics",
    "portfolio",
  ],
  authors: [{ name: "Sangam Pazare" }],
  creator: "Sangam Pazare",
  openGraph: {
    type: "website",
    title: "Sangam Pazare - Graphic & UI/UX Designer",
    description:
      "IDC IIT Bombay alumnus. 3+ years designing end-to-end product experiences across fintech, SaaS, and consumer apps. High craft, systems thinking, real outcomes.",
    siteName: "Sangam Pazare Portfolio",
    images: [
      {
        url: "/assets/original/images/profile.jpeg",
        width: 1200,
        height: 630,
        alt: "Sangam Pazare — Graphic Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sangam Pazare - Graphic & UI/UX Designer",
    description:
      "Multidisciplinary designer from IIT Bombay. Currently designing at Rever. Worked on fintech, SaaS, branding, and 20+ live products.",
    images: ["/assets/original/images/profile.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme-controls-storage');var theme='dark';if(s){var t=JSON.parse(s);if(t&&t.state&&t.state.theme){theme=t.state.theme;}}if(theme==='dark'){document.documentElement.classList.add('dark');}}catch(e){document.documentElement.classList.add('dark');}})();`,
          }}
        />
      </head>
      <body
        className={`${gothic_new.className} ${robot?.variable} antialiased duration-300 transition-all`}
      >
        {children}
      </body>
    </html>
  );
}
