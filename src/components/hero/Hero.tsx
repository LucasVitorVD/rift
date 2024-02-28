import Link from "next/link";
import { Button } from "@/components/ui/button";
import heroImage from "../../../public/hero-2.jpg";
import { Plus, ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section
      className="h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${heroImage.src})` }}
    >
      <div className="flex flex-col items-center justify-center gap-4 w-full h-full bg-black/50">
        <div className="text-center space-y-5 w-min">
          <h1 className="text-secondary text-4xl font-bold md:text-6xl lg:text-7xl">
            RECOMENDAÇÕES
          </h1>
          <p className="text-slate-200 text-sm leading-6 text-pretty">
            Veja as principais recomendações que a galera está compartilhando no
            RIFT! livros, músicas, séries e filmes que a nossa comunidade
            recomenda. Conecte-se às sugestões e embarque nessa jornada de
            descobertas!
          </p>
        </div>

        <div className="space-x-6">
          <Link href="/profile?r=true">
            <Button>
              <Plus size="20px" className="mr-1" />
              Fazer recomendação
            </Button>
          </Link>
        </div>

        <Link href="#book-section" className="translate-y-16 text-primary">
          <ChevronDown size="3rem" className="animate-bounce" />
        </Link>
      </div>
    </section>
  );
}
