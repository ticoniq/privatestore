import z from "zod"

export const appOverviewSchema = z.object({
  logo: z.string().min(1, "Logo is required"),
  appName: z.string().min(2, "App name must be at least 2 characters"),
  appDescription: z.string().min(10, "Description must be at least 10 characters"),
  businessCategory: z.string().min(1, "Business category is required"),
  supportMail: z.string().email("Invalid email address"),
  supportPhoneNumber: z.string().min(10, "Valid phone number is required"),
  featureSettings: z.object({
    pushNotification: z.boolean(),
    orderTracking: z.boolean(),
    wishList: z.boolean(),
    ratingsAndReview: z.boolean(),
  }),
})

export type AppOverviewValues = z.infer<typeof appOverviewSchema>


export const templateSchema = z.object({
  template: z.string().min(1, "Please select a template style"),
  templateCategories: z.object({
    categoryStyle: z.string().min(1, "Category Style is required"),
    categoryImage: z.string().min(1, "Category Image is required"),
  }),
  templateNavbarStyles: z.object({
    navBarStyle: z.string().min(1, "Navbar Style is required"),
    categoryImage: z.string().min(1, "Navbar Image is required"),
  }),
})

export type TemplateValues = z.infer<typeof templateSchema>;

export const typographySchema = z.object({
  headerFont: z.object({
    font: z.string().min(1, "Header font is required"),
    weight: z.string().min(1, "Header font weight is required"),
  }),
  bodyFont: z.object({
    font: z.string().min(1, "Body font is required"),
    weight: z.string().min(1, "Body font weight is required"),
  }),
  iconLibrary: z.object({
    library: z.string().min(1, "Library is required"),
    style: z.string().min(1, "Style is required"),
  }),
})

export type TypographyValues = z.infer<typeof typographySchema>

// Zod schema for color validation
export const colorsSchema = z.object({
  primary: z.string()
    .regex(/^#([A-Fa-f0-9]{6})$/, "Must be a valid hex color code")
    .default('#4F46E5'),
  background: z.string()
    .regex(/^#([A-Fa-f0-9]{6})$/, "Must be a valid hex color code")
    .default('#FFFFFF'),
  headerText: z.string()
    .regex(/^#([A-Fa-f0-9]{6})$/, "Must be a valid hex color code")
    .default('#000000'),
  bodyText: z.string()
    .regex(/^#([A-Fa-f0-9]{6})$/, "Must be a valid hex color code")
    .default('#000000'),
});

export type ColorsValues = z.infer<typeof colorsSchema>;