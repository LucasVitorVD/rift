import ContentSection from "@/components/content-section/ContentSection";
import Hero from "@/components/hero/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <ContentSection
        id="book-section"
        title="Livros"
        description="Principais livros recomendados."
      />
      <ContentSection
        id="song-section"
        title="Músicas"
        description="Principais músicas recomendadas."
      />
      <ContentSection
        id="tv-show-section"
        title="Séries/Filmes"
        description="Principais séries e filmes recomendados."
      />
    </>
  );
}
