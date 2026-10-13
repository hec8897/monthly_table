import type { Metadata, Viewport } from "next";
import { Overlays } from "@/components/Overlays";
import "./globals.css";

export const metadata: Metadata = {
  title: "제철밥상",
  description: "이번 달 제철 재료 8가지와 레시피 영상",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="antialiased">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-jp-dynamic-subset.min.css"
        />
      </head>
      <body className="bg-fill text-label">
        {/* 390px mobile frame on desktop */}
        <div className="relative mx-auto min-h-dvh max-w-[390px] overflow-x-clip bg-background shadow-sm">{children}</div>
        <Overlays />
      </body>
    </html>
  );
}
