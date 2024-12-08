"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CirclePlusIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { addProductSchema, type AddProductValue } from "@/lib/validation/product";
import { Form } from "@/components/ui/form";
import { LoadingButton } from "@/components/ui/loading-button";
import { cn } from "@/lib/utils";
import { addNewProduct } from "./actions";
import { ProductDetailsStep } from "./_component/ProductDetailsStep";
import { ProductVariantsStep } from "./_component/ProductVariantsStep";
import { ProductExtrasStep } from "./_component/ProductExtrasStep";
import { ProductImagesStep } from "./_component/ProductImagesStep";
import { ProductOptions } from "./_component/ProductOptions";
import { ErrorBoundary } from 'react-error-boundary';

const steps = [
  {
    id: "Step 1",
    name: "Product Details",
    fields: [
      "productName",
      "productDescription",
      "categoryId",
      "price",
      "totalQuantity",
      "discountPercent",
      "enabled",
      "requireExtras",
    ],
  },
  {
    id: "Step 2",
    name: "Product Options",
    fields: ["productOptions"],
  },
  {
    id: "Step 3",
    name: "Product Variants",
    fields: ["variants"],
  },
  {
    id: "Step 4",
    name: "Add-ons",
    fields: ["extras"],
  },
  {
    id: "Step 5",
    name: "Product Images",
    fields: ["productImages"],
  },
];

function ErrorFallback({error}: {error: Error}) {
  return (
    <div className="p-4 text-red-500">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  );
}

export function AddProduct() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<AddProductValue>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      categoryId: "",
      productName: "",
      productDescription: "",
      price: 1,
      totalQuantity: 1,
      discountPercent: 1,
      enabled: false,
      requireExtras: false,
      variants: [{
        color: "#000000",
        size: [{
          size: "",
          quantity: 0,
          amount: 0.01
        }],
        sizeMeasurementUnit: ""
      }],
      extras: [{ categoryExtrasId: [], required: true }],
      productOptions: [{
        optionTitle: "",
        requireSelection: false,
        options: []
      }],
      productImages: [],
    },
  });

  const next = async () => {
    const fields = steps[currentStep]?.fields ?? [];
    const output = await form.trigger(fields as (keyof AddProductValue)[]);

    if (output && currentStep < steps.length - 1) {
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1);
    }
  };

  async function onSubmit(values: AddProductValue) {
    startTransition(async () => {
      try {
        const { error, success } = await addNewProduct(values);
        console.log(values);
        if (success) {
          toast({
            title: "Product Added",
            description: success,
          });
          form.reset();
          setCurrentStep(0);
          setIsOpen(false);
        }
        if (error) {
          toast({
            title: "Error",
            description: error,
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Failed to add product:", error);
      }
    });
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <SheetTrigger asChild>
          <Button variant="gooeyLeft" size="sm">
            <CirclePlusIcon className="size-4 mr-2" />
            Add New Product
          </Button>
        </SheetTrigger>
        <SheetContent className="sm:max-w-[588px] h-full overflow-auto scrollbar-none">
          <SheetHeader>
            <SheetTitle>Add New Product</SheetTitle>
            <SheetDescription className="sr-only">Add new Product</SheetDescription>
          </SheetHeader>

          <nav aria-label="Progress" className="my-4">
            <ul className="flex space-x-4">
              {steps.map((step, index) => (
                <li
                  key={step.id}
                  className="w-full"
                >
                  <div
                    className={cn("w-full h-2 grid grid-cols-4 gap-2 bg-gray-300 rounded-full", {
                      "bg-primary-700": currentStep >= index,
                    })}
                  />
                </li>
              ))}
            </ul>
          </nav>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 h-full flex flex-col justify-between">
              {/* Product Details Step */}
              {currentStep === 0 && <ProductDetailsStep form={form} />}

              {/* Product Options Step */}
              {currentStep === 1 && <ProductOptions form={form} />}

              {/* Product Variants Step */}
              {currentStep === 2 && <ProductVariantsStep form={form} />}

              {/* Product Extras Step */}
              {currentStep === 3 && <ProductExtrasStep form={form} />}

              {/* Product Images Step */}
              {currentStep === 4 && <ProductImagesStep form={form} />}


              <div className="flex justify-between gap-2 py-5">
                {currentStep > 0 && (
                  <Button type="button" variant="outline" onClick={prev} size="sm" className="w-full">
                    Previous
                  </Button>
                )}

                {currentStep < steps.length - 1 && (
                  <Button type="button" onClick={next} size="sm" className="w-full">
                    Next
                  </Button>
                )}

                {currentStep === steps.length - 1 && (
                  <LoadingButton 
                    loading={isPending} 
                    type="submit" 
                    size="sm" 
                    variant="gooeyLeft" 
                    className="w-full"
                    disabled={isPending}
                  >
                    {isPending ? 'Publishing...' : 'Publish'}
                  </LoadingButton>
                )}
              </div>
            </form>
          </Form>
        </SheetContent>
      </ErrorBoundary>
    </Sheet>
  );
}