import type { UseFormReturn } from "react-hook-form";
import type { AddProductValue } from "@/lib/validation/product";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { ImageUploader } from "@/components/ui/ImageUploader";

interface ProductImagesStepProps {
  form: UseFormReturn<AddProductValue>;
}

export function ProductImagesStep({ form }: ProductImagesStepProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="productImages"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Image Upload</FormLabel>
            <FormControl>
              <ImageUploader
                onChange={(productImages) => {
                  field.onChange(productImages);
                }}
                maxFiles={5}
                maxSizeInMB={2}
                accept={["image/jpeg", "image/png", "image/gif"]}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}