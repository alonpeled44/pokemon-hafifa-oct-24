import { useState, useEffect } from "react";
import css from "../css/vertical-divider.module.css";

export default function VerticalDivider() {
  const [windowWidth, setWindowWidth] = useState();

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {windowWidth > 1200 && <div className={css.divider} />}
      {console.log(windowWidth)}
    </>
  );
}
