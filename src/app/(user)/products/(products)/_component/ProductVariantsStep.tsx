import type { UseFormReturn } from "react-hook-form";
import type { AddProductValue } from "@/lib/validation/product";
import { useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface ProductVariantsStepProps {
  form: UseFormReturn<AddProductValue>;
}

export function ProductVariantsStep({ form }: ProductVariantsStepProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  const addSize = (variantIndex: number) => {
    const currentSizes = form.getValues(`variants.${variantIndex}.size`) || [];
    form.setValue(`variants.${variantIndex}.size`, [
      ...currentSizes,
      { size: "", quantity: 0, amount: 0.01 }
    ]);
  };

  const removeSize = (variantIndex: number, sizeIndex: number) => {
    const currentSizes = form.getValues(`variants.${variantIndex}.size`);
    const newSizes = currentSizes.filter((_, index) => index !== sizeIndex);
    form.setValue(`variants.${variantIndex}.size`, newSizes);
  };

  return (
    <div className="space-y-6">
      {fields.map((variant, variantIndex) => {
        return (
          <div key={variant.id} className="border rounded-md p-4 space-y-4">
            <div className="flex justify-between items-center">
              <p className="font-semibold">Variant {variantIndex + 1} (Select Color)</p>
              <FormField
                control={form.control}
                name={`variants.${variantIndex}.color`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} type="color" className="h-10 w-20" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {variantIndex !== 0 && (
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  onClick={() => remove(variantIndex)}
                >
                  Remove Variant
                </Button>
              )}
            </div>

            <FormField
              control={form.control}
              name={`variants.${variantIndex}.sizeMeasurementUnit`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size Unit</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., cm, inches, EU size" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Nested Size Array */}
            <div className="space-y-4">
              {form.watch(`variants.${variantIndex}.size`)?.map((size, sizeIndex) => (
                <div key={`${variant.id}-size-${sizeIndex}`} className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name={`variants.${variantIndex}.size.${sizeIndex}.size`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Size</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter size" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`variants.${variantIndex}.size.${sizeIndex}.quantity`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" min="0" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`variants.${variantIndex}.size.${sizeIndex}.amount`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" min="0.01" step="0.01" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {sizeIndex > 0 && (
                    <Button
                      type="button"
                      size="md"
                      variant="destructive"
                      className="w-full col-span-3"
                      onClick={() => removeSize(variantIndex, sizeIndex)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <Button
              type="button"
              size="md"
              variant="outline"
              className="w-full col-span-3 border-dashed"
              onClick={() => addSize(variantIndex)}
            >
              Add More Sizes
            </Button>
          </div>
        );
      })}

      <Button
        type="button"
        variant="outline"
        size="md"
        className="w-full border-dashed"
        onClick={() => append({
          color: "#000000",
          size: [{ size: "", quantity: 0, amount: 0.01 }],
          sizeMeasurementUnit: ""
        })}
      >
        Add More Variants
      </Button>
    </div>
  );
}