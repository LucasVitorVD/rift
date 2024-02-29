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

export default function RecommendationForm() {
  const form = useForm<RecommendationType>({
    resolver: zodResolver(recommendationSchema),
  });

  const searchTerm = form.watch("searchTerm", "");

  function handleCreateRecommendation(values: RecommendationType) {
    console.log(values);

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
                  onValueChange={field.onChange}
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
                  <div className={`flex items-center ${searchTerm !== "" ? "rounded-t-md" : "rounded-md"} border border-input shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary pl-2 overflow-hidden`}>
                    <Search className="text-muted-foreground" />
                    <Input
                      className="border-none focus-visible:ring-0"
                      placeholder="Digite o nome ou termo de pesquisa"
                      {...field}
                    />
                  </div>

                  {searchTerm !== "" && (
                    <div className="z-10 w-full h-56 absolute top-[37px] rounded-b-md bg-white border-2 border-input shadow-sm transition-colors">
                      No results
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
