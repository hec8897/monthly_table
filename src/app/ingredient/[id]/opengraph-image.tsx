import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getVideos, INGREDIENTS } from "@/lib/data";
import { SITE_NAME } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "제철 재료 레시피 영상 모음";

export function generateStaticParams() {
  return Object.keys(INGREDIENTS).map((id) => ({ id }));
}

const fontDir = join(process.cwd(), "assets/fonts");
const [bold, medium] = await Promise.all([
  readFile(join(fontDir, "Pretendard-Bold.otf")),
  readFile(join(fontDir, "Pretendard-Medium.otf")),
]);

// ImageResponse can't read CSS vars, so Wanted token values are inlined here.
const C = { primary: "#0066FF", primaryBg: "#EAF2FE", label: "#171719", labelAlt: "rgba(55,56,60,.61)", fill: "#F4F4F5" };

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ing = INGREDIENTS[id];
  const { shorts, longs } = getVideos(id);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#FFFFFF", padding: 72, fontFamily: "Pretendard" }}>
        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                padding: "10px 22px",
                borderRadius: 16,
                background: C.primaryBg,
                color: C.primary,
                fontSize: 32,
                fontWeight: 700,
              }}
            >
              {ing.seasonStart}월 ~ {ing.seasonEnd}월 제철
            </div>
            <div style={{ marginTop: 28, fontSize: 132, fontWeight: 700, color: C.label, letterSpacing: -4, lineHeight: 1.1 }}>
              {ing.name}
            </div>
            <div style={{ marginTop: 20, fontSize: 40, fontWeight: 500, color: C.labelAlt }}>{ing.desc}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 32, fontWeight: 500, color: C.labelAlt }}>
            <span style={{ color: C.primary, fontWeight: 700 }}>{SITE_NAME}</span>
            <span>
              레시피 쇼츠 {shorts.length} · 롱폼 {longs.length}
            </span>
          </div>
        </div>
        <div
          style={{
            width: 400,
            height: 400,
            alignSelf: "center",
            borderRadius: 48,
            background: C.fill,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 220,
          }}
        >
          {ing.emoji}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Pretendard", data: bold, weight: 700 },
        { name: "Pretendard", data: medium, weight: 500 },
      ],
    },
  );
}
