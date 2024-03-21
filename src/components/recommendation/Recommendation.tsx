import { RecommendationDataSchemaType } from "@/schemas/recommendationSchema";
import Image from "next/image";
import { Button } from "../ui/button";

interface Props {
  data: RecommendationDataSchemaType
}

export default function Recommendation({ data }: Props) {
  return (
    <div className="space-y-4" key={data.id}>
      <Image
        src={data.image}
        alt="Imagem da recomendação"
        height={256}
        width={300}
      />
      <div>
        <h3 className="font-bold">{data.name}</h3>
        <p>Recomendado por: {data.userName}</p>
      </div>
      <Button variant="outline">Ver mais</Button>
    </div>
  );
}