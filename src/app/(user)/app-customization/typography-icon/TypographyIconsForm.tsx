"use client"

import { useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { typographySchema, type TypographyValues } from "@/lib/validation/app-customization"
import { typographyIcon } from "@/lib/constants"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import TypographyPreview from "./TypographyPreview"
import { LoadingButton } from "@/components/ui/loading-button"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export function TypographyIconsForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<TypographyValues>({
    resolver: zodResolver(typographySchema),
    defaultValues: {
      headerFont: {
        font: "Roboto",
        weight: "600",
      },
      bodyFont: {
        font: "Roboto",
        weight: "400",
      },
      iconLibrary: {
        library: "Feather",
        style: "Style 1",
      },
    },
  })

  async function onSubmit(values: TypographyValues) {
    startTransition(async () => {
      try {
        console.log(values)
        // TODO: Replace with actual API call typographyIcon update
        // const response = await updateTypography(values);
        
        toast({
          title: "Typography Updated",
          description: "Typography updated successfully",
        });
        console.log("Typography Icon updated successfully")
      } catch {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
        console.log("Something went wrong. Please try again.")
      }
    });
  }

  return (
    <section>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 xl:flex-row"
        >
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Header Font</CardTitle>
            </CardHeader>
            <CardContent className="space-y-7">
              <div className="grid gap-6 lg:grid-cols-2">

                <FormField
                  control={form.control}
                  name="headerFont.font"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Font</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select font" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {typographyIcon.fontOptions.map((font) => (
                            <SelectItem key={font} value={font}>
                              {font}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="headerFont.weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select weight" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {typographyIcon.fontWeights.map((weight) => (
                            <SelectItem key={weight} value={weight}>
                              {weight}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-6 lg:grid-cols-2">
                <p className="col-span-2 font-semibold">Body Font</p>

                <FormField
                  control={form.control}
                  name="bodyFont.font"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Font</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select font" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {typographyIcon.fontOptions.map((font) => (
                            <SelectItem key={font} value={font}>
                              {font}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bodyFont.weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select weight" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {typographyIcon.fontWeights.map((weight) => (
                            <SelectItem key={weight} value={weight}>
                              {weight}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <p className="col-span-2 font-semibold">Icon Library</p>

                <FormField
                  control={form.control}
                  name="iconLibrary.library"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Library</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select icon library" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {typographyIcon.iconLibrary.library.map((library) => (
                            <SelectItem key={library} value={library}>
                              {library}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="iconLibrary.style"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Style</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select icon style" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {typographyIcon.iconLibrary.style.map((library) => (
                            <SelectItem key={library} value={library}>
                              {library}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              </div>
            </CardContent>
          </Card>
          <aside className="space-y-8">
            <TypographyPreview
              headerFont={form.watch("headerFont")}
              bodyFont={form.watch("bodyFont")}
              iconLibrary={form.watch("iconLibrary")}
            />
            <div className="flex gap-3 justify-between">
              <LoadingButton
                loading={isPending}
                variant="outline"
                size="md"
              >
                Save
              </LoadingButton>
              <Button
                type="button"
                variant="gooeyLeft"
                size="md"
                asChild
              >
                <Link href="/app-customization/colors">Next</Link>
              </Button>
            </div>
          </aside>
        </form>
      </Form>
    </section>
  )
}