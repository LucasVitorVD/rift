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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
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

export default function RecommendationForm() {
  const form = useForm<RecommendationType>({
    resolver: zodResolver(recommendationSchema),
    defaultValues: {
      recommendationCategory: "book",
      searchRecommendation: "",
      personalComment: ""
    }
  });

  const searchValue = form.watch("searchRecommendation", "");

  function handleCreateRecommendation(values: RecommendationType) {
    console.log(values);

    toast.success("Recomendação adicionada!")
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
          name="searchRecommendation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pesquisar Recomendação</FormLabel>
              <FormControl>
                <Command>
                  <CommandInput
                    placeholder="Digite o nome ou termo de pesquisa"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  />
                  {searchValue && (
                    <CommandList>
                      <CommandEmpty>Sem resultados.</CommandEmpty>
                      <CommandGroup heading="Resultados">
                        <CommandItem>Calendar</CommandItem>
                        <CommandItem>Search Emoji</CommandItem>
                        <CommandItem>Calculator</CommandItem>
                      </CommandGroup>
                      <CommandSeparator />
                    </CommandList>
                  )}
                </Command>
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
