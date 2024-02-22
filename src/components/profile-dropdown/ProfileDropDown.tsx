import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { useAuthContext } from "@/context/AuthContext";
import { toast } from "sonner";

export default function ProfileDropDown() {
  const { user, logOut } = useAuthContext()

  async function handleLogout() {
    try {
      await logOut()
    } catch (error) {
      toast.error('Erro ao fazer logout. Tente novamente mais tarde.');
    }
  }

  return (
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
        <DropdownMenuItem>Perfil</DropdownMenuItem>
        <DropdownMenuItem>Minhas recomendações</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-destructive">Sair</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
