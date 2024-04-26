import type { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import Router from "next/router";
import nProgress from "nprogress";
import { type FC } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  SettingsConsumer,
  SettingsProvider,
} from "../contexts/settings-context";
import "../i18n";
import { store } from "../store";
import { createTheme } from "../theme";
import { createEmotionCache } from "../utils/create-emotion-cache";

import "react-lazy-load-image-component/src/effects/blur.css";
import { TabsProvider } from "src/contexts/tabs";

// DatePicker
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MountedGuard from "@/components/guard/MountedGuard";

type EnhancedAppProps = AppProps & {
  Component: NextPage;
  emotionCache: EmotionCache;
};

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

const clientSideEmotionCache = createEmotionCache();

const App: FC<EnhancedAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>PropertyPro</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon-logo.ico" />
      </Head>

      <ReduxProvider store={store}>
        <MountedGuard>
          <SettingsProvider>
            <SettingsConsumer>
              {({ settings }) => (
                <ThemeProvider
                  theme={createTheme({
                    direction: settings.direction,
                    responsiveFontSizes: settings.responsiveFontSizes,
                    mode: settings.theme,
                  })}
                >
                  <CssBaseline />
                  <TabsProvider>
                    <ToastContainer position="top-center" />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      {getLayout(<Component {...pageProps} />)}
                    </LocalizationProvider>
                  </TabsProvider>
                </ThemeProvider>
              )}
            </SettingsConsumer>
          </SettingsProvider>
        </MountedGuard>
      </ReduxProvider>
    </CacheProvider>
  );
};

export default App;
