import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface CountUpOptions {
  /** Target value to count up to. */
  to: number;
  /** Whether the animation is allowed to run (e.g. the slide is active). */
  active: boolean;
  /** Duration of the tween in ms. */
  duration?: number;
  /** Value to start from before/when idle. */
  from?: number;
  /** Delay before starting, in ms. */
  delay?: number;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * RAF-driven numeric tween that plays when `active` becomes true and resets when
 * it becomes false (so re-entering a slide replays it). Honors reduced motion /
 * export mode by jumping straight to the target value.
 */
export function useCountUp({
  to,
  active,
  duration = 900,
  from = 0,
  delay = 0,
}: CountUpOptions): number {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(active ? to : from);
  const frame = useRef<number>(0);
  const timeout = useRef<number>(0);

  useEffect(() => {
    if (!active) {
      setValue(from);
      return;
    }
    if (reduced) {
      setValue(to);
      return;
    }

    let start = 0;
    const step = (now: number) => {
      if (!start) {
        start = now;
      }
      const progress = Math.min((now - start) / duration, 1);
      setValue(from + (to - from) * easeOutCubic(progress));
      if (progress < 1) {
        frame.current = requestAnimationFrame(step);
      }
    };

    timeout.current = window.setTimeout(() => {
      frame.current = requestAnimationFrame(step);
    }, delay);

    return () => {
      window.clearTimeout(timeout.current);
      cancelAnimationFrame(frame.current);
    };
  }, [active, reduced, to, from, duration, delay]);

  return value;
}
