import { notFound, useParams } from "next/navigation";
import { getVideos, INGREDIENTS } from "./data";

export function useIngredient() {
  const { id } = useParams<{ id: string }>();
  const ingredient = INGREDIENTS[id];
  if (!ingredient) notFound();
  return { ingredient, ...getVideos(id) };
}
