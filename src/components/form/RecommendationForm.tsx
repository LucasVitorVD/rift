"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { recommendationSchema, RecommendationType } from "@/schemas/form";
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
import SearchResult from "../search-result/SearchResult";
import useDebounce from "@/hooks/useDebounce";

{
  /* TODO: criar objeto com os dados desejados */
}
{
  /* TODO: adicionar dados no db */
}
{
  /* TODO: refatorar esse componente!!! */
}

export default function RecommendationForm() {
  const form = useForm<RecommendationType>({
    resolver: zodResolver(recommendationSchema),
    defaultValues: {
      recommendationCategory: "book",
      searchTerm: "",
      personalComment: "",
    },
  });

  const searchTerm = useDebounce(form.watch("searchTerm", ""));
  const category = form.watch("recommendationCategory", "book");
  const queryClient = useQueryClient();

  const {
    data: results,
    isLoading,
    isError,
    error,
  } = useGetResults(category, searchTerm);

  console.log(results);

  if (isError) {
    toast.error(error.message);
  }

  function handleCategoryChange() {
    queryClient.invalidateQueries({
      predicate: (query) =>
        query.queryKey[0] === "spotifyTracks" &&
        query.queryKey[1] === searchTerm,
    });
    form.setValue("searchTerm", "");
  }

  async function handleCreateRecommendation(values: RecommendationType) {
    toast.success("Recomendação adicionada!");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleCreateRecommendation)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="recommendationCategory"
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
                    <SelectItem value="book">Livro</SelectItem>
                    <SelectItem value="song">Música</SelectItem>
                    <SelectItem value="tv-show">Série/Filme</SelectItem>
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
                      placeholder="Digite o nome ou termo de pesquisa"
                      {...field}
                    />
                  </div>

                  {searchTerm && (
                    <div className="z-10 w-full h-56 absolute top-[37px] rounded-b-md bg-white border-2 border-input shadow-sm transition-colors overflow-y-scroll space-y-4">
                      {isLoading && <Loader />}

                      {!isLoading && results && results.length > 0 ? (
                        results.map((result) => (
                          <SearchResult
                            key={result.id}
                            id={result.id}
                            name={result.name}
                            image={result.image}
                            description={result.description}
                          />
                        ))
                      ) : (
                        <p>Sem Resultados</p>
                      )}
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
