import Image from "next/image"
import serverErr from "../../../public/server_error.svg"

export default function ServerErrorState() {
  return (
    <div className="flex flex-col items-center gap-4"> 
      <Image 
        src={serverErr}
        alt="Ilustração"
        width={288}
        height={288}
        className="h-auto"
      />

      <div className="text-center">
        <p>
          Ops... Ocorreu um erro ao obter as recomendações.
        </p>
        <p>
          Tente novamente mais tarde.
        </p>
      </div>
    </div>
  )
}