"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";

import { templates } from "@/lib/constants";
import { templateSchema, type TemplateValues } from "@/lib/validation/app-customization";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { LoadingButton } from "@/components/ui/loading-button";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

export const TemplateForm = () => {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<TemplateValues>({
    resolver: zodResolver(templateSchema),
    defaultValues: {
      template: "",
      templateCategories: {
        categoryStyle: "",
        categoryImage: "",
      },
      templateNavbarStyles: {
        navBarStyle: "",
        categoryImage: "",
      },
    },
  });

  const selectedTemplateStyle = form.watch("template");
  const selectedCategoryStyle = form.watch("templateCategories.categoryStyle");
  const selectedNavbarStyle = form.watch("templateNavbarStyles.navBarStyle");

  const selectedTemplate = templates.find(
    (t) => t.templateStyle === selectedTemplateStyle
  );

  useEffect(() => {
    if (selectedTemplate) {
      // Update Category Image
      const categoryImage = selectedTemplate.templateCategories.find(
        (category) => category.categoryStyle === selectedCategoryStyle
      )?.categoryImage ?? "";

      form.setValue("templateCategories.categoryImage", categoryImage, {
        shouldValidate: true
      });

      // Update Navbar Image
      const navbarImage = selectedTemplate.templateNavbarStyles.find(
        (navbar) => navbar.navBarStyle === selectedNavbarStyle
      )?.categoryImage ?? "";

      form.setValue("templateNavbarStyles.categoryImage", navbarImage, {
        shouldValidate: true
      });
    }
  }, [
    selectedTemplate,
    selectedCategoryStyle,
    selectedNavbarStyle,
    form
  ]);

  const handleSubmit = async (values: TemplateValues) => {
    startTransition(async () => {
      try {
        // TODO: Replace with actual API call template styles
        // const response = await updateTemplateAction(values);

        toast({
          title: "Template Updated",
          description: "Your template has been successfully updated.",
        });

        // Optional: Add any post-submission logic
        console.log("Template updated:", values);
      } catch {
        toast({
          title: "Error",
          description: "Failed to update template. Please try again.",
          variant: "destructive"
        });
        console.error("Something went wrong. Please try again.");
      }
    });
  };

  const renderTemplateSelection = () => (
    <FormField
      control={form.control}
      name="template"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="flex flex-wrap gap-10">
              {templates.map((template) => (
                <div
                  key={template.templateStyle}
                  onClick={() => field.onChange(template.templateStyle)}
                  className={cn(
                    "relative cursor-pointer rounded-2xl border-2 p-1 transition-all hover:border-primary",
                    field.value === template.templateStyle
                      ? "border-primary"
                      : "border-gray-200"
                  )}
                >
                  <div className="w-full overflow-hidden rounded-xl">
                    <Image
                      src={template.templateImage}
                      alt={template.templateStyle}
                      width={111}
                      height={160}
                      style={{
                        width: 111,
                        height: 'auto',
                        objectFit: 'contain'
                      }}
                      priority
                    />
                  </div>
                </div>
              ))}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  const renderCategoryStyleSelection = () => {
    if (!selectedTemplate) return null;

    return (
      <div className="space-y-6">
        <h3 className="text-base font-semibold">Select Category Style</h3>
        <FormField
          control={form.control}
          name="templateCategories.categoryStyle"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex flex-wrap gap-4 w-full"
                >
                  {selectedTemplate.templateCategories.map((category) => (
                    <div
                      key={category.categoryStyle}
                      className="relative cursor-pointer transition-all"
                    >
                      <RadioGroupItem
                        value={category.categoryStyle}
                        id={category.categoryStyle}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={category.categoryStyle}
                        className="relative cursor-pointer hover:bg-gray-50"
                      >
                        <Card
                          className={cn(
                            "relative border-2 transition-all duration-200 hover:border-primary/50 group",
                            field.value === category.categoryStyle
                              ? "border-primary"
                              : "border-muted"
                          )}
                        >
                          <CardContent className="p-4 flex justify-center items-center">
                            <Image
                              src={category.categoryImage}
                              alt={category.categoryStyle}
                              width={194}
                              height={110}
                              style={{
                                width: 194,
                                height: 'auto',
                                objectFit: 'contain'
                              }}
                              priority
                            />
                          </CardContent>
                        </Card>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Input
          type="hidden"
          {...form.register("templateCategories.categoryImage")}
        />
      </div>
    );
  };

  const renderNavbarStyleSelection = () => {
    if (!selectedTemplate) return null;

    return (
      <div className="space-y-6">
        <h3 className="text-base font-semibold">Select Navbar Style</h3>
        <FormField
          control={form.control}
          name="templateNavbarStyles.navBarStyle"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex flex-wrap gap-4 w-full"
                >
                  {selectedTemplate.templateNavbarStyles.map((navbar) => (
                    <div
                      key={navbar.navBarStyle}
                      className="relative cursor-pointer transition-all"
                    >
                      <RadioGroupItem
                        value={navbar.navBarStyle}
                        id={navbar.navBarStyle}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={navbar.navBarStyle}
                        className="relative cursor-pointer hover:bg-gray-50"
                      >
                        <Card
                          className={cn(
                            "relative border-2 transition-all duration-200 hover:border-primary/50 group",
                            field.value === navbar.navBarStyle
                              ? "border-primary"
                              : "border-muted"
                          )}
                        >
                          <CardContent className="p-3 flex justify-center items-center">
                            <Image
                              src={navbar.categoryImage}
                              alt={navbar.navBarStyle}
                              width={215}
                              height={40}
                              style={{ 
                                width: 215, 
                                height: 'auto',
                                objectFit: 'contain'
                              }}
                              priority
                            />
                          </CardContent>
                        </Card>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Input
          type="hidden"
          {...form.register("templateNavbarStyles.categoryImage")}
        />
      </div>
    );
  };

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Select Template Style
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-10">
              {/* Template Style Selection */}
              {renderTemplateSelection()}

              {selectedTemplate && (
                <>
                  {/* Category Style Selection */}
                  {renderCategoryStyleSelection()}

                  {/* Navbar Style Selection */}
                  {renderNavbarStyleSelection()}
                </>
              )}

              <div className="flex gap-3 justify-end">
                <LoadingButton
                  type="submit"
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
                  <Link href="/app-customization/typography-icon">Next</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </section>
  );
};