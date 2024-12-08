import { z } from "zod";

const MB_BYTES = 1000000;

export const ACCEPTED_MIME_TYPES = [
  "image/gif",
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/svg",
];

const imageSchema = z
  .any()
  .refine(
    (value) => {
      // Check if value is a File instance
      if (!(value instanceof File)) {
        return false;
      }

      // Check if file is empty or not selected
      if (!value || value.size === 0) {
        return false;
      }

      return true;
    },
    {
      message: "Please select an image file",
    },
  )
  .transform((file: File) => {
    // Additional validations after ensuring it's a File
    if (file instanceof File) {
      // MIME type check
      if (!ACCEPTED_MIME_TYPES.includes(file.type)) {
        throw new Error(
          `File must be one of [${ACCEPTED_MIME_TYPES.join(", ")}] but was ${file.type}`,
        );
      }

      // File size check
      if (file.size > 3 * MB_BYTES) {
        throw new Error(
          `The file must not be larger than ${3 * MB_BYTES} bytes`,
        );
      }
    }

    return file;
  });

const extrasSchema = z.object({
  categoryExtrasId: z
    .array(z.string())
    .min(1, "At least one category extras ID is required"),
  required: z.boolean(),
});

const productOptionSchema = z.object({
  optionTitle: z.string().min(1, "Option title is required"),
  requireSelection: z.boolean(),
  options: z.array(z.string()).min(1, "At least one option is required"),
});

export const addProductSchema = z.object({
  categoryId: z.string().min(1, "Category ID is required"),
  productName: z.string().min(2, "Product name must be at least 2 characters"),
  productDescription: z
    .string()
    .min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().min(0.01, "Required"),
  totalQuantity: z.coerce.number().min(1, "Required"),
  discountPercent: z.coerce
    .number()
    .min(1, "Discount must be a non-negative number")
    .max(100, "Discount cannot exceed 100%"),
  enabled: z.boolean(),
  requireExtras: z.boolean(),

  variants: z.array(
    z.object({
      color: z
        .string()
        .min(1, "Color is required")
        .regex(/^#([A-Fa-f0-9]{6})$/, "Must be a valid hex color code"),
      size: z.array(
        z.object({
          size: z.string().min(1, "Size is required"),
          quantity: z.coerce.number().min(0, "Quantity must be non-negative"),
          amount: z.coerce.number().min(0.01, "Amount must be positive"),
        }),
      ),
      sizeMeasurementUnit: z.string().min(1, "Measurement unit is required"),
    }),
  ),

  extras: z.array(extrasSchema),
  productOptions: z.array(productOptionSchema),

  productImages: z
    .array(z.instanceof(File))
    .min(1, "At least one file is required")
    .max(5, "Maximum 5 file allowed")
    .refine(
      (productImages) =>
        productImages.every((file) => file.size <= 2 * 1024 * 1024),
      { message: "Each file must be 5MB or smaller" },
    )
    .refine(
      (productImages) =>
        productImages.every((file) =>
          ["image/jpeg", "image/png", "image/gif"].includes(file.type),
        ),
      { message: "Only JPEG, PNG, and GIF file are allowed" },
    ),
});

export type AddProductValue = z.infer<typeof addProductSchema>;

export const addCategorySchema = z.object({
  name: z.string().min(1, "Required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  icon: z.string().min(1, "Required"),
  image: imageSchema,
});

export type AddCategoryValue = z.infer<typeof addCategorySchema>;

export const addAddonSchema = z.object({
  name: z.string().trim().min(1, "Required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().trim().min(1, "Required"),
  price: z.coerce.number().min(1, "Required"),
  quantity: z.coerce.number().min(1, "Required"),
  discount: z.coerce
    .number()
    .min(1, "Discount must be a non-negative number")
    .max(100, "Discount cannot exceed 100%"),
  image: imageSchema,
});

// Infer the type for TypeScript
export type AddAddonValue = z.infer<typeof addAddonSchema>;
