import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section
      className="h-screen relative"
    >
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

        <Link href="#books" className="translate-y-16 text-primary">
          <ChevronDown size="3rem" className="animate-bounce" />
        </Link>
      </div>
    </section>
  );
}