"use client";

import { usePathname } from "next/navigation";

export function useParentAndChildPaths() {
  const pathname = usePathname();

  // Split the pathname into segments
  const pathSegments = pathname.split("/").filter(Boolean); // Removes empty strings

  const parent = pathSegments[0] ?? null; // First segment (parent)
  const firstChild = pathSegments[1] ?? null; // Second segment (first child)

  return { parent, firstChild };
}
