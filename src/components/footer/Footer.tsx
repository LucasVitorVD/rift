import Link from "next/link";
import { navigationLinks } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-10 py-6 pl-4 bg-primary text-white md:pl-0">
      <div className="flex flex-col flex-1 gap-6 md:flex-row md:items-center md:justify-around md:gap-0">
        <div className="space-y-3">
          <h4 className="font-bold text-3xl">RIFT</h4>
          <p className="text-wrap">
            RIFT é uma plataforma onde os usuários podem recomendar <br />
            conteúdos que estão interessados no momento.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-bold">Navegação</p>
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.sectionId ?? "#"}
              className="hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <p className="md:text-center">
        Copyright &copy; {new Date().getFullYear()} Lucas Vitor. Todos os
        direitos reservados.
      </p>
    </footer>
  );
}