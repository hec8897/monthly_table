"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "@/components/Icon";

const TABS: { href: string; label: string; icon: IconName }[] = [
  { href: "/", label: "홈", icon: "home" },
  { href: "/saved", label: "저장함", icon: "bookmark" },
];

export default function TabsLayout({ children }: LayoutProps<"/">) {
  const pathname = usePathname();
  return (
    <>
      <div className="pb-[calc(49px+env(safe-area-inset-bottom))]">{children}</div>
      <nav className="fixed inset-x-0 bottom-0 z-30 mx-auto grid max-w-[390px] grid-cols-2 border-t border-line-alt bg-background pb-[env(safe-area-inset-bottom)]">
        {TABS.map((t) => {
          const active = pathname === t.href;
          return (
            <Link
              key={t.href}
              href={t.href}
              aria-current={active ? "page" : undefined}
              className={`flex h-[49px] flex-col items-center justify-center gap-0.5 text-caption2 font-medium ${active ? "text-primary" : "text-label-assistive"}`}
            >
              <Icon name={t.icon} size={22} filled={active} />
              {t.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
