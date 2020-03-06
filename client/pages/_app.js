// import App from 'next/app'
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "materialize-css/dist/css/materialize.min.css";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { BgProvider } from "../contexts/gameContext";
import { AuthProvider } from "../contexts/authContext";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <div className="app">
      <ToastContainer autoClose={2000}></ToastContainer>
      <Head>
        <title>Board games shop</title>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthProvider>
        <BgProvider>
          <Header></Header>
          <div className="content">
            <Component {...pageProps} />
          </div>

          <Footer></Footer>
        </BgProvider>
      </AuthProvider>

      <style jsx>
        {`
          .content {
            padding: 0.5rem;
          }
        `}
      </style>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}

export default MyApp;
