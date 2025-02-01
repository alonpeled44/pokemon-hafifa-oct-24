import { createContext, useContext, useState, useEffect } from "react";

const WindowWidthContext = createContext();

export function useWindowWidth() {
  return useContext(WindowWidthContext);
}

export function WindowWidthProvider({ children }) {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <WindowWidthContext.Provider value={windowWidth}>
      {children}
    </WindowWidthContext.Provider>
  );
}
