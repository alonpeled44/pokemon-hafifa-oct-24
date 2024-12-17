import Header from "../src/components/header";
import css from "../css/general.module.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={css.html}>
      <head></head>
      <body className={css.body}>
        <Header />
        {children}
      </body>
    </html>
  );
}