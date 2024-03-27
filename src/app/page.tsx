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
        category="livro"
      />
      <ContentSection
        id="song-section"
        title="Músicas"
        description="Principais músicas recomendadas."
        category="música"
      />
      <ContentSection
        id="tv-show-section"
        title="Séries/Filmes"
        description="Principais séries e filmes recomendados."
        category="filme/série"
      />
    </>
  );
}
