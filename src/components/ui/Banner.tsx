import { FC } from "react";
import { Button } from "@/components/ui/Button";

interface SingleLineBannerProps {
  title: string;
  description: string;
  ctaText: string;
  ctaCallback: () => void;
}

export const SingleLineBanner: FC<SingleLineBannerProps> = ({
  title,
  description,
  ctaText,
  ctaCallback,
}) => (
  <div className="bg-card rounded-lg py-4 px-4 flex justify-between items-center h-20">
    <div className="grid gap-1">
      <h4>{title}</h4>
      <h6 className="dark:text-zinc-400 text-zinc-700 text-xs">
        {description}
      </h6>
    </div>
    <Button onClick={ctaCallback}>{ctaText}</Button>
  </div>
);
