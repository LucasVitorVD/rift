import { usePathname } from "next/navigation";
import Link from "next/link";

export default function AuthGuard() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 ml-6 mt-6">
      <pre>Você está tentando acessar: {pathname}</pre>
      <p>
        Por favor, faça <Link href={`${"/register"}?continueTo=${pathname}`} className="underline text-blue-500"> Login</Link> para continuar.
      </p>
    </div>
  );
}
