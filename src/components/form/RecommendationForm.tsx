"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  recommendationFormSchema,
  RecommendationFormType,
} from "@/schemas/form";
import { RecommendationDataSchemaType } from "@/schemas/recommendationSchema";
import { SearchResultSchemaType } from "@/schemas/searchResult";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Loader from "../loader/Loader";
import { Search } from "lucide-react";
import useGetResults from "@/hooks/useGetResults";
import { useQueryClient } from "@tanstack/react-query";
import useDebounce from "@/hooks/useDebounce";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SearchResult from "../search-result/SearchResult";
import { db } from "@/firebase/config";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";

interface Props {
  data?: RecommendationDataSchemaType;
}

export default function RecommendationForm({ data }: Props) {
  const form = useForm<RecommendationFormType>({
    resolver: zodResolver(recommendationFormSchema),
    defaultValues: data ?? {
      category: "livro",
      searchTerm: "",
      personalComment: "",
    },
  });

  const [selectedResult, setSelectedResult] = useState<
    SearchResultSchemaType | undefined
  >(undefined);

  const router = useRouter();
  const searchTerm = useDebounce(form.watch("searchTerm"));
  const category = form.watch("category");
  const queryClient = useQueryClient();

  const { user } = useAuthContext();

  const { data: results, isLoading, isError, error } = useGetResults(category, searchTerm);

  useEffect(() => {
    if (isError) {
      toast.error(error.message)
    }
  }, [isError, error?.message])

  function handleSelectResult(result: SearchResultSchemaType) {
    setSelectedResult(result);
    form.setValue("searchTerm", "");
  }

  function handleCategoryChange() {
    queryClient.invalidateQueries({
      predicate: (query) =>
        query.queryKey[0] === "resultData" && query.queryKey[1] === searchTerm,
    });

    form.setValue("searchTerm", "");
    setSelectedResult(undefined);
  }

  async function handleAddRecommendation(values: RecommendationFormType) {
    if (selectedResult === undefined) {
      toast.error("Selecione um resultado!");
      return;
    }

    const recommendation: Omit<RecommendationDataSchemaType, "id"> = {
      ...selectedResult,
      category,
      personalComment: values.personalComment,
      userId: user?.uid!,
      userName: user?.displayName,
    };

    if (data) {
      try {
        await updateDoc(doc(db, "recommendations", data.id), recommendation);
        toast.success("Recomendação atualizada!");

        return;
      } catch (err) {
        toast.error("Erro ao atualizar recomendação.");
      }
    } else {
      try {
        await addDoc(collection(db, "recommendations"), recommendation);

        toast.success("Recomendação adicionada!");
      } catch (e) {
        toast.error("Erro ao adicionar recomendação!");
      }
    }

    router.replace("/profile?r=false");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleAddRecommendation)}
        className="space-y-8 overflow-y-scroll max-h-[70vh] lg:max-h-full"
      >
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    handleCategoryChange();
                  }}
                  defaultValue={field.value}
                  {...field}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="livro">Livro</SelectItem>
                    <SelectItem value="música">Música</SelectItem>
                    <SelectItem value="filme/série">Série/Filme</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="searchTerm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pesquisar Recomendação</FormLabel>
              <FormControl>
                <div className="w-full relative">
                  <div
                    className={`flex items-center ${
                      searchTerm !== "" ? "rounded-t-md" : "rounded-md"
                    } border border-input shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary pl-2 overflow-hidden`}
                  >
                    <Search className="text-muted-foreground" />
                    <Input
                      className="border-none focus-visible:ring-0"
                      placeholder={
                        selectedResult?.name ??
                        "Digite o nome ou termo de pesquisa"
                      }
                      {...field}
                    />
                  </div>

                  {searchTerm && (
                    <div className="z-10 w-full h-56 absolute top-[37px] rounded-b-md bg-white border-2 border-input shadow-sm transition-colors overflow-y-scroll space-y-4">
                      {isLoading && (
                        <div className="flex justify-center mt-4">
                          <Loader />
                        </div>
                      )}

                      {results && results.length > 0 ? (
                        results.map((result) => (
                          <SearchResult
                            key={result.id}
                            result={result}
                            handleSelectResult={handleSelectResult}
                          />
                        ))
                      ) : (
                        <p className="text-center mt-4">Sem Resultados</p>
                      )}
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {selectedResult !== undefined && (
          <SearchResult result={selectedResult} />
        )}

        <FormField
          control={form.control}
          name="personalComment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comentário Pessoal</FormLabel>
              <FormControl>
                <Textarea
                  rows={10}
                  className="resize-none"
                  placeholder="Fale mais sobre a sua recomendação! (opcional)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full py-6"
          disabled={form.formState.isSubmitting}
          role="signInButton"
        >
          {form.formState.isSubmitting ? <Loader /> : <p>Recomendar!</p>}
        </Button>
      </form>
    </Form>
  );
}
