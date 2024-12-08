"use client"

import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ChevronLeft, ChevronRight, ListFilterIcon, SearchIcon, Trash2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { IconInput } from "@/components/ui/icon-input"
import productCategory from "@/assets/images/products/product-category.png";
import Image from "next/image"
import { AddCategory } from "./AddCategory"
import { EditCategory } from "./EditCategory"
import { DeleteCategory } from "./DeleteCategory"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const data: Payment[] = [
  {
    id: "m5gr84i9",
    icon: "icon",
    image: "/avatars/basketball.png",
    name: "Name 4",
    description: "ken99@yahoo.com",
  },
  {
    id: "m5gdr84i9",
    icon: "icogggn",
    image: "/avatars/basketball.png",
    name: "Name 1",
    description: "ken99@yahoo.com",
  },
  {
    id: "m5grd84i9",
    icon: "icoddddn",
    image: "/avatars/basketball.png",
    name: "Name 2",
    description: "ken99@yahoo.com",
  },
]

export type Payment = {
  id: string
  icon: string
  image: string
  description: string
  name: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "icon",
    header: "Icon",
    cell: ({ row }) => (
      <div>{row.getValue("icon")}</div>
    ),
  },
  {
    accessorKey: "image",
    header: () => <div className="hidden md:block">Image</div>,
    cell: ({ row }) => (
      <div className="hidden md:block">
        <Avatar className="h-10 w-10 sm:flex rounded-none">
          <AvatarImage
            src={row.getValue("image")}
            className="rounded-none"
            alt="Avatar"
          />
          <AvatarFallback className="rounded-none">SL</AvatarFallback>
        </Avatar>
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div>{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: () => <div className="hidden lg:block">Description</div>,
    cell: ({ row }) => (
      <div className="hidden lg:block">{row.getValue("description")}</div>
    ),
  },
  {
    id: "actions",
    header: () => <div className="hidden float-end lg:block">Actions</div>,
    enableHiding: false,
    cell: ({ }) => {
      return (
        <span className="float-end">
          <EditCategory />
          <DeleteCategory />
        </span>
      )
    },
  },
]

export function CategoryTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const generatePaginationNumbers = () => {
    const currentPage = table.getState().pagination.pageIndex + 1;
    const totalPages = table.getPageCount();
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage = Math.max(currentPage - 2, 1);
      const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

      if (endPage - startPage < maxPagesToShow - 1) {
        startPage = Math.max(endPage - maxPagesToShow + 1, 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="w-full border-2 rounded-lg">
      <div className="flex flex-col-reverse items-center border-b-2 justify-between p-4 md:flex-row">
        <p>
          Category:{" "}
          {table.getFilteredRowModel().rows.length}
        </p>
        <div className="w-full flex flex-col gap-2 md:flex-row md:w-fit">
          <IconInput
            icon={<SearchIcon size={15} />}
            placeholder="Search name..."
            className="w-full md:max-w-sm h-9"
            iconPosition="left"
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <ListFilterIcon size={15} className="mr-2" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            className="text-destructive"
            variant="deleteOutline"
            size="sm"
          >
            <Trash2Icon size={15} className="mr-2" />
            Delete
          </Button>
        </div>
      </div>
      <div>
        <Table>
          <TableHeader className="bg-gray-200">
            {table.getRowModel().rows?.length ? (
              table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  ))}
                </TableRow>
              ))
            ) : null}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="space-y-4 text-center py-24 flex flex-col justify-center items-center"
                >
                  <Image
                    src={productCategory}
                    alt="Product Category"
                    width={89}
                    height={92}
                    style={{
                      width: 89,
                      height: 92,
                    }}
                    priority
                    className="mb-5"
                  />
                  <span className="space-y-1">
                    <p>No Products Categories  at the moment</p>
                    <p>Click “add new product” button to get started in <br /> adding your first product to your store</p>
                  </span>
                  <AddCategory />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {table.getRowModel().rows?.length ? (
        <div className="flex items-center border-t-2 justify-center space-x-2 p-4">
          <div className="text-sm">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            {generatePaginationNumbers().map((pageNumber) => (
              <Button
                key={pageNumber}
                size="sm"
                variant="outline"
                onClick={() => table.setPageIndex(pageNumber - 1)}
                className={`text-foreground 
                ${pageNumber === table.getState().pagination.pageIndex + 1 ? "" : "border-none"}`}
              >
                {pageNumber}
              </Button>
            ))}
          </div>
          <div>
            <Button
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="rounded-r-none"
            >
              <ChevronLeft size={20} />
            </Button>
            <Button
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="rounded-l-none"
            >
              <ChevronRight size={20} />
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
