import { useEffect, useState } from "react";
import { isPresentationExportMode } from "@/lib/export-mode";

/**
 * Returns true when animations should be skipped and components should render
 * their final "rest" state instead: either the user prefers reduced motion, or
 * the deck is being captured for static export (PDF/PPTX).
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (isPresentationExportMode()) {
      return true;
    }
    if (typeof window === "undefined" || !window.matchMedia) {
      return false;
    }
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (isPresentationExportMode()) {
      setReduced(true);
      return;
    }
    if (typeof window === "undefined" || !window.matchMedia) {
      return;
    }
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(query.matches);
    onChange();
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
