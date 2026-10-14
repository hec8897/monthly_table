"use client";

import Link from "next/link";
import { EmptyVideos, LongRow, ShortsCard, Thumb, TopNav } from "@/components/ui";
import { useIngredient } from "@/lib/useIngredient";

const LONG_PREVIEW = 3;

export default function IngredientPage() {
  const { ingredient: ing, shorts, longs } = useIngredient();

  return (
    <div className="min-h-dvh animate-slide-in bg-background pb-10">
      <TopNav title={ing.name} />
      <section className="flex items-center gap-4 px-5">
        <Thumb ingredientId={ing.id} className="size-24 shrink-0 rounded-xl" emojiSize={44} />
        <div className="flex min-w-0 flex-col items-start gap-1">
          <h2 className="text-title3 text-label">{ing.name}</h2>
          <p className="text-label1 text-label-alt">{ing.desc}</p>
          <span className="mt-1 rounded-lg bg-primary-bg px-2 py-1 text-caption1 font-semibold text-primary">
            {ing.seasonStart}월 ~ {ing.seasonEnd}월 제철
          </span>
        </div>
      </section>

      {shorts.length === 0 && longs.length === 0 && <EmptyVideos />}

      {shorts.length > 0 && (
        <section className="mt-6">
          <SectionHeader title="쇼츠" href={`/ingredient/${ing.id}/shorts`} />
          <div className="no-scrollbar flex snap-x gap-3 overflow-x-auto scroll-px-5 px-5">
            {shorts.map((v) => (
              <div key={v.id} className="snap-start">
                <ShortsCard video={v} variant="carousel" />
              </div>
            ))}
          </div>
        </section>
      )}

      {longs.length > 0 && (
        <section className="mt-6">
          <SectionHeader title="롱폼" href={`/ingredient/${ing.id}/long`} />
          <div className="flex flex-col gap-2 px-5">
            {longs.slice(0, LONG_PREVIEW).map((v) => (
              <LongRow key={v.id} video={v} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function SectionHeader({ title, href }: { title: string; href: string }) {
  return (
    <div className="mb-2 flex items-center justify-between pr-3 pl-5">
      <h3 className="text-heading2 text-label">{title}</h3>
      <Link href={href} className="flex h-11 items-center px-2 text-label1 font-medium text-label-alt">
        전체보기
      </Link>
    </div>
  );
}
