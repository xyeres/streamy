import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  

  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/images/favicon.ico" />
          <meta name="description" content="Web site created using create-react-app" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument