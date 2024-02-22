"use client";

import Link from "next/link";
import Nav from "./Nav";
import { Button } from "@/components/ui/button";
import ProfileDropDown from "../profile-dropdown/ProfileDropDown";
import MobileNav from "./MobileNav";
import { useAuthContext } from "@/context/AuthContext";
import Skeleton from "react-loading-skeleton"

export function Header() {
  const { user, loading } = useAuthContext();

  return (
    <header className="flex items-center justify-between px-8 py-6 border-b-2 border-b-slate-200 shadow">
      <MobileNav />

      <Link href="/" className="text-3xl font-bold">
        RIFT
      </Link>

      <Nav className="hidden lg:block" />

      {!loading && !user ? (
        <Link href="/register">
          <Button variant="default">Entrar</Button>
        </Link>
      ) : (
        <ProfileDropDown />
      )}
    </header>
  );
}
