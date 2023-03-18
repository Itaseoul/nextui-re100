import "../styles/globals.css";
import "../styles/playground.css";
import type { AppProps } from "next/app";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AnimatePresence } from "framer-motion";
import { MainLayout } from "../components/layout/main-layout";
import { SSRProvider } from "react-aria";
import { NextPage } from "next";

const lightTheme = createTheme({
  type: "light",
  theme: {
    colors: {},
  },
});

const darkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {},
  },
});

if (typeof window !== "undefined") {
  window.history.scrollRestoration = "manual";
}


export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  isFluid?: boolean;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};


function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <SSRProvider>
      <NextThemesProvider
        defaultTheme="system"
        attribute="class"
        value={{
          light: lightTheme.className,
          dark: darkTheme.className,
        }}
      >
        <NextUIProvider>
          <AnimatePresence
            mode='wait'
            initial={true}
            onExitComplete={() => {
              if (typeof window !== "undefined") {
                window.scrollTo({ top: 0 });
              }
            }}
          >
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </AnimatePresence>
        </NextUIProvider>
      </NextThemesProvider>
    </SSRProvider>
  );
}

export default MyApp;
