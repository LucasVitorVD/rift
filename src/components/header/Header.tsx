import Link from "next/link";
import Nav from "./Nav";
import ProfileDropDown from "../profile-dropdown/ProfileDropDown";
import MobileNav from "./MobileNav";
import { Suspense } from "react";

export function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-6 border-b-2 border-b-slate-200 shadow">
      <MobileNav />

      <Link href="/" className="text-3xl font-bold">
        RIFT
      </Link>

      <Nav className="hidden lg:block" />

      <Suspense fallback={<p>Loading</p>}>
        <ProfileDropDown />
      </Suspense>
    </header>
  );
}
