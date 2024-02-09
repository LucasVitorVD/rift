import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ContentSectionProps extends React.ComponentProps<'section'> {
  title: string,
  description: string,
  mainRecomendations?: unknown[]
}

export default function ContentSection({ title, description, mainRecomendations, ...props }: ContentSectionProps) {
  return (
    <section
      className="container py-20 space-y-10 border-b-2 border-b-slate-200"
      {...props}
    >
      <div className="space-y-6">
        <div className="w-14 h-1 bg-primary" />
        <h2 className="text-5xl font-bold">{title}</h2>
        <p className="text-sm font-medium">{description}</p>
      </div>

      <div className="flex flex-col items-center justify-center gap-14 lg:flex-row lg:justify-normal">
        <div className="space-y-4">
          <div className="w-[256px] h-[300px] bg-slate-600" /> {/* imagem */}
          <div>
            <h3>Título</h3>
            <p>Indicado por: Nome</p>
          </div>
          <Button variant="outline">Ver mais</Button>
        </div>

        <div className="space-y-4">
          <div className="w-[256px] h-[300px] bg-slate-600" /> {/* imagem */}
          <div>
            <h3>Título</h3>
            <p>Indicado por: Nome</p>
          </div>
          <Button variant="outline">Ver mais</Button>
        </div>

        <div className="space-y-4">
          <div className="w-[256px] h-[300px] bg-slate-600" /> {/* imagem */}
          <div>
            <h3>Título</h3>
            <p>Indicado por: Nome</p>
          </div>
          <Button variant="outline">Ver mais</Button>
        </div>

        <div className="flex flex-col items-center hover:cursor-pointer group lg:-translate-y-12">
          <ArrowRight className="size-10 text-primary" />
          <span className="text-xs font-medium group-hover:underline">
            Ver todas as recomendações
          </span>
        </div>
      </div>
    </section>
  );
}
