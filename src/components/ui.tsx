"use client";

import { useEffect, useState, type KeyboardEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { INGREDIENTS, type Video } from "@/lib/data";
import { useIsSaved, useStore } from "@/lib/store";
import { Icon } from "./Icon";

/** Click + Enter/Space for non-button containers that hold a nested HeartButton. */
export function pressable(onPress: () => void) {
  return {
    role: "button",
    tabIndex: 0,
    onClick: onPress,
    onKeyDown: (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onPress();
      }
    },
  };
}

/** Image placeholder: ingredient emoji on a striped fill. */
export function Thumb({
  ingredientId,
  src,
  className = "",
  emojiSize = 28,
}: {
  ingredientId: string;
  src?: string | null;
  className?: string;
  emojiSize?: number;
}) {
  return (
    <div className={`stripes grid place-items-center overflow-hidden *:[grid-area:1/1] ${className}`}>
      <span style={{ fontSize: emojiSize }} aria-hidden>
        {INGREDIENTS[ingredientId]?.emoji}
      </span>
      {/* eslint-disable-next-line @next/next/no-img-element -- remote YouTube thumbnails, no optimization needed for the prototype */}
      {src && <img src={src} alt="" loading="lazy" className="size-full object-cover" />}
    </div>
  );
}

type HeartTone = "light" | "dark" | "circle";

export function HeartButton({ video, tone = "light" }: { video: Video; tone?: HeartTone }) {
  const saved = useIsSaved(video.id);
  const toggleSave = useStore((s) => s.toggleSave);
  const [bounce, setBounce] = useState(false);

  const color = saved ? "text-negative" : tone === "light" ? "text-label-assistive" : "text-white";
  return (
    <button
      type="button"
      aria-label={saved ? "저장 해제" : "저장"}
      aria-pressed={saved}
      onClick={(e) => {
        e.stopPropagation();
        if (!saved) setBounce(true);
        toggleSave(video);
      }}
      onAnimationEnd={() => setBounce(false)}
      className={`flex size-11 shrink-0 items-center justify-center rounded-full ${tone === "circle" ? "bg-white/16" : ""}`}
    >
      <Icon
        name="heart"
        filled={saved}
        size={tone === "circle" ? 26 : 22}
        className={`${color} ${bounce ? "animate-pop" : ""} ${tone === "dark" && !saved ? "drop-shadow" : ""}`}
      />
    </button>
  );
}

export function TopNav({ title }: { title: string }) {
  const router = useRouter();
  return (
    <nav className="sticky top-0 z-10 grid h-13 grid-cols-[52px_1fr_52px] items-center bg-background">
      <button
        type="button"
        aria-label="뒤로"
        onClick={() => (history.length > 1 ? router.back() : router.push("/"))}
        className="ml-1 flex size-11 items-center justify-center text-label"
      >
        <Icon name="back" />
      </button>
      <h1 className="truncate text-center text-headline2 text-label">{title}</h1>
    </nav>
  );
}

/** Bottom sheet with dimmer. Closes on dimmer tap / Escape. */
export function Sheet({ onClose, full = false, label, children }: { onClose: () => void; full?: boolean; label: string; children: ReactNode }) {
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-40 mx-auto max-w-[390px]" role="dialog" aria-modal aria-label={label}>
      <div className="absolute inset-0 animate-fade bg-dimmer" onClick={onClose} />
      {/* ponytail: tap-to-close only; add grabber drag-to-dismiss when moving to native */}
      <div
        className={`absolute inset-x-0 bottom-0 flex animate-slide-up flex-col overflow-hidden rounded-t-2xl bg-background ${full ? "top-14" : ""}`}
      >
        <button type="button" aria-label="닫기" onClick={onClose} className="flex h-7 shrink-0 items-center justify-center">
          <span className="h-[5px] w-9 rounded-full bg-line" />
        </button>
        {children}
      </div>
    </div>
  );
}

export function DurationBadge({ duration, size = "sm" }: { duration?: string; size?: "sm" | "md" }) {
  if (!duration) return null;
  return (
    <span
      className={`absolute right-1.5 bottom-1.5 rounded bg-black/60 font-medium text-white ${
        size === "sm" ? "px-[5px] py-px text-caption2" : "px-1.5 py-0.5 text-caption1"
      }`}
    >
      {duration}
    </span>
  );
}

export function ShortsCard({ video, variant }: { video: Video; variant: "carousel" | "grid" }) {
  const openPlayer = useStore((s) => s.openPlayer);
  return (
    <div
      {...pressable(() => openPlayer(video))}
      className={`relative aspect-9/16 cursor-pointer overflow-hidden rounded-xl ${variant === "carousel" ? "w-[132px] shrink-0" : ""}`}
    >
      <Thumb ingredientId={video.ingredientId} src={video.thumbnailUrl} className="absolute inset-0" emojiSize={40} />
      <div className="absolute inset-x-0 bottom-0 bg-linear-to-b from-transparent to-black/60 px-2.5 pt-10 pb-2.5">
        <p
          className={`line-clamp-2 font-semibold text-white ${variant === "carousel" ? "text-[13px] leading-[18px]" : "text-label1"}`}
        >
          {video.title}
        </p>
      </div>
      <div className="absolute top-0 right-0">
        <HeartButton video={video} tone="dark" />
      </div>
    </div>
  );
}

export function LongRow({ video }: { video: Video }) {
  const openPlayer = useStore((s) => s.openPlayer);
  return (
    <div {...pressable(() => openPlayer(video))} className="-mx-2 flex cursor-pointer items-start gap-3 rounded-xl p-2 active:bg-fill">
      <div className="relative aspect-video w-36 shrink-0 overflow-hidden rounded-[10px]">
        <Thumb ingredientId={video.ingredientId} src={video.thumbnailUrl} className="size-full" />
        <DurationBadge duration={video.duration} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="line-clamp-2 text-[15px] leading-[21px] font-semibold text-label">{video.title}</p>
        <p className="text-caption1 font-medium text-label-alt">{video.channel}</p>
      </div>
      <div className="-mt-2 -mr-2">
        <HeartButton video={video} />
      </div>
    </div>
  );
}

export function LongCard({ video }: { video: Video }) {
  const openPlayer = useStore((s) => s.openPlayer);
  return (
    <div {...pressable(() => openPlayer(video))} className="flex cursor-pointer flex-col gap-3">
      <div className="relative aspect-video overflow-hidden rounded-xl">
        <Thumb ingredientId={video.ingredientId} src={video.thumbnailUrl} className="size-full" emojiSize={48} />
        <DurationBadge duration={video.duration} size="md" />
      </div>
      <div className="flex items-start gap-2">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <p className="line-clamp-2 text-body1 font-semibold text-label">{video.title}</p>
          <p className="text-caption1 font-medium text-label-alt">{video.channel}</p>
        </div>
        <div className="-mt-2.5 -mr-3">
          <HeartButton video={video} />
        </div>
      </div>
    </div>
  );
}

export function EmptyVideos() {
  return (
    <div className="flex flex-col items-center gap-1 px-5 py-16 text-center">
      <p className="text-body1 font-semibold text-label">아직 준비된 영상이 없어요</p>
      <p className="text-label1 text-label-alt">곧 맛있는 레시피 영상을 모아 올게요</p>
    </div>
  );
}
