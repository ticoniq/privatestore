import React from 'react';
import { Bell, Footprints, GemIcon, LayoutGridIcon, PackageOpenIcon, Search, ShirtIcon, ShoppingBagIcon, StoreIcon, User2Icon, WatchIcon } from "lucide-react";
import { IconInput } from "@/components/ui/icon-input";

interface TypographyPreviewProps {
  headerFont: {
    font: string;
    weight: string;
  };
  bodyFont: {
    font: string;
    weight: string;
  };
  iconLibrary: {
    library: string;
    style: string;
  };
}

export function TypographyPreview({
  headerFont,
  bodyFont,
  iconLibrary
}: TypographyPreviewProps) {
  const getIconSize = () => {
    switch (iconLibrary.style) {
      case 'Style 1': return 16;
      case 'Style 2': return 20;
      case 'Style 3': return 24;
      case 'Style 4': return 28;
      default: return 20;
    }
  };

  const items = [
    { icon: Footprints, name: 'Shoes' },
    { icon: GemIcon, name: 'Jewelry' },
    { icon: ShirtIcon, name: 'Clothing' },
    { icon: WatchIcon, name: 'Watches' },
  ]

  const iconSize = getIconSize();

  return (
    <div className="rounded-[2rem] border-gray-800 border-8 p-4 overflow-hidden w-[290px] h-[572px]">
      <div className="h-full flex flex-col space-y-3">
        <div className="flex justify-center items-center">
          <h1
            className="text-base"
            style={{
              fontFamily: headerFont.font,
              fontWeight: headerFont.weight
            }}
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

        <div
          style={{
            fontFamily: bodyFont.font,
            fontWeight: bodyFont.weight
          }}
          className="space-y-4"
        >
          <div className="p-4 bg-[#FFDCA5] rounded-md space-y-2">
            <p className="text-xs">Join Us for Exclusive Perks</p>
            <p className="text-[10px]">Create acccount to access your wishlist, track orders, and get personalized offers.</p>
          </div>

          <div className="space-y-4">
            <span className="flex justify-between items-center text-xs">
              <h4>Categories</h4>
              <p className="text-[#614FE0]">See All</p>
            </span>

            <div className="grid grid-cols-4">
              {items.map((item, index) => (
                <div key={index}>
                  <span
                    className="bg-[#EFEDFC] rounded-lg flex justify-center items-center mb-2 w-[54px] h-[54px]"
                  >
                    <item.icon size={iconSize} className="text-[#614FE0]" />
                  </span>
                  <p className="text-xs text-center">{item.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <span className="col-span-2 flex justify-between items-center text-xs">
              <h4>Latest</h4>
              <p className="text-[#614FE0]">See All</p>
            </span>

            <div
              className="bg-cover bg-center rounded-xl flex flex-col justify-end p-6 lg:items-start items-center"
              style={{ backgroundImage: 'url(https://pagedone.io/asset/uploads/1701234796.png)' }}
            >
              <h4 className="font-medium text-sm leading-8 text-white mb-4">Launch</h4>
            </div>
            <div
              className="bg-cover bg-center rounded-xl flex flex-col justify-end p-6 lg:items-start items-center"
              style={{ backgroundImage: 'url(https://pagedone.io/asset/uploads/1701234796.png)' }}
            >
              <h4 className="font-medium text-sm leading-8 text-white mb-4">Launch</h4>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between bg-[#F3F3F3] rounded-2xl p-2">
          <div className="flex items-center justify-center">
            <p
              className="p-3 rounded-full text-white bg-[#614FE0]">
              <StoreIcon size={20} />
            </p>
          </div>
          <div className="flex items-center justify-center">
            <p
              className="p-3 rounded-full">
              <LayoutGridIcon size={20} />
            </p>
          </div>
          <div className="flex items-center justify-center">
            <p
              className="p-3 rounded-full">
              <ShoppingBagIcon size={20} />
            </p>
          </div>
          <div className="flex items-center justify-center">
            <p
              className="p-3 rounded-full">
              <PackageOpenIcon size={20} />
            </p>
          </div>
          <div className="flex items-center justify-center">
            <p
              className="p-3 rounded-full">
              <User2Icon size={20} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypographyPreview;