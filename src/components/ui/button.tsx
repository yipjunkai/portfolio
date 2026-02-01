import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/components/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "relative overflow-visible bg-gradient-to-r from-grad-1 to-grad-2 text-white shadow-[inset_0_0_0_2px_rgba(0,0,0,0)] before:absolute before:-inset-1 before:z-0 before:animate-[gradient-rotate_2s_ease-in-out_infinite] before:rounded-lg before:bg-[linear-gradient(to_right,var(--color-grad-1),var(--color-grad-1),var(--color-grad-3),var(--color-grad-3),var(--color-grad-1),var(--color-grad-1),var(--color-grad-3),var(--color-grad-3),var(--color-grad-1))] before:bg-[length:200%_100%] before:opacity-80 before:blur-[12px] before:transition-opacity before:content-[''] motion-reduce:before:animate-none md:before:animate-none md:before:opacity-0 md:before:blur-[20px] md:hover:before:animate-[gradient-rotate_2s_ease-in-out_infinite] md:hover:before:opacity-80 dark:shadow-[inset_0_0_0_2px_rgba(0,0,0,0.6)] dark:md:shadow-[inset_0_0_0_2px_rgba(0,0,0,0)] dark:md:hover:shadow-[inset_0_0_0_2px_rgba(0,0,0,0.6)] [&>*]:z-10",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "relative bg-gradient-to-r from-grad-1 to-grad-2 shadow-[0_0_0_rgba(238,105,107,0)] transition-shadow duration-200 before:absolute before:inset-[2px] before:z-0 before:rounded-md before:bg-white before:content-[''] hover:shadow-[0_0_20px_rgba(238,105,107,0.6)] dark:before:bg-neutral-900 [&_p]:z-10 [&_p]:bg-gradient-to-r [&_p]:from-grad-1 [&_p]:to-grad-2 [&_p]:bg-clip-text [&_p]:text-transparent dark:[&_p]:text-neutral-50 [&_span]:z-10 [&_span]:bg-gradient-to-r [&_span]:from-grad-1 [&_span]:to-grad-2 [&_span]:bg-clip-text [&_span]:text-transparent dark:[&_span]:text-neutral-50 [&_svg]:z-10",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
