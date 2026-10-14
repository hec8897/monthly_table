import type { Metadata, Viewport } from "next";
import { Overlays } from "@/components/Overlays";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const description = "지금 가장 맛있는 제철 재료 8가지와 바로 따라 할 수 있는 레시피 영상을 매달 모아드려요.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} · 이번 달 제철 재료 레시피`, template: `%s | ${SITE_NAME}` },
  description,
  applicationName: SITE_NAME,
  openGraph: { siteName: SITE_NAME, locale: "ko_KR", type: "website", description },
  twitter: { card: "summary_large_image" },
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
