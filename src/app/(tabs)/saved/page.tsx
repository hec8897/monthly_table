"use client";

import Link from "next/link";
import { pressable, HeartButton, Thumb } from "@/components/ui";
import { useStore, type SavedFilter } from "@/lib/store";

const FILTERS: { value: SavedFilter; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "shorts", label: "쇼츠" },
  { value: "long", label: "롱폼" },
];

export default function SavedPage() {
  const saved = useStore((s) => s.savedVideos);
  const filter = useStore((s) => s.savedFilter);
  const setFilter = useStore((s) => s.setFilter);
  const openPlayer = useStore((s) => s.openPlayer);
  const list = filter === "all" ? saved : saved.filter((v) => v.type === filter);

  return (
    <div className="animate-fade px-5 pt-4">
      <header className="flex items-baseline gap-2">
        <h1 className="text-title3 text-label">저장한 레시피</h1>
        <span className="text-caption1 font-medium text-label-alt">{saved.length}개</span>
      </header>

      {saved.length === 0 ? (
        <div className="flex flex-col items-center gap-2 pt-24 text-center">
          <div className="stripes mb-2 size-30 rounded-full" aria-hidden />
          <p className="text-headline1 text-label">아직 저장한 레시피가 없어요</p>
          <p className="text-label1 text-label-alt">마음에 드는 영상에 하트를 눌러 모아보세요</p>
          <Link
            href="/"
            className="mt-4 flex h-12 items-center rounded-xl bg-primary px-6 text-body1 font-semibold text-white active:bg-primary-strong"
          >
            제철 재료 보러 가기
          </Link>
        </div>
      ) : (
        <>
          <div className="mt-4 flex gap-2">
            {FILTERS.map((f) => {
              const active = f.value === filter;
              return (
                <button
                  key={f.value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(f.value)}
                  className={`h-9 rounded-[18px] px-3.5 text-label1 ${
                    active ? "bg-primary font-semibold text-white active:bg-primary-strong" : "border border-line font-medium text-label-neutral active:bg-fill"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
          <ul key={filter} className="mt-2 animate-fade">
            {list.map((v) => (
              <li key={v.id}>
                <div {...pressable(() => openPlayer(v))} className="-mx-2 flex cursor-pointer items-center gap-3.5 rounded-xl px-2 py-2.5 active:bg-fill">
                  <div className="relative size-24 shrink-0 overflow-hidden rounded-xl">
                    <Thumb ingredientId={v.ingredientId} src={v.thumbnailUrl} className="size-full" emojiSize={36} />
                    <span className="absolute bottom-1.5 left-1.5 rounded bg-black/60 px-1.5 py-0.5 text-caption2 font-medium text-white">
                      {v.type === "shorts" ? "쇼츠" : "롱폼"}
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                    <p className="line-clamp-2 text-body1 leading-[22px] font-semibold text-label">{v.title}</p>
                    <div className="flex min-w-0 items-center gap-1.5">
                      <span className="shrink-0 rounded-md bg-fill px-2 py-0.5 text-caption1 font-medium text-label-neutral">
                        {v.ingredientName}
                      </span>
                      <span className="truncate text-caption1 font-medium text-label-alt">{v.channel}</span>
                    </div>
                  </div>
                  <HeartButton video={v} />
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
