import { cn } from "@/utils/cn";

const variants = {
  default: "bg-background text-foreground",
  primary: "bg-black text-white",
  secondary:
    "bg-black/10 border-2 backdrop-blur-xl text-white border-white hover:bg-black/30",
  link: "shadow-none  text-blue-700 hover:text-black border-none underline",
};

type BtnProps = {
  variant?: keyof typeof variants;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
export const Btn = ({
  children,
  className = "",
  variant = "default",
}: BtnProps) => {
  return (
    <button
      className={cn(
        "p-4 border flex gap-2 items-center w-fit border-black/50 rounded-md shadow tracking-wider uppercase font-info font-semibold text-sm  transition-all hover:scale-105",
        variants[variant],
        className
      )}
    >
      {children}
    </button>
  );
};
