"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { useAuthContext } from "@/context/AuthContext";

export default function ProfileHeader() {
  const { user } = useAuthContext();

  return (
    <div className="flex justify-center">
      <div className="flex items-center gap-6">
        <Avatar className="size-28">
          <AvatarImage src={user?.photoURL ?? ""} />
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold">{user?.displayName ? `Olá ${user.displayName}` : "Olá,"}</h1>
          <p>Veja, crie e gerencie suas recomendações aqui!</p>
        </div>
      </div>
    </div>
  );
}
