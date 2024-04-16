import ContentSection from "@/components/content-section/ContentSection";
import Hero from "@/components/hero/Hero";
import { Category } from "@/schemas/form";

interface SectionProps {
  id: string,
  title: string,
  description: string,
  category: Category
}

const sections: SectionProps[] = [
  {
    id: "books",
    title: "Livros",
    description: "Principais livros recomendados.",
    category: "livro",
  },
  {
    id: "songs",
    title: "Músicas",
    description: "Principais músicas recomendadas.",
    category: "música",
  },
  {
    id: "tv",
    title: "Séries e Filmes",
    description: "Principais séries e filmes recomendados.",
    category: "filme/série",
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      {sections.map((section) => (
        <ContentSection
          key={section.id}
          id={section.id}
          title={section.title}
          description={section.description}
          category={section.category}
        />
      ))}
    </>
  );
}