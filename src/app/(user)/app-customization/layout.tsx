import { ContentLayout } from "@/components/user-layout/ContentLayout";
import { SlidersHorizontalIcon } from "lucide-react";
import { AppCustomizationNav } from "./AppCustomizationNav";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({
  children,
}: LayoutProps) {

  return (
    <>
      <ContentLayout
      title="App Customization"
      icon={SlidersHorizontalIcon}
    >
      <section className="flex flex-1 flex-col gap-6 p-4 md:p-6">
        <div>
          <h1 className="text-3xl font-semibold">App Customization</h1>
          <p className="mt-1 truncate text-gray-500">
            Setup how you want your mobile app to look.
          </p>
        </div>
        <AppCustomizationNav />
        {children}
      </section>
    </ContentLayout>
    </>
  );
}