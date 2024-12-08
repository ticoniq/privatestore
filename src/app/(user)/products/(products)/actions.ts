"use server";

import { addProductSchema, type AddProductValue } from "@/lib/validation/product";
import { revalidatePath } from "next/cache";

export const addNewProduct = async (data: AddProductValue): Promise<{ success?: string, error?: string }> => {
  try {

    const validatedData = addProductSchema.parse(data);
    
    // Parse the data into a usable object

    // Simulate server processing or saving the data
    console.log("Server Action Received Product Data:", validatedData);

    // Return success message
    revalidatePath("/products");
    return { success: "Product added successfully!" };
  } catch (error) {
    console.error("Error in server action:", error);
    return { error: "Failed to process product data." };
  }
};
