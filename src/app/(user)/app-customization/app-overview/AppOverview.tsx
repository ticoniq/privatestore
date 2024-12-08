'use client'

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CloudUploadIcon } from "lucide-react"
import { Label } from "@radix-ui/react-label"
import { appOverviewSchema, type AppOverviewValues } from "@/lib/validation/app-customization"
import { LoadingButton } from "@/components/ui/loading-button";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

const businessCategories = [
  "E-commerce",
  "Food & Beverage",
  "Healthcare",
  "Education",
  "Travel",
  "Real Estate",
  "Fashion",
  "Technology",
  "Entertainment",
  "Other"
]

export function AppOverview() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<AppOverviewValues>({
    resolver: zodResolver(appOverviewSchema),
    defaultValues: {
      logo: "",
      appName: "",
      appDescription: "",
      businessCategory: "",
      supportMail: "",
      supportPhoneNumber: "",
      featureSettings: {
        pushNotification: true,
        orderTracking: true,
        wishList: true,
        ratingsAndReview: true,
      },
    },
  })

  async function onSubmit(values: AppOverviewValues) {
    // setError(undefined);
    startTransition(async () => {
      // Call your API here
      try {
        // TODO: Replace with actual API call app overview settings update
        // const response = await updateAppSettings(values);
        toast({
          title: "App settings Updated",
          description: "App settings updated successfully",
        });
        console.log(values, "App settings updated successfully")
      } catch {
        toast({
          title: "Error",
          description: "Failed to update app settings",
          variant: "destructive",
        });
        console.log("Something went wrong. Please try again.")
      }
    });
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">App Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <div className="grid gap-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="appName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>App Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter App Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="businessCategory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {businessCategories.map((category) => (
                              <SelectItem key={category} value={category.toLowerCase()}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="appDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>App Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Add App Description"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="logo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload Logo</FormLabel>
                      <FormControl>

                        <div className="flex items-center justify-center w-full">
                          <Label htmlFor="dropzone-file" className="px-4 space-y-3 flex flex-col items-center justify-center w-full h-36 border-2 border-dotted border-border rounded-lg cursor-pointer md:h-[76px] md:flex-row md:justify-between md:space-y-0">
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
                                {...field}
                                accept="/image/*"
                              />
                              <div className="flex px-5 h-9 flex-col bg-primary-700 rounded-md text-white text-xs font-semibold leading-4 items-center justify-center cursor-pointer">Upload</div>
                            </div>
                          </Label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="space-y-3">
                    <p className="text-xl font-medium">Features</p>

                    <FormField
                      control={form.control}
                      name="featureSettings.wishList"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                          <FormLabel className="text-base">Wishlist</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="featureSettings.orderTracking"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                          <FormLabel className="text-base">Order Tracking</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="featureSettings.pushNotification"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                          <FormLabel className="text-base">Push Notifications</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="featureSettings.ratingsAndReview"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                          <FormLabel className="text-base">Ratings & Reviews</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-6">
                    <p className="text-xl font-medium">Support Contact Details</p>

                    <FormField
                      control={form.control}
                      name="supportMail"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input type="email" placeholder="support@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="supportPhoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input type="tel" placeholder="+1234567890" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>



              <div className="flex gap-3 justify-end">
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
                  <Link href="/app-customization/template">Next</Link>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}