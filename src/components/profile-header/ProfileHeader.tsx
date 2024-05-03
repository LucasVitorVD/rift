import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/api/auth";

export default async function ProfileHeader() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex justify-center">
      <div className="flex items-center gap-6 flex-wrap">
        <Avatar className="size-28 mx-auto md:mx-0">
          <AvatarImage src={session?.user?.image ?? ""} />
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
        <div className="text-center md:text-start">
          <h1 className="text-2xl font-bold md:text-3xl">
            {session?.user?.name ? `Olá ${session.user.name}` : "Olá,"}
          </h1>
          <p>Veja, crie e gerencie suas recomendações aqui!</p>
        </div>
      </div>
    </div>
  );
}
