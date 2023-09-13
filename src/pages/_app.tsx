import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import dynamic from "next/dynamic";
const Navbar = dynamic(import("@/components/Navbar"), { ssr: false });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Navbar />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
