"use client";

import { EmptyVideos, ShortsCard, TopNav } from "@/components/ui";
import { useIngredient } from "@/lib/useIngredient";

export default function ShortsAllPage() {
  const { ingredient, shorts } = useIngredient();
  return (
    <div className="min-h-dvh animate-slide-in bg-background pb-10">
      <TopNav title={`${ingredient.name} 쇼츠`} />
      {shorts.length === 0 ? (
        <EmptyVideos />
      ) : (
        <div className="px-5">
          <p className="mb-3 text-caption1 font-medium text-label-alt">영상 {shorts.length}개</p>
          <div className="grid grid-cols-[repeat(2,minmax(0,1fr))] gap-3">
            {shorts.map((v) => (
              <ShortsCard key={v.id} video={v} variant="grid" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
