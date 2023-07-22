import { useEffect, useState } from "react";

/**
 * Renders the component where it is used in *after* hydration.
 * ```
 * const BottomTabBar = () => {
 *
 *   Use inside the componet you want to render after hydration
 *   useRenderAfterHydration();
 *
 *   return (
 *     <StyledBottomTabBar>
 *       <nav>Nav</nav>
 *     </StyledBottomTabBar>
 *   );
 * };
 * ```
 */
export const useRenderAfterHydration = (
  /** View that will be rendered after hydrating */
  view: JSX.Element,
  /** Fallback view that will be rendered while hydrating */
  fallback?: JSX.Element
): JSX.Element => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return fallback ?? <></>;
  return view;
};
