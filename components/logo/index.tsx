import Link from "next/link";

import { WavesIcon } from "lucide-react";

import { cn } from "cn";

const Logo = (props: { url?: string; className?: string }) => {
  const { url = "/", className } = props;
  return (
    <Link href={url} className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary">
        <WavesIcon className="w-4 h-4 text-white" />
      </div>
      <span
        className={cn(
          "font-bold text-xl hidden sm:inline",
          className && className,
        )}
      >
        Vidette
      </span>
    </Link>
  );
};

export default Logo;
