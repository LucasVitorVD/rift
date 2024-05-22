import ContentSection from "@/components/content-section/ContentSection";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import AddRecommendationButton from "@/components/add-recommendation-button/AddRecommendationButton";
import { Category } from "@/schemas/form";

interface SectionProps {
  id: string;
  title: string;
  description: string;
  category: Category;
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
      <section className="h-screen relative">
        <video
          autoPlay
          muted
          loop
          preload="none"
          className="w-full h-full object-cover"
          src="/backgroundVideo.mp4"
          role="video"
        >
          <source src="/backgroundVideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="flex flex-col items-center justify-center gap-4 w-full h-full bg-black/50 absolute top-0">
          <div className="text-center space-y-5 w-min">
            <h1 className="text-secondary text-4xl font-bold md:text-6xl lg:text-7xl">
              RECOMENDAÇÕES
            </h1>
            <p className="text-slate-200 text-sm leading-6 text-pretty">
              Veja as principais recomendações que a galera está compartilhando
              no RIFT! livros, músicas, séries e filmes que a nossa comunidade
              recomenda. Conecte-se às sugestões e embarque nessa jornada de
              descobertas!
            </p>
          </div>

          <AddRecommendationButton />

          <Link href="#books" replace className="translate-y-16 text-primary">
            <ChevronDown size="3rem" className="animate-bounce" />
          </Link>
        </div>
      </section>
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
