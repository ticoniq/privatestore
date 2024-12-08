"use client"

import { useState } from "react"
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
} from "@/components/ui/credenza"
import { Button } from "@/components/ui/button"
import { CircleAlertIcon, Trash2Icon } from "lucide-react"

export function DeleteCategory() {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="text-destructive p-0"
        onClick={handleOpen}
      >
        <Trash2Icon className="size-4" />
      </Button>

      <Credenza open={open} onOpenChange={setOpen}>
        <CredenzaContent>
          <CredenzaHeader>
            <CredenzaTitle>Delete Addon Category</CredenzaTitle>
            <CredenzaDescription className="sr-only">
              Delete the selected Addon Category
            </CredenzaDescription>
          </CredenzaHeader>
          <CredenzaBody className="flex flex-col justify-center items-center text-center">
            <div className="bg-[#664013] my-5 text-white w-24 h-24 rounded-full flex justify-center items-center">
              <CircleAlertIcon className="size-8" />
            </div>
            Are you sure you would like to delete the selected Addon Category?
          </CredenzaBody>
          <CredenzaFooter>
            <CredenzaClose asChild>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
              >
                No, Cancel
              </Button>
            </CredenzaClose>
            <Button
              variant="destructive"
              size="sm"
              className="w-full"
            >
              Yes, Delete
            </Button>
          </CredenzaFooter>
        </CredenzaContent>
      </Credenza>
    </>
  )
}