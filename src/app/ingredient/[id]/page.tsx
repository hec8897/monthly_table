import type { Metadata } from "next";
import { getVideos, INGREDIENTS } from "@/lib/data";
import IngredientView from "./IngredientView";

export const dynamicParams = false; // unknown ids → 404

export function generateStaticParams() {
  return Object.keys(INGREDIENTS).map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps<"/ingredient/[id]">): Promise<Metadata> {
  const { id } = await params;
  const ing = INGREDIENTS[id];
  if (!ing) return {};
  const { shorts, longs } = getVideos(id);
  const title = `${ing.name} 레시피 · ${ing.seasonStart}~${ing.seasonEnd}월 제철`;
  const description = `${ing.desc}. 지금 제철인 ${ing.name} 요리 쇼츠 ${shorts.length}개, 롱폼 ${longs.length}개를 한 번에 모아봤어요.`;
  const url = `/ingredient/${id}`;
  return {
    title,
    description,
    keywords: [`${ing.name} 레시피`, `${ing.name} 요리`, `${ing.name} 손질`, `제철 ${ing.name}`, "제철 음식"],
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article" },
  };
}

export default function IngredientPage() {
  return <IngredientView />;
}
