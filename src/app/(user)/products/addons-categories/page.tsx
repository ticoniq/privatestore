import { ContentLayout } from "@/components/user-layout/ContentLayout";
import { Button } from "@/components/ui/button";
import { ArchiveIcon, Download } from "lucide-react";
import { CategoryTable } from "./CategoryTable";
import { AddCategory } from "./AddCategory";

export default function ProductCategoriesPage() {
  return (
    <ContentLayout
      title="Products"
      subtitle="Addon Categories"
      icon={ArchiveIcon}
    >
      <section className="flex flex-1 flex-col gap-6 p-4 md:p-6">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="text-3xl/7 font-semibold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Addon Categories
            </h1>
            <p className="mt-1 truncate text-gray-500">
              Monitor all your addon categories here
            </p>
          </div>
          <div className="mt-5 lg:mt-0 flex gap-2">
            <Button
              variant="outline"
              size="sm"
            >
              <Download className="size-4 rotate-180 mr-2" />
              Bulk Upload
            </Button>
            <AddCategory />
          </div>
        </div>
        <CategoryTable />
      </section>
    </ContentLayout>
  )
}