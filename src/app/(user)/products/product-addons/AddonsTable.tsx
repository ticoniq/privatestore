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
import { AddCategory } from "./AddAddons"
import { EditAddons } from "./EditAddons"
import { DeleteAddons } from "./DeleteAddons"
import { cn, formatNaira } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const data: Addons[] = [
  {
    id: "m5gr84i9",
    image: "/avatars/basketball.png",
    totalPrice: 20000.12,
    category: "icon",
    name: "Name 4",
    status: "in stock",
  },
  {
    id: "m5gr84i9",
    image: "/avatars/basketball.png",
    totalPrice: 1000,
    category: "icon",
    name: "Name 4",
    status: "out of stock",
  },
]

export type Addons = {
  id: string
  image: string
  totalPrice: number
  category: string
  status: "in stock" | "out of stock"
  name: string
}

export const columns: ColumnDef<Addons>[] = [
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
    accessorKey: "totalPrice",
    header: "Total Price",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalPrice"))
      return <div className="break-normal whitespace-nowrap sm:text-ellipsis p-0 hover:bg-transparent">{formatNaira(amount)}</div>
    },
  },
  {
    accessorKey: "category",
    header: "Categories",
    cell: ({ row }) => (
      <div>{row.getValue("category")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const getBadgeClasses = (status: string) => {
        const baseClasses = "px-3 py-1 rounded-full text-xs font-semibold";
        switch (status.toLowerCase()) {
          case "in stock":
            return `${baseClasses} bg-green-700`;
          case "out of stock":
            return `${baseClasses} bg-destructive`;
          default:
            return `${baseClasses} bg-black`;
        }
      };

      return (
        <span className={cn("text-white capitalize", getBadgeClasses(row.getValue("status")))}>
          {row.getValue("status")}
        </span>
      );
    }
  },
  {
    id: "actions",
    header: () => <div className="text-end">Actions</div>,
    enableHiding: false,
    cell: ({ }) => {
      return (
        <span className="text-end">
          <EditAddons />
          <DeleteAddons />
        </span>
      )
    },
  },
]

export function AddonsTable() {
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
      <div className=" flex flex-col-reverse gap-2 items-center border-b-2 justify-between p-4 md:flex-row">
        <p>
          Addons:{" "}
          {table.getFilteredRowModel().rows.length}
        </p>
        <div className="space-y-2 w-full flex flex-col gap-2 md:flex-row md:w-fit md:space-y-0">
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
      <div className="w-full">
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
