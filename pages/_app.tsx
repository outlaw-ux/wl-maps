import * as React from "react";
import Head from "next/head";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import "../styles/globals.css";

const theme = createTheme();

const WoodlandMapsApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default WoodlandMapsApp;
