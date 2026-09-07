"use client";

import * as React from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/components/lib/utils";
import { Button } from "@/components/ui/button";

export interface AnimatedIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

type AnimatedIcon = React.ForwardRefExoticComponent<{ size?: number; className?: string } & React.RefAttributes<AnimatedIconHandle>>;

interface AnimatedIconButtonProps extends React.ComponentProps<typeof Button> {
  icon: AnimatedIcon;
  iconSize?: number;
  label: string;
}

/** Hover-only animation avoids replaying when focus returns after a dialog or menu closes. */
export const AnimatedIconButton = React.forwardRef<HTMLButtonElement, AnimatedIconButtonProps>(
  ({ icon: Icon, iconSize = 24, label, className, onMouseEnter, onMouseLeave, ...props }, ref) => {
    const iconRef = React.useRef<AnimatedIconHandle>(null);
    const reduceMotion = useReducedMotion();

    const play = () => {
      if (!reduceMotion) iconRef.current?.startAnimation();
    };
    const stop = () => iconRef.current?.stopAnimation();

    return (
      <Button
        ref={ref}
        // The icon wrapper bypasses Button's SVG selectors; size and raise the wrapper directly.
        className={cn("[&_svg]:size-6! [&>*]:z-10", className)}
        onMouseEnter={e => {
          play();
          onMouseEnter?.(e);
        }}
        onMouseLeave={e => {
          stop();
          onMouseLeave?.(e);
        }}
        {...props}
      >
        <Icon ref={iconRef} size={iconSize} />
        <span>{label}</span>
      </Button>
    );
  }
);

AnimatedIconButton.displayName = "AnimatedIconButton";
