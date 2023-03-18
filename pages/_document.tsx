import Document, {
   Html,
   Head,
   Main,
   NextScript,
   DocumentContext,
   DocumentInitialProps,
} from 'next/document';
import { CssBaseline } from '@nextui-org/react';
import React from 'react';

class MyDocument extends Document {
   static async getInitialProps(
      ctx: DocumentContext
   ): Promise<DocumentInitialProps> {
      const initialProps = await Document.getInitialProps(ctx);
      return {
         ...initialProps,
         styles: React.Children.toArray([initialProps.styles]),
      };
   }

   render() {
      return (
         <Html lang="en">
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            {/* <link
               href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
               rel="stylesheet"
            /> */}
            <link rel="stylesheet" as="style" crossOrigin="true" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/variable/pretendardvariable-dynamic-subset.css" />
            <Head>{CssBaseline.flush()}</Head>

            <body>
               <Main />
               <NextScript />
            </body>
         </Html>
      );
   }
}

export default MyDocument;
