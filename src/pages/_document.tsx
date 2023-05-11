import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script src="/vendor/Draggable.js"></script>
        </Head>
        <body id="top">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
