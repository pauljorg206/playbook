import { notFound } from "next/navigation";
import { ALL_PLAYS } from "@/data/plays/index";
import { CATEGORIES } from "@/lib/categories";
import PlayCard from "@/components/PlayCard";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.id }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.id === category);
  if (!cat) notFound();

  const plays = ALL_PLAYS.filter((p) => p.category === category);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className={`flex items-center gap-3 mb-6 ${cat.color}`}>
        <span className="text-4xl">{cat.icon}</span>
        <div>
          <h1 className="text-3xl font-black uppercase tracking-wide">
            {cat.label}
          </h1>
          <p className="text-gray-400 text-sm">{plays.length} plays</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {plays.map((play) => (
          <PlayCard key={play.id} play={play} />
        ))}
      </div>
    </div>
  );
}
