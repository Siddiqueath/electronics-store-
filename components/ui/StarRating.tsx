"use client";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  rating: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
}

const sizes = { sm: 12, md: 14, lg: 18 };

export default function StarRating({ rating, max = 5, size = "sm", showValue = false }: Props) {
  const px = sizes[size];
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < Math.floor(rating);
        const partial = !filled && i < rating;
        return (
          <div key={i} className="relative" style={{ width: px, height: px }}>
            <Star
              size={px}
              className="text-zinc-700 fill-zinc-700"
            />
            {(filled || partial) && (
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: partial ? `${(rating % 1) * 100}%` : "100%" }}
              >
                <Star size={px} className="text-amber-400 fill-amber-400" />
              </div>
            )}
          </div>
        );
      })}
      {showValue && (
        <span className={cn("text-amber-400 font-medium", size === "sm" ? "text-xs" : "text-sm")}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
