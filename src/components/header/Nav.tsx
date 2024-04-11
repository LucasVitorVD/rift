"use client"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface Props {
  className?: string,
  setShowModal?: React.Dispatch<boolean>
}

export default function Nav({ className, setShowModal }: Props) {
  return (
    <nav className={twMerge(className)}>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem onClick={() => setShowModal!(false)}>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Início
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Recomendações</NavigationMenuTrigger>
            <NavigationMenuContent onClick={() => setShowModal!(false)}>
              <Link href="/recommendations/books" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Livros
                </NavigationMenuLink>
              </Link>
              <Link href="/recommendations/songs" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Músicas
                </NavigationMenuLink>
              </Link>
              <Link href="/recommendations/tv" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Séries/Filmes
                </NavigationMenuLink>
              </Link>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem onClick={() => setShowModal!(false)}>
            <Link href="/about" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Sobre
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem onClick={() => setShowModal!(false)}>
            <Link href="/contact" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Contato
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
