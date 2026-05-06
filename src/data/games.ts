export interface GameData {
  id: string;
  title: string;
  shortDesc: string;
  description: string;
  logoUrl?: string; // We will just use text if no logo
  bgGradient: string;
  accentColor: string;
  releaseDate: string;
}

export const gamesData: GameData[] = [
  {
    id: "genshin",
    title: "원신",
    shortDesc: "오픈월드 액션 RPG",
    description: "미지의 세계를 탐험하고 잃어버린 가족을 찾는 여정.",
    bgGradient: "from-blue-900 to-black",
    accentColor: "blue",
    releaseDate: "2020-09-28",
  },
  {
    id: "starrail",
    title: "붕괴: 스타레일",
    shortDesc: "은하 판타지 RPG",
    description: "은하열차를 타고 우주를 누비며 개척의 의지를 이어가는 여정.",
    bgGradient: "from-purple-900 to-black",
    accentColor: "purple",
    releaseDate: "2023-04-26",
  },
  {
    id: "zzz",
    title: "젠레스 존 제로",
    shortDesc: "어반 판타지 액션 RPG",
    description: "공동의 재난 속에서 로프꾼이 되어 도시의 비밀을 파헤치세요.",
    bgGradient: "from-green-900 to-black",
    accentColor: "green",
    releaseDate: "2024-07-04",
  },
  {
    id: "honkai3rd",
    title: "붕괴3rd",
    shortDesc: "애니메이션풍 액션 RPG",
    description: "발키리들과 함께 세계를 지키기 위한 끊임없는 싸움.",
    bgGradient: "from-pink-900 to-black",
    accentColor: "pink",
    releaseDate: "2017-10-17",
  }
];
