import ContentSection from "@/components/content-section/ContentSection";
import Hero from "@/components/hero/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <ContentSection
        id="books"
        title="Livros"
        description="Principais livros recomendados."
        category="livro"
      />
      <ContentSection
        id="songs"
        title="Músicas"
        description="Principais músicas recomendadas."
        category="música"
      />
      <ContentSection
        id="tv"
        title="Séries/Filmes"
        description="Principais séries e filmes recomendados."
        category="filme/série"
      />
    </>
  );
}
