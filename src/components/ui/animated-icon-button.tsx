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
  /** Animated icon component (e.g. from lucide-animated) exposing start/stopAnimation. */
  icon: AnimatedIcon;
  /** Icon size in px (default 24, matching the previous `size-6` icons). */
  iconSize?: number;
  label: string;
}

/**
 * A Button whose animated icon plays on hover of the whole button, rather than
 * only when the cursor is directly over the icon. The icon is driven in
 * controlled mode via its ref. Honors prefers-reduced-motion.
 *
 * Animation is deliberately hover-only: focus-driven triggering would re-fire
 * the animation when a dialog/menu this button opens returns focus to it on
 * close, which reads as a spurious "pop".
 */
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
        // The animated icon's class lands on its wrapper div, not the svg, so the
        // Button's default `[&_svg]:size-4` would shrink it. Force size-6 (24px) to
        // match the icons it replaced. `[&>*]:z-10` lifts the icon's wrapper div
        // above the secondary variant's `before:` card-background overlay (the
        // built-in `[&_svg]:z-10` rule misses it because the svg is now nested).
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
