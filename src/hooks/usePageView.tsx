import { Dispatch, SetStateAction, useEffect, useState } from "react";

/**
 * Represents the possible views the page can display
 */
export enum PageView {
  Desktop,
  MobileFiltersCollapsed,
  MobileFiltersExpanded
} 

/**
 * Provides an interface for accessing and setting the page view
 * 
 * @remarks
 * The page view responds to window resizes and can also be manually set
 * to change the type of mobile view
 */
export function usePageView (): [PageView,  Dispatch<SetStateAction<PageView>>] {
  const [pageView, setPageView] = useState<PageView>(
    isMobile() ? PageView.MobileFiltersCollapsed : PageView.Desktop);

  function isMobile () {
    return window.innerWidth <= 768;
  }

  useEffect(() => {
    function resizeListener() {
      if (!isMobile()) {
        setPageView(PageView.Desktop);
      } else if (pageView === PageView.Desktop) {
        // Collapse filters when transitioning from Desktop
        setPageView(PageView.MobileFiltersCollapsed);
      }
    }

    window.addEventListener('resize', resizeListener);
    return () => {
      window.removeEventListener('resize', resizeListener);
    }
  }, [pageView]);

  return [pageView, setPageView];
}