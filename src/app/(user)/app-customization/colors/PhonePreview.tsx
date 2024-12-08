"use client";

import { Button } from "@/components/ui/button";
import { IconInput } from "@/components/ui/icon-input";
import { Bell, Search } from "lucide-react";

type PhonePreviewProps = {
  primaryColor: string;
  backgroundCol: string;
  headerTextColor: string;
  bodyTextColor: string;
}

export function PhonePreview({
  primaryColor,
  backgroundCol,
  headerTextColor,
  bodyTextColor
}: PhonePreviewProps) {
  return (
    <div
      className="rounded-[2rem] border-gray-800 border-8 p-4 overflow-hidden w-[290px] h-[572px]"
      style={{ backgroundColor: backgroundCol }}
    >
      <div className="flex flex-col space-y-3">
        <div className="flex justify-center items-center">
          <h1
            className="text-base font-semibold"
            style={{ color: headerTextColor }}
          >
            Good Morning, Olaniyi
          </h1>
          <Bell size={18} className="ml-auto text-gray-500" />
        </div>
        <IconInput
          id="email"
          placeholder=""
          icon={<Search size={20} />}
          iconPosition="left"
          className="rounded-full bg-border h-12"
        />
        <p style={{ color: bodyTextColor }} className="mb-4">
          This is how your color scheme will look in your application.
        </p>
        <div className="space-x-4">
          <Button
            style={{
              backgroundColor: primaryColor,
              color: '#FFFFFF'
            }}
          >
            Primary Button
          </Button>
        </div>
      </div>
    </div>
  )
}