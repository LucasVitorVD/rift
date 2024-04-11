import FormTabs from "@/components/form-tabs/FormTabs";
import heroImage from "../../../public/hero-2.jpg";

export default async function RegisterPage() {
  return (
    <section 
      className="flex items-center justify-center h-screen bg-primary bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${heroImage.src})` }}
    >
      <div className="flex justify-center w-screen h-screen pb-10 bg-white shadow-md md:w-[580px] md:h-auto md:rounded-md">
        <FormTabs />
      </div>
    </section>
  );
}
