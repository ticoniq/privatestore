import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { WalletIcon } from "lucide-react"
import Link from "next/link"

export function SidebarPlan() {
  return (
    <Card className="shadow-none border-none text-white bg-gradient-to-bl from-[#5041B8] via-primary-700 to-primary-700">
      <CardHeader className="p-4">
        <CardTitle className="text-base font-normal">
          <WalletIcon className="size-6 mb-4"/>
          <span>Basic</span>
        </CardTitle>
        <CardDescription className="text-sm text-white">
          This Plan let’s you see your users and orders, pay for a higher plan to see how your shop is doing
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between p-4 pt-0">
        <Button
          variant="linkHover2"
          size="none"
          className="p-0"
          asChild
        >
          <Link href="#">Upgrade Plan</Link>
        </Button>
        <Button
          variant="linkHover2"
          size="none"
          className="p-0"
          asChild
        >
          <Link href="#">Compare Plans</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
