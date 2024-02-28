import { Button } from "@/components/ui/button";
import ProfileHeader from "@/components/profile-header/ProfileHeader";
import RecommendationDialog from "@/components/recomendation-dialog/RecomendationDialog";

export default function ProfilePage() {
  return (
    <section className="container pt-6 space-y-10">
      <ProfileHeader />

      <RecommendationDialog />

      <hr />

      <div className="flex items-center flex-wrap gap-10">
        <div className="space-y-4">
          <div className="w-[256px] h-[300px] bg-slate-600" /> {/* imagem */}
          <div>
            <h3>Título</h3>
            <p>Indicado por: Nome</p>
          </div>
          <Button variant="outline">Ver mais</Button>
        </div>

        <div className="space-y-4">
          <div className="w-[256px] h-[300px] bg-slate-600" /> {/* imagem */}
          <div>
            <h3>Título</h3>
            <p>Indicado por: Nome</p>
          </div>
          <Button variant="outline">Ver mais</Button>
        </div>
      </div>
    </section>
  );
}
