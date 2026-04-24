import { notFound } from "next/navigation";
import { ALL_PLAYS, getPlay } from "@/data/plays/index";
import { CATEGORIES } from "@/lib/categories";
import PlayClient from "./PlayClient";

export function generateStaticParams() {
  return ALL_PLAYS.map((p) => ({ category: p.category, play: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ play: string }>;
}) {
  const { play: playId } = await params;
  const play = getPlay(playId);
  return { title: play ? `${play.name} — Playbook` : "Play — Playbook" };
}

export default async function PlayPage({
  params,
}: {
  params: Promise<{ category: string; play: string }>;
}) {
  const { category, play: playId } = await params;
  const play = getPlay(playId);
  if (!play || play.category !== category) notFound();

  const cat = CATEGORIES.find((c) => c.id === category);

  return <PlayClient play={play} category={cat} />;
}
