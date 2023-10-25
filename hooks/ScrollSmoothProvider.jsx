import React, { createContext, useEffect, useState } from "react";

export const SmoothScrollContext = createContext({
  scroll: null,
});

const ScrollSmoothProvider = ({ children, options }) => {
  const [scroll, setScroll] = useState(null);

  useEffect(() => {
    if (!scroll) {
      (async () => {
        try {
          const LocomotiveScroll = (await import("locomotive-scroll")).default;

          setScroll(
            new LocomotiveScroll({
              el:
                document.querySelector("[data-scroll-container]") ?? undefined,
              ...options,
            })
          );
        } catch (error) {
          throw console.log(`Smooth Scroll: ${error} `);
        }
      })();

      return () => {
        scroll && scroll.destroy();
      };
    }
  }, [scroll]);
  return (
    <SmoothScrollContext.Provider value={{ scroll }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};

SmoothScrollContext.displayName = "SmoothScrollContext";
ScrollSmoothProvider.displayName = "ScrollSmoothProvider";
export default ScrollSmoothProvider;
