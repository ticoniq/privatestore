import type { UseFormReturn } from "react-hook-form";
import type { AddProductValue } from "@/lib/validation/product";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { MultiSelect } from "@/components/ui/multi-select";
import { variantList } from "@/lib/constants";

interface ProductExtrasStepProps {
  form: UseFormReturn<AddProductValue>;
}

export function ProductExtrasStep({ form }: ProductExtrasStepProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="extras.0.categoryExtrasId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Select Addons</FormLabel>
            <FormControl>
              <MultiSelect
                options={variantList}
                onValueChange={field.onChange}
                defaultValue={field.value}
                placeholder="Select options"
                variant="inverted"
                animation={2}
                maxCount={3}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}