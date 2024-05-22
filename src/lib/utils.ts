import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const navigationLinks = [
  {
    href: "/",
    label: "Início",
  },
  {
    href: "/recommendations?category=livro",
    label: "Livros",
    sectionId: "#books"
  },
  {
    href: "/recommendations?category=musica",
    label: "Músicas",
    sectionId: "#songs"
  },
  {
    href: "/recommendations?category=filme/serie",
    label: "Filmes/Séries",
    sectionId: "#tv"
  },
]