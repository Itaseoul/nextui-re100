import "../styles/globals.css";
import "../styles/playground.css";
import type { AppProps } from "next/app";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AnimatePresence } from "framer-motion";
import { MainLayout } from "../components/layout/main-layout";
import { SSRProvider } from "react-aria";
import { NextPage } from "next";

import global from "../track/utils/chakra";

import DataProvider from "../track/context/DataProvider";
import { ChakraProvider, ColorModeScript, theme } from "@chakra-ui/react";

import { Provider as StoreProvider } from "react-redux";
import store from "../track/store/rootreducer";


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
      {/* chakra */}
      <StoreProvider store={store}>
        <ChakraProvider theme={global}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <DataProvider>
            {/* chakra */}
            <NextThemesProvider
              defaultTheme="dark"
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

          </DataProvider>
        </ChakraProvider>
      </StoreProvider>

    </SSRProvider>

  );
}

export default MyApp;
