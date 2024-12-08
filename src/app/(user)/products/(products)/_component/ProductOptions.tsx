"use client";

import { TagInput } from "@/components/ui/tag-input";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { UseFormReturn } from "react-hook-form";
import type { AddProductValue } from "@/lib/validation/product";

interface ProductOptionsProps {
  form: UseFormReturn<AddProductValue>;
}

export function ProductOptions({ form }: ProductOptionsProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="productOptions.0.optionTitle"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Option Title</FormLabel>
            <FormControl>
              <Input {...field} placeholder="e.g., Size, Color, Style" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="productOptions.0.options"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Options</FormLabel>
            <FormControl>
              <TagInput
                placeholder="Enter options and press Enter"
                tags={field.value}
                setTags={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
