"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Category,
  recommendationFormSchema,
  RecommendationFormType,
} from "@/schemas/form";
import { RecommendationProps } from "@/interfaces/recommendationTypes";
import { SearchResultProps } from "@/interfaces/recommendationTypes";
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
import { Search } from "lucide-react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import useDebounce from "@/hooks/useDebounce";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SearchResult from "../search-result/SearchResult";
import {
  addNewRecommendation,
  updateRecommendation,
} from "@/lib/actions";
import { useSession } from "next-auth/react";
import SearchResultsList from "../searchResultsList/SearchResultsList";
import { CategoryEnum } from "@/interfaces/category";

interface Props {
  previewData?: RecommendationProps;
  setShouldOpenModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RecommendationForm({
  previewData,
  setShouldOpenModal,
}: Props) {
  const form = useForm<RecommendationFormType>({
    resolver: zodResolver(recommendationFormSchema),
    defaultValues: previewData
      ? {
          category: CategoryEnum[
            previewData?.categoryId
          ].toLowerCase() as Category,
          searchTerm: "",
          personalComment: previewData?.personalComment,
        }
      : {
          category: "livro",
          searchTerm: "",
          personalComment: "",
        },
  });

  const [selectedResult, setSelectedResult] = useState<SearchResultProps | null>(previewData ?? null);
  const [showSearchList, setShowSearchList] = useState(false);

  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get("page")) ?? 0
  const router = useRouter();
  const searchTerm = useDebounce(form.watch("searchTerm"));
  const category = form.watch("category");
  const queryClient = useQueryClient();
  const session = useSession();

  const { mutateAsync: createRecommendationFn } = useMutation({
    mutationFn: addNewRecommendation,
    onSuccess: (result, variables) => {
      const newRecommendation: RecommendationProps = { id: result.id, ...variables }

      queryClient.setQueryData(["userRecommendations", variables.userId, currentPage], (oldData: RecommendationProps[]) => {
        return [ ...oldData, newRecommendation ].slice(0, 6)
      })

      toast.success("Recomendação adicionada!");
    },
    onError: (error) => { 
      toast.error(error.message);
    }
  })

  const { mutateAsync: updateRecommendationFn } = useMutation({
    mutationFn: updateRecommendation,
    onSuccess: (_, variables) => {
      const updatedRecommendation: RecommendationProps = { ...variables }

      queryClient.setQueryData(["userRecommendations", variables.userId, currentPage], (oldData: RecommendationProps[]) => {
        return oldData.map((data) => data.id === updatedRecommendation.id ? updatedRecommendation : data)
      })

      toast.success("Recomendação editada!")
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  function handleSelectResult(result: SearchResultProps) {
    setSelectedResult(result);
    form.setValue("searchTerm", "");
  }

  function handleCategoryChange() {
    queryClient.invalidateQueries({
      predicate: (query) =>
        query.queryKey[0] === "resultData" && query.queryKey[1] === searchTerm,
    });

    form.setValue("searchTerm", "");
  }

  async function handleSubmit(values: RecommendationFormType) {
    if (!selectedResult) {
      toast.error("Selecione um resultado.");
      return;
    }

    if (!previewData) {
      const recommendation = {
        ...selectedResult,
        categoryId:
          CategoryEnum[category.toUpperCase() as keyof typeof CategoryEnum],
        personalComment: values.personalComment,
        userId: session.data?.user?.id!,
      };

      createRecommendationFn(recommendation as RecommendationProps)

      router.replace("/profile");
    } else {
      const updatedRecommendation: RecommendationProps = {
        ...previewData,
        ...selectedResult,
        categoryId:
          CategoryEnum[category.toUpperCase() as keyof typeof CategoryEnum],
        personalComment: values.personalComment,
      };

      updateRecommendationFn(updatedRecommendation);
    }

    if (setShouldOpenModal) setShouldOpenModal(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-8 px-1 overflow-y-scroll max-h-[70vh] lg:max-h-full lg:overflow-y-auto"
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
                      onFocus={() => setShowSearchList(true)}
                      className="border-none focus-visible:ring-0"
                      placeholder={
                        selectedResult?.name ??
                        "Digite o nome ou termo de pesquisa"
                      }
                      {...field}
                    />
                  </div>

                  {showSearchList && searchTerm && (
                    <SearchResultsList
                      category={category}
                      searchTerm={searchTerm}
                      showSearchList={showSearchList}
                      setShowSearchList={setShowSearchList}
                      handleSelectResult={handleSelectResult}
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {selectedResult && <SearchResult result={selectedResult} />}

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
          {!form.formState.isSubmitting && !previewData
            ? "Recomendar!"
            : "Editar!"}
        </Button>
      </form>
    </Form>
  );
}
