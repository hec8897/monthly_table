"use client";

import { useEffect } from "react";
import { youtubeUrl, type Video } from "@/lib/data";
import { useIsSaved, useStore } from "@/lib/store";
import { Icon } from "./Icon";
import { HeartButton, Sheet, Thumb } from "./ui";

/** Global layers mounted once in the root layout. */
export function Overlays() {
  useEffect(() => {
    useStore.persist.rehydrate();
  }, []);

  return (
    <>
      <Player />
      <Toast />
    </>
  );
}

function Embed({ video }: { video: Video }) {
  const aspect = video.type === "shorts" ? "aspect-9/16" : "aspect-video";
  if (video.youtubeId) {
    return (
      <iframe
        className={`w-full ${aspect}`}
        src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&playsinline=1`}
        title={video.title}
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    );
  }
  return (
    <div className={`relative w-full ${aspect}`}>
      <Thumb ingredientId={video.ingredientId} className="absolute inset-0" emojiSize={56} />
      <span className="absolute inset-0 m-auto flex size-14 items-center justify-center rounded-full bg-black/50 text-white">
        <Icon name="play" filled size={26} />
      </span>
    </div>
  );
}

function Player() {
  const video = useStore((s) => s.player);
  const close = useStore((s) => s.closePlayer);
  if (!video) return null;
  return video.type === "shorts" ? <ShortsPlayer video={video} onClose={close} /> : <LongPlayer video={video} onClose={close} />;
}

function LongPlayer({ video, onClose }: { video: Video; onClose: () => void }) {
  const saved = useIsSaved(video.id);
  const toggleSave = useStore((s) => s.toggleSave);
  return (
    <Sheet onClose={onClose} full label={video.title}>
      <Embed video={video} />
      <div className="flex flex-col gap-4 p-5">
        <div className="flex flex-col gap-1">
          <h2 className="text-headline1 text-label">{video.title}</h2>
          <p className="text-caption1 font-medium text-label-alt">{video.channel}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-pressed={saved}
            onClick={() => toggleSave(video)}
            className="flex h-10 items-center gap-1.5 rounded-[10px] border border-line px-3.5 text-label1 font-semibold text-label active:bg-fill"
          >
            <Icon name="heart" size={18} filled={saved} className={saved ? "animate-pop text-negative" : "text-label-assistive"} />
            {saved ? "저장됨" : "저장"}
          </button>
          <a
            href={youtubeUrl(video)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 items-center gap-1 px-2 text-label1 font-semibold text-primary active:text-primary-strong"
          >
            YouTube에서 열기 <Icon name="external" size={16} />
          </a>
        </div>
      </div>
    </Sheet>
  );
}

function ShortsPlayer({ video, onClose }: { video: Video; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // ponytail: ✕/Escape only; swipe-down close and swipe-up next short are for the native build
  return (
    <div
      className="fixed inset-0 z-50 mx-auto flex max-w-[390px] animate-slide-up items-center bg-black"
      role="dialog"
      aria-modal
      aria-label={video.title}
    >
      <Embed video={video} />
      <button
        type="button"
        aria-label="닫기"
        onClick={onClose}
        className="absolute top-3 left-2 flex size-11 items-center justify-center text-white"
      >
        <Icon name="close" />
      </button>
      <div className="absolute inset-x-0 bottom-0 flex items-end gap-3 bg-linear-to-b from-transparent to-black/70 px-5 pt-20 pb-[42px]">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <p className="line-clamp-2 text-body1 font-semibold text-white">{video.title}</p>
          <p className="text-caption1 font-medium text-white/80">{video.channel}</p>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <HeartButton video={video} tone="circle" />
          <span className="text-caption1 font-medium text-white">저장</span>
        </div>
      </div>
    </div>
  );
}

function Toast() {
  const toast = useStore((s) => s.toast);
  const hide = useStore((s) => s.hideToast);
  const undo = useStore((s) => s.undoUnsave);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(hide, 4000);
    return () => clearTimeout(t);
  }, [toast, hide]);

  if (!toast) return null;
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[100px] z-[60] mx-auto max-w-[390px] px-5">
      <div
        role="status"
        className="pointer-events-auto flex h-13 animate-fade items-center justify-between rounded-xl bg-inverse-bg pr-2 pl-4 shadow-[0_4px_12px_rgba(0,0,0,.12)]"
      >
        <span className="text-label1 font-medium text-white">저장이 해제됐어요</span>
        <button type="button" onClick={undo} className="h-11 px-2 text-label1 font-semibold text-inverse-primary">
          실행 취소
        </button>
      </div>
    </div>
  );
}
