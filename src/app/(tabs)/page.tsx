"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/Icon";
import { HeartButton, pressable, Sheet, Thumb } from "@/components/ui";
import { formatViews, getPopular, INGREDIENTS, MONTHS } from "@/lib/data";
import { CURRENT_MONTH, useStore } from "@/lib/store";

export default function HomePage() {
  const month = useStore((s) => s.selectedMonth);
  const setMonth = useStore((s) => s.setMonth);
  const [pickerOpen, setPickerOpen] = useState(false);

  return (
    <div className="animate-fade px-5 pt-4">
      <header className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPickerOpen(true)}
            className="-my-3 flex h-11 items-center gap-0.5 text-label1 font-semibold text-primary"
          >
            {month}월의 제철 <Icon name="chevronDown" size={16} />
          </button>
          {month !== CURRENT_MONTH && (
            <button
              type="button"
              onClick={() => setMonth(CURRENT_MONTH)}
              className="-my-3 h-11 text-label1 font-medium text-label-alt underline-offset-2 active:underline"
            >
              이번 달로
            </button>
          )}
        </div>
        <h1 className="mt-1 text-title3 text-label">지금 가장 맛있는 재료</h1>
      </header>

      <ul key={month} className="mt-4 animate-fade">
        {MONTHS[month].map((id) => {
          const ing = INGREDIENTS[id];
          return (
            <li key={id}>
              <Link href={`/ingredient/${id}`} className="-mx-2 flex items-center gap-3.5 rounded-xl px-2 py-1.5 active:bg-fill">
                <Thumb ingredientId={id} className="size-16 shrink-0 rounded-xl" emojiSize={30} />
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="text-headline2 text-label">{ing.name}</span>
                  <span className="truncate text-label1 font-medium text-label-alt">{ing.desc}</span>
                </div>
                <Icon name="chevronRight" size={20} className="text-label-assistive" />
              </Link>
            </li>
          );
        })}
      </ul>

      <PopularSection key={`popular-${month}`} month={month} />

      {pickerOpen && (
        <MonthSheet
          selected={month}
          onSelect={(m) => {
            setMonth(m);
            setPickerOpen(false);
          }}
          onClose={() => setPickerOpen(false)}
        />
      )}
    </div>
  );
}

function MonthSheet({ selected, onSelect, onClose }: { selected: number; onSelect: (m: number) => void; onClose: () => void }) {
  return (
    <Sheet onClose={onClose} label="월 선택">
      <div className="flex flex-col gap-5 px-5 pb-[calc(42px+env(safe-area-inset-bottom))]">
        <div className="flex flex-col gap-1">
          <h2 className="text-heading2 text-label">어느 달의 제철을 볼까요?</h2>
          <p className="text-label1 text-label-alt">달마다 제철 재료 8가지를 보여드려요</p>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => {
            const active = m === selected;
            return (
              <button
                key={m}
                type="button"
                aria-pressed={active}
                onClick={() => onSelect(m)}
                className={`flex h-13 flex-col items-center justify-center rounded-xl text-[15px] leading-5 ${
                  active
                    ? "bg-primary-bg font-semibold text-primary shadow-[inset_0_0_0_1.5px_var(--color-primary)]"
                    : "bg-fill-alt font-medium text-label-neutral active:bg-fill"
                }`}
              >
                {m}월
                {m === CURRENT_MONTH && <span className="text-[10px] leading-3 font-medium">이번 달</span>}
              </button>
            );
          })}
        </div>
      </div>
    </Sheet>
  );
}

function PopularSection({ month }: { month: number }) {
  const openPlayer = useStore((s) => s.openPlayer);
  const popular = getPopular(month);
  if (popular.length === 0) return null;

  return (
    <section className="mt-8 mb-6 animate-fade">
      <div className="mb-2 flex items-baseline gap-2">
        <h2 className="text-heading2 text-label">{month}월 인기 레시피</h2>
        <span className="text-caption1 font-medium text-label-alt">조회수 기준</span>
      </div>
      <ol>
        {popular.map((v, i) => (
          <li key={v.id}>
            <div {...pressable(() => openPlayer(v))} className="-mx-2 flex cursor-pointer items-center gap-3 rounded-xl px-2 py-1.5 active:bg-fill">
              <span className={`w-5 shrink-0 text-center text-headline2 ${i < 3 ? "text-primary" : "text-label-alt"}`}>{i + 1}</span>
              <Thumb ingredientId={v.ingredientId} src={v.thumbnailUrl} className="size-16 shrink-0 rounded-xl" />
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <p className="line-clamp-2 text-label1 font-semibold text-label">{v.title}</p>
                <p className="truncate text-caption1 font-medium text-label-alt">
                  {INGREDIENTS[v.ingredientId]?.name} · {v.type === "shorts" ? "쇼츠" : "롱폼"} · 조회수 {formatViews(v.views!)}
                </p>
              </div>
              <HeartButton video={v} />
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
