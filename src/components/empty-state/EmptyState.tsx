import Image from "next/image"
import empty from "../../../public/empty-state.svg"

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-4"> 
      <Image 
        src={empty}
        alt="Ilustração"
        width={288}
        height={288}
        className="h-auto"
      />

      <div className="text-center">
        <p>
          Ops... Não há recomendações ainda.
        </p>
        <p>
          Seja o primeiro a recomendar!
        </p>
      </div>
    </div>
  )
}