import React from 'react'
import Run from '../components/content/run'
import { RunLayout } from '../components/layout/run-layout'

import global from "../track/utils/chakra";
import DataProvider from "../track/context/DataProvider";
import { ChakraProvider, ColorModeScript, theme } from "@chakra-ui/react";
import { Provider as StoreProvider } from "react-redux";
import store from "../track/store/rootreducer";

type Props = {}

export default function Index({ }: Props) {
  return (
    <StoreProvider store={store} >
      <ChakraProvider theme={global}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <DataProvider>
          <RunLayout >
            <Run />
          </RunLayout>
        </DataProvider>
      </ChakraProvider>
    </StoreProvider>
  )
}