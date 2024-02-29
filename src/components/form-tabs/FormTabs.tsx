"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignInForm from "@/components/form/SignInForm";
import SignUpForm from "@/components/form/SignUpForm";
import { useSearchParams, useRouter } from "next/navigation";

export default function FormTabs() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const currentTab = searchParams.get("tab")

  const handleTabClick = (tab: string) => {
    router.replace(`/register?tab=${tab}`);
  }

  return (
    <Tabs defaultValue="sign-in" value={currentTab ?? "sign-in"} className="w-full">
      <TabsList>
        <TabsTrigger value="sign-in" onClick={() => handleTabClick("sign-in")}>
          Login
        </TabsTrigger>
        <TabsTrigger value="sign-up" onClick={() => handleTabClick("sign-up")}>
          Criar conta
        </TabsTrigger>
      </TabsList>
      <TabsContent value="sign-in">
        <SignInForm />
      </TabsContent>
      <TabsContent value="sign-up">
        <SignUpForm />
      </TabsContent>
    </Tabs>
  );
}
