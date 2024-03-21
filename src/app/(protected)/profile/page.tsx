import ProfileHeader from "@/components/profile-header/ProfileHeader";
import RecommendationDialog from "@/components/recomendation-dialog/RecomendationDialog";
import Filters from "@/components/filters/Filters";
import RecommendationList from "@/components/recommendation-list/RecommendationList";

export default function ProfilePage() {
  return (
    <section className="container pt-6 space-y-10">
      <ProfileHeader />

      <div className="flex items-center justify-between">
        <Filters />
        <RecommendationDialog />
      </div>

      <hr />

      <RecommendationList />
    </section>
  );
}
