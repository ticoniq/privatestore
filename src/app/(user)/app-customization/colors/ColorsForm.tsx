'use client';

import { useState, useTransition } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { Button } from '@/components/ui/button';
import { colorsSchema, type ColorsValues } from "@/lib/validation/app-customization";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { colorPresets } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { LoadingButton } from "@/components/ui/loading-button";
import { PhonePreview } from "./PhonePreview";
import { useToast } from "@/hooks/use-toast";

interface ColorOption {
  name: string;
  value: string;
}

export function ColorsForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const [customColors, setCustomColors] = useState<Partial<ColorsValues>>({
    primary: '#4F46E5',
  });

  const form = useForm<ColorsValues>({
    resolver: zodResolver(colorsSchema),
    defaultValues: {
      primary: '#4F46E5',
      background: '#FFFFFF',
      headerText: '#000000',
      bodyText: '#000000',
    },
  });

  const onSubmit = async (values: ColorsValues) => {
    startTransition(async () => {
      try {
        // TODO: Replace with actual API call template colors
        // const response = await updateColors(values);

        toast({
          title: "Colours Updated",
          description: "Colours has been successfully updated.",
        });
        console.log(values, "Color scheme has been successfully saved..")
      } catch (error) {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
        console.log(error, "Something went wrong. Please try again.")
      }
    });
  };

  const handleColorSelect = (type: keyof ColorsValues, color: ColorOption) => {
    if (color.value === 'custom') {
      return;
    }
    form.setValue(type, color.value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleCustomColorChange = (type: keyof ColorsValues, value: string) => {
    setCustomColors((prev) => ({
      ...prev,
      [type]: value,
    }));
    form.setValue(type, value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const ColorSection = ({ title, type, options, allowCustom = false }:
    {
      title: string;
      type: keyof typeof colorPresets;
      options: ColorOption[];
      allowCustom?: boolean;
    }) => {
    // Filter out the custom option if not allowed
    const filteredOptions = allowCustom
      ? options
      : options.filter(color => color.name !== 'Custom');

    return (
      <FormField
        control={form.control}
        name={type}
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>{title}</FormLabel>
            <FormControl>
              <div className="flex flex-wrap gap-5">
                {filteredOptions.map((color) => (
                  color.name === 'Custom' ? (
                    <Button
                      key={color.name}
                      type="button"
                      className="relative h-[72px] flex-grow rounded"
                      style={{ backgroundColor: customColors[type] }}
                    >
                      <Label htmlFor={`color-${color.name}`} className="cursor-pointer">
                        <span>Custom</span>
                      </Label>
                      <Input
                        type="color"
                        id={`color-${color.name}`}
                        value={customColors[type]}
                        onChange={(e) => handleCustomColorChange(type, e.target.value)}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </Button>
                  ) : (
                    <Button
                      key={color.name}
                      type="button"
                      style={{ backgroundColor: color.value }}
                      className={cn(
                        ' h-[72px] flex-grow rounded',
                        {
                          'border border-gray-200': type === 'background',
                          'ring-2 ring-offset-2 ring-black': field.value === color.value,
                        }
                      )}
                      onClick={() => handleColorSelect(type, color)}
                    >
                      <span className={`
                        ${type === 'background' ? 'text-gray-700' : 'text-white'}
                        ${field.value === color.value ? 'font-medium' : ''}
                      `}>
                        {color.name}
                      </span>
                    </Button>
                  )
                ))}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  return (
    <section>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 xl:flex-row"
        >
          <Card className="w-full pt-4">
            <CardHeader className="sr-only">
              <CardTitle>Colors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <ColorSection title="Primary" type="primary" options={colorPresets.primary} allowCustom={true} />
              <ColorSection title="Background Color" type="background" options={colorPresets.background} />
              <ColorSection title="Header Text Color" type="headerText" options={colorPresets.headerText} />
              <ColorSection title="Body Text Color" type="bodyText" options={colorPresets.bodyText} />
            </CardContent>
          </Card>
          <aside className="space-y-8">
            <PhonePreview
              primaryColor={form.watch("primary")}
              backgroundCol={form.watch("background")}
              headerTextColor={form.watch("headerText")}
              bodyTextColor={form.watch("bodyText")}
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
                <Link href="/app-customization/color">Publish</Link>
              </Button>
            </div>
          </aside>
        </form>
      </Form>
    </section>
  );
}