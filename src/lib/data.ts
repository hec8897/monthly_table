import { z } from "zod";
import curatedJson from "./videos.json";

export const VideoSchema = z.object({
  id: z.string(),
  youtubeId: z.string().nullable(),
  type: z.enum(["shorts", "long"]),
  title: z.string(),
  channel: z.string(),
  duration: z.string().optional(),
  views: z.number().optional(), // snapshot at collection time
  thumbnailUrl: z.string().nullable(),
  ingredientId: z.string(),
});

export const SavedVideoSchema = VideoSchema.extend({
  ingredientName: z.string(),
  savedAt: z.number(),
});

export type Video = z.infer<typeof VideoSchema>;
export type SavedVideo = z.infer<typeof SavedVideoSchema>;

export type Ingredient = {
  id: string;
  name: string;
  desc: string;
  emoji: string; // ponytail: stand-in for imageUrl until ingredient images are provided
  seasonStart: number;
  seasonEnd: number;
};

// [id, name, emoji, desc, seasonStart, seasonEnd]
const RAW: [string, string, string, string, number, number][] = [
  ["jeoneo", "전어", "🐟", "고소한 기름이 오르는 가을 생선", 9, 11],
  ["daeha", "대하", "🦐", "쫄깃하고 달큰한 가을 새우", 9, 11],
  ["gam", "감", "🟠", "달콤함이 절정인 가을 과일", 10, 12],
  ["bae", "배", "🍐", "시원하고 아삭한 수분 가득", 9, 11],
  ["danhobak", "단호박", "🎃", "포슬포슬 달콤한 가을 채소", 9, 11],
  ["goguma", "고구마", "🍠", "구워도 쪄도 맛있는 간식", 9, 12],
  ["pyogo", "표고버섯", "🍄", "향이 진한 가을 버섯", 9, 11],
  ["mu", "무", "🥬", "단맛이 오른 가을 무", 10, 12],
  ["gul", "굴", "🦪", "바다의 우유, 탱글한 겨울 굴", 11, 2],
  ["kkomak", "꼬막", "🐚", "쫄깃하고 짭조름한 겨울 조개", 11, 3],
  ["daegu", "대구", "🐟", "담백하고 시원한 겨울 생선", 12, 2],
  ["gwamegi", "과메기", "🐟", "쫀득하게 말린 겨울 별미", 11, 1],
  ["bangeo", "방어", "🐟", "기름이 꽉 찬 겨울 방어", 11, 2],
  ["sigeumchi", "시금치", "🥬", "추위에 단맛이 든 겨울 시금치", 11, 3],
  ["gyul", "귤", "🍊", "새콤달콤 겨울 대표 과일", 11, 2],
  ["hallabong", "한라봉", "🍊", "진하고 상큼한 제주 감귤", 1, 3],
  ["ddalgi", "딸기", "🍓", "상큼달콤한 겨울·봄 딸기", 12, 4],
  ["ueong", "우엉", "🌿", "아삭하고 향긋한 뿌리채소", 11, 2],
  ["baechu", "배추", "🥬", "고소하고 달큰한 김장 배추", 10, 12],
  ["bomdong", "봄동", "🥬", "달큰하고 아삭한 겨울 배추", 1, 3],
  ["naengi", "냉이", "🌱", "향긋한 봄의 첫 나물", 2, 4],
  ["dallae", "달래", "🌱", "알싸한 향의 봄나물", 2, 4],
  ["ssuk", "쑥", "🌿", "향긋하고 쌉싸름한 봄 쑥", 3, 5],
  ["jukkumi", "주꾸미", "🐙", "알이 꽉 찬 봄 주꾸미", 3, 4],
  ["domi", "도미", "🐟", "담백하고 쫄깃한 봄 도미", 3, 5],
  ["dureup", "두릅", "🌿", "쌉싸름한 봄나물의 왕", 4, 5],
  ["chwinamul", "취나물", "🌿", "향긋한 봄 산나물", 4, 5],
  ["kkotge", "꽃게", "🦀", "알이 꽉 찬 봄 암꽃게", 4, 6],
  ["yangpa", "양파", "🧅", "달고 아삭한 햇양파", 4, 6],
  ["maneul", "마늘", "🧄", "알싸하고 단단한 햇마늘", 5, 6],
  ["chamoe", "참외", "🍈", "아삭하고 달콤한 여름 과일", 5, 7],
  ["oi", "오이", "🥒", "시원하고 아삭한 여름 채소", 5, 8],
  ["maesil", "매실", "🟢", "새콤한 초여름 열매", 5, 6],
  ["gamja", "감자", "🥔", "포슬포슬한 햇감자", 6, 8],
  ["ojingeo", "오징어", "🦑", "쫄깃하고 달큰한 여름 오징어", 6, 9],
  ["subak", "수박", "🍉", "더위를 식히는 여름 과일", 6, 8],
  ["tomato", "토마토", "🍅", "새콤달콤 여름 토마토", 6, 8],
  ["gaji", "가지", "🍆", "부드럽고 촉촉한 여름 채소", 6, 9],
  ["aehobak", "애호박", "🥒", "달큰하고 부드러운 여름 호박", 6, 9],
  ["jangeo", "장어", "🐍", "기운 나는 여름 보양식", 6, 8],
  ["oksusu", "옥수수", "🌽", "쫀득하고 달큰한 여름 옥수수", 7, 8],
  ["mineo", "민어", "🐟", "여름 최고의 보양 생선", 7, 8],
  ["boksunga", "복숭아", "🍑", "향긋하고 달콤한 여름 과일", 7, 9],
  ["jeonbok", "전복", "🐚", "쫄깃한 여름 보양 해산물", 7, 9],
  ["podo", "포도", "🍇", "달콤하고 상큼한 늦여름 과일", 8, 9],
  ["songi", "송이버섯", "🍄", "은은한 솔향의 가을 버섯", 9, 10],
  ["bam", "밤", "🌰", "고소하고 포근한 가을 밤", 9, 10],
  ["sagwa", "사과", "🍎", "새콤달콤 아삭한 가을 사과", 9, 11],
  ["godeungeo", "고등어", "🐟", "기름진 가을 고등어", 9, 11],
];

export const INGREDIENTS: Record<string, Ingredient> = Object.fromEntries(
  RAW.map(([id, name, emoji, desc, seasonStart, seasonEnd]) => [
    id,
    { id, name, emoji, desc, seasonStart, seasonEnd },
  ]),
);

export const MONTHS: Record<number, string[]> = {
  1: ["gul", "kkomak", "daegu", "bangeo", "sigeumchi", "gyul", "ddalgi", "hallabong"],
  2: ["kkomak", "gul", "bomdong", "naengi", "dallae", "sigeumchi", "ddalgi", "hallabong"],
  3: ["naengi", "dallae", "ssuk", "jukkumi", "bomdong", "domi", "ddalgi", "hallabong"],
  4: ["dureup", "jukkumi", "ssuk", "kkotge", "chwinamul", "domi", "yangpa", "ddalgi"],
  5: ["kkotge", "chwinamul", "dureup", "maneul", "yangpa", "chamoe", "oi", "maesil"],
  6: ["maesil", "gamja", "maneul", "yangpa", "chamoe", "ojingeo", "subak", "kkotge"],
  7: ["oksusu", "subak", "oi", "gaji", "aehobak", "jangeo", "mineo", "boksunga"],
  8: ["oksusu", "podo", "boksunga", "gaji", "mineo", "jeonbok", "tomato", "gamja"],
  9: ["jeoneo", "daeha", "songi", "bam", "sagwa", "podo", "godeungeo", "goguma"],
  10: ["jeoneo", "daeha", "gam", "bae", "danhobak", "goguma", "pyogo", "mu"],
  11: ["gul", "bangeo", "baechu", "mu", "gam", "sagwa", "gwamegi", "ueong"],
  12: ["daegu", "gul", "bangeo", "kkomak", "gwamegi", "gyul", "baechu", "ueong"],
};

const CHANNELS = ["오늘뭐먹지", "자취생밥상", "제철부엌", "1분요리", "집밥연구소", "엄마손맛TV"];

const SHORTS: ((n: string) => string)[] = [
  (n) => `${n} 1분 손질법, 이것만 알면 끝`,
  (n) => `${n} 이렇게 먹으면 진짜 맛있어요`,
  (n) => `자취생 ${n} 초간단 레시피 (재료 3개)`,
  (n) => `${n} 고르는 법, 마트에서 바로 써먹기`,
  (n) => `${n} 요리 하나로 밥 두 공기 뚝딱`,
  (n) => `에어프라이어로 끝내는 ${n} 요리`,
];

const LONGS: [(n: string) => string, string][] = [
  [(n) => `제철 ${n} 요리 3가지 | 일주일 반찬 한 번에 만들기`, "14:32"],
  [(n) => `${n} 손질부터 보관까지, 초보도 실패 없는 완벽 가이드`, "9:48"],
  [(n) => `요즘 제일 맛있는 ${n}! 셰프가 알려주는 집밥 레시피`, "12:05"],
  [(n) => `${n} 한 봉지로 차리는 근사한 저녁상`, "18:21"],
  [(n) => `신혼부부 주말 요리 | ${n} 듬뿍 넣은 한 그릇 요리`, "7:56"],
];

// Curated real videos per ingredient (collected from YouTube). Validated since it's hand-collected external data.
const CuratedSchema = z.record(
  z.string(),
  z.object({
    shorts: z.array(z.object({ youtubeId: z.string().length(11), title: z.string(), channel: z.string(), views: z.number() })),
    longs: z.array(z.object({ youtubeId: z.string().length(11), title: z.string(), channel: z.string(), duration: z.string(), views: z.number() })),
  }),
);
const CURATED = CuratedSchema.parse(curatedJson);

const thumb = (youtubeId: string) => `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;

// ponytail: ingredients without curated videos fall back to generated mocks (youtubeId null = no embed)
export function getVideos(ingredientId: string): { shorts: Video[]; longs: Video[] } {
  const name = INGREDIENTS[ingredientId]?.name;
  if (!name) return { shorts: [], longs: [] };
  const curated = CURATED[ingredientId];
  if (curated) {
    return {
      shorts: curated.shorts.map((v) => ({ ...v, id: v.youtubeId, type: "shorts" as const, thumbnailUrl: thumb(v.youtubeId), ingredientId })),
      longs: curated.longs.map((v) => ({ ...v, id: v.youtubeId, type: "long" as const, thumbnailUrl: thumb(v.youtubeId), ingredientId })),
    };
  }
  const base = { youtubeId: null, thumbnailUrl: null, ingredientId };
  return {
    shorts: SHORTS.map((title, i) => ({
      ...base,
      id: `${ingredientId}-s${i}`,
      type: "shorts" as const,
      title: title(name),
      channel: CHANNELS[i % CHANNELS.length],
    })),
    longs: LONGS.map(([title, duration], i) => ({
      ...base,
      id: `${ingredientId}-l${i}`,
      type: "long" as const,
      title: title(name),
      channel: CHANNELS[(i + 2) % CHANNELS.length],
      duration,
    })),
  };
}

/** Most-viewed videos across the month's ingredients. Empty when the month has no view data (mock-only). */
export function getPopular(month: number, limit = 10): Video[] {
  return (MONTHS[month] ?? [])
    .flatMap((id) => {
      const { shorts, longs } = getVideos(id);
      return [...shorts, ...longs];
    })
    .filter((v) => v.views != null)
    .sort((a, b) => b.views! - a.views!)
    .slice(0, limit);
}

export function formatViews(n: number) {
  if (n >= 1e8) return `${+(n / 1e8).toFixed(1)}억회`;
  if (n >= 1e5) return `${Math.round(n / 1e4)}만회`;
  if (n >= 1e4) return `${+(n / 1e4).toFixed(1)}만회`;
  return `${n.toLocaleString("ko-KR")}회`;
}

export function youtubeUrl(v: Video) {
  if (!v.youtubeId) return `https://www.youtube.com/results?search_query=${encodeURIComponent(v.title)}`;
  return v.type === "shorts"
    ? `https://www.youtube.com/shorts/${v.youtubeId}`
    : `https://www.youtube.com/watch?v=${v.youtubeId}`;
}
