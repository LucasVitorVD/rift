"use client"

import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Nav from "./Nav";
import { useState, useEffect } from "react";

export default function MobileNav() {
  const [showSheet, setShowSheet] = useState(false)

  useEffect(() => {
    const closeModalOnResize = () => {
      if (window.innerWidth > 1023) { 
        setShowSheet(false);
      }
    };

    window.addEventListener('resize', closeModalOnResize);

    return () => {
      window.removeEventListener('resize', closeModalOnResize);
    };
  }, [setShowSheet]);

  return (
    <div className="lg:hidden">
      <Sheet open={showSheet} onOpenChange={setShowSheet}>
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
        <SheetContent side="left">
          <Nav setShowSheet={setShowSheet} />
        </SheetContent>
      </Sheet>
    </div>
  )
}
