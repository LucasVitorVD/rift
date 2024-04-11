"use client"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface Props {
  className?: string,
  setShowSheet?: React.Dispatch<boolean>
}

export default function Nav({ className, setShowSheet }: Props) {
  function handleCloseSheet() {
    if (setShowSheet) {
      setShowSheet(false)
    } else {
      return
    }
  }

  return (
    <nav className={twMerge(className)}>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem onClick={handleCloseSheet}>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Início
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem onClick={handleCloseSheet}>
            <Link href="/recommendations/books" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Livros
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem onClick={handleCloseSheet}>
            <Link href="/recommendations/songs" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Músicas
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem onClick={handleCloseSheet}>
            <Link href="/recommendations/tv" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Filmes/Séries
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}