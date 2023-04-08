import type { AppProps } from "next/app";
import Layout from "./layout";
import "bootstrap/dist/css/bootstrap.min.css";
import "cropperjs/dist/cropper.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
