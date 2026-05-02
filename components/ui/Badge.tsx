import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  variant?: "discount" | "new" | "stock" | "featured" | "default";
  className?: string;
}

const variants = {
  discount: "bg-red-500/20 text-red-400 border border-red-500/30",
  new: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  stock: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
  featured: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
  default: "bg-white/10 text-white/70 border border-white/10",
};

export default function Badge({ children, variant = "default", className }: Props) {
  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold", variants[variant], className)}>
      {children}
    </span>
  );
}
