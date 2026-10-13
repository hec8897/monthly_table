"use client";

import { EmptyVideos, LongCard, TopNav } from "@/components/ui";
import { useIngredient } from "@/lib/useIngredient";

export default function LongAllPage() {
  const { ingredient, longs } = useIngredient();
  return (
    <div className="min-h-dvh animate-slide-in bg-background pb-10">
      <TopNav title={`${ingredient.name} 롱폼`} />
      {longs.length === 0 ? (
        <EmptyVideos />
      ) : (
        <div className="px-5">
          <p className="mb-3 text-caption1 font-medium text-label-alt">영상 {longs.length}개</p>
          <div className="flex flex-col gap-6">
            {longs.map((v) => (
              <LongCard key={v.id} video={v} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
