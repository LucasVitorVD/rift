"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import GoogleIcon from "public/google";

export default function ProfileDropDown() {
  const { user, logOut, googleSignIn, loading } = useAuthContext();
  const router = useRouter();

  async function handleLogout() {
    try {
      await logOut();

      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }

  async function handleSigInWithGoogle() {
    try {
      await googleSignIn()
    } catch (error) {
      toast.error('Erro ao fazer login. Tente novamente mais tarde.');
    }
  }

  return (
    <>
      {!loading && !user ? (
        <Button
          variant="ghost"
          className="flex items-center gap-2 shadow-md py-6"
          onClick={handleSigInWithGoogle}
        >
          <GoogleIcon width={20} height={20} />
          Entrar com Google
        </Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={user?.photoURL ?? ""} />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/profile">
              <DropdownMenuItem>Perfil</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-destructive"
            >
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
