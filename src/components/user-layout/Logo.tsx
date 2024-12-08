import Link from "next/link";
import logo from "@/assets/images/logo/logo.png";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface LogoProps {
  link?: string;
  className?: string;
}

export function Logo({
  link = "/",
  className
}: LogoProps) {
  return (
    <Link
      href={link}
      className={cn("", className)}
    >
      <span className="sr-only">Store to let</span>
      <Image
        src={logo}
        alt="storetolet"
        width={154}
        height={40}
        style={{ 
          width: '154.43px',
          height: '40px',
          objectFit: 'contain'
        }}
        priority={true}
      />
    </Link>
  )
}