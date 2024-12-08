import "@/styles/globals.css";
import { type Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: {
    default: "Storetolet: Description",
    template: "%s | Storetolet",
  },
  description: "Description",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className=" font-Mulish">
      <div vaul-drawer-wrapper="" className="bg-background"> {children} </div>
        <Toaster />
      </body>
    </html>
  );
}
