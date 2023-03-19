import "../styles/globals.css";
import "../styles/playground.css";
import type { AppProps } from "next/app";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AnimatePresence } from "framer-motion";
import { MainLayout } from "../components/layout/main-layout";
import { SSRProvider } from "react-aria";
import { NextPage } from "next";
import { useEffect } from "react";


function setScreenSize() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`); //"--vh"라는 속성으로 정의해준다.
}



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

  useEffect(() => {
    setScreenSize();
    window.addEventListener('resize', () => setScreenSize());
  }); //처음 마운트될때 값을 계산하도록 함수를 호출한다
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
