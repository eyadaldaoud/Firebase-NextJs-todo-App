import * as React from 'react'
import Layout from './utils/Layout';
import {SSRProvider} from '@react-aria/ssr';
function MyApp({ Component, pageProps }) {


  return (
    <SSRProvider>
      <Layout>

         <Component {...pageProps} />

      </Layout>
    </SSRProvider>
  )
}

export default MyApp
