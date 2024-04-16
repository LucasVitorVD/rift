"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Link from "next/link";
import { navigationLinks } from "@/lib/utils";
import { twMerge } from "tailwind-merge";

interface Props {
  className?: string;
  setShowSheet?: React.Dispatch<boolean>;
}

export default function Nav({ className, setShowSheet }: Props) {
  function handleCloseSheet() {
    if (setShowSheet) {
      setShowSheet(false);
    } else {
      return;
    }
  }

  return (
    <nav className={twMerge(className)}>
      <NavigationMenu>
        <NavigationMenuList>
          {navigationLinks.map((link) => (
            <NavigationMenuItem key={link.href} onClick={handleCloseSheet}>
              <Link href={link.href} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {link.label}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}