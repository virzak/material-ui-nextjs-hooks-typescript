import CssBaseline from '@material-ui/core/CssBaseline';
import { StylesProvider, ThemeProvider } from '@material-ui/styles';
import App, { AppProps, Container, DefaultAppIProps } from 'next/app';
import Head from 'next/head';
// --- Post bootstrap -----
import React from 'react';
import '../src/bootstrap';
import getPageContext, { PageContext } from '../src/getPageContext';

class MyApp extends App {
  constructor(props: DefaultAppIProps & AppProps) {
    super(props);
    this.pageContext = getPageContext();
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Head>
          <title>My page</title>
        </Head>
        {/* Wrap every page in Styles and Theme providers */}
        <StylesProvider
          generateClassName={this.pageContext.generateClassName}
          sheetsRegistry={this.pageContext.sheetsRegistry}
          sheetsManager={this.pageContext.sheetsManager}
        >
          {/* ThemeProvider makes the theme available down the React
              tree thanks to React context. */}
          <ThemeProvider theme={this.pageContext.theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server side. */}
            <Component pageContext={this.pageContext} {...pageProps} />
          </ThemeProvider>
        </StylesProvider>
      </Container>
    );
  }

  private pageContext: PageContext;
}

export default MyApp;
