"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CirclePlusIcon, CloudUploadIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast";
import { ACCEPTED_MIME_TYPES, addAddonSchema, type AddAddonValue } from "@/lib/validation/product";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { LoadingButton } from "@/components/ui/loading-button";

export function AddCategory() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<AddAddonValue>({
    resolver: zodResolver(addAddonSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      price: 0,
      quantity: 0,
      discount: 1,
      image: undefined,
    },
  });

  async function onSubmit(values: AddAddonValue) {
    startTransition(async () => {
      try {
        console.log(values);
        // TODO: Add your submission logic here
        // Add your submission logic here
        toast({
          title: "Addon Added",
          description: "Your Addon has been successfully added.",
        });
        form.reset();
        setIsOpen(false);
      } catch {
        toast({
          title: "Error",
          description: "Failed to add Addon.",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="gooeyLeft"
          size="sm"
        >
          <CirclePlusIcon className="size-4 mr-2" />
          Add New Addon
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[588px] h-full overflow-auto scrollbar-none">
        <SheetHeader>
          <SheetTitle>Add Addon</SheetTitle>
          <SheetDescription className="sr-only">
            Add new Addon
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-5 flex flex-col gap-5 justify-between h-full"
          >
            <div className="space-y-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Addon Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Category Description" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Addon Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ty1">icon 1</SelectItem>
                        <SelectItem value="ty2">icon 2</SelectItem>
                        <SelectItem value="ty3">icon 3</SelectItem>
                        <SelectItem value="ty4">icon 4</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} placeholder="Enter Addons Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} placeholder="Enter Quantity Available" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} placeholder="Enter Discount Percentage" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <div className="flex items-center justify-center w-full">
                      <FormLabel htmlFor="dropzone-file" className="px-4 space-y-3 flex flex-col items-center justify-center w-full h-36 border-2 border-dotted border-border rounded-lg cursor-pointer md:h-[76px] md:flex-row md:justify-between md:space-y-0">
                        <div className="space-y-3 flex flex-col items-center justify-center md:flex-row md:space-y-0">
                          <div className="bg-neutral-100 w-8 h-8 mr-2 rounded-full flex justify-center items-center md:mr-0">
                            <CloudUploadIcon className="w-3 h-3" />
                          </div>
                          <div className="text-center md:text-left">
                            <p className="text-xs">Tap to Upload Profile Picture</p>
                            <p className="text-xs text-neutral-400">SVG, PNG, JPG, GIF | 10MB max.</p>
                          </div>
                        </div>
                        <div>
                          <Input
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                            accept={ACCEPTED_MIME_TYPES.join(",")}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              onChange(file);
                            }}
                            {...fieldProps}
                          />
                          <div className="flex px-5 h-9 flex-col bg-primary-700 rounded-md text-white text-xs font-semibold leading-4 items-center justify-center cursor-pointer">Upload</div>
                        </div>
                      </FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <SheetFooter className="pb-5">
              <LoadingButton
                loading={isPending}
                variant="gooeyLeft"
                className="w-full"
              >
                Save
              </LoadingButton>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
