import Link from "next/link";
import Nav from "./Nav";
import GoogleAuthButton from "../googleAuthButton/GoogleAuthButton";
import ProfileDropDown from "../profile-dropdown/ProfileDropDown";
import MobileNav from "./MobileNav";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/api/auth";

export async function Header() {
  const session = await getServerSession(authOptions);
  
  return (
    <header className="flex items-center justify-between px-8 py-6 border-b-2 border-b-slate-200 shadow">
      <MobileNav />

      <Link href="/" className="text-3xl font-bold">
        RIFT
      </Link>

      <Nav className="hidden lg:block" />

      {!session?.user ? (
        <GoogleAuthButton />
      ) : (
        <ProfileDropDown userImg={session.user.image} />
      )}
    </header>
  );
}