import Head from 'next/head';
import React from 'react';
import { Footer } from '../footer';
import { NavbarWrapper } from '../navbar';
import { Box } from '../styles/box';

interface Props {
   children: React.ReactNode;
}

export const MainLayout = ({ children }: Props) => {
   return (
      <Box as="main">
         <Head>
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <meta name="description" content="Mauricio's homepage" />
            <meta name="author" content="ITASEOUL" />
            <meta name="author" content="siumauricio" />
            <link rel="apple-touch-icon" href="apple-touch-icon.png" />
            <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
            <meta name="twitter:title" content="ITASEOUL" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@siumauricio" />
            <meta name="twitter:creator" content="@siumauricio" />
            <meta property="og:site_name" content="ITASEOUL" />
            <meta name="og:title" content="ITASEOUL" />
            <meta property="og:type" content="website" />
            <title>RE100.run | 지구에너지 러닝</title>
         </Head>

         <NavbarWrapper />
         <Box
            css={{
               height: '90%',
               display: 'flex',
               flexDirection: 'column',
               justifyContent: 'space-between',
            }}
         >
            {children}
            {/* <Footer /> */}
         </Box>
      </Box>
   );
};
