import App, { Container } from 'next/app';
import Home from './index';
import { ApolloProvider } from 'react-apollo';
import withData from '../lib/withData';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // this exposes the query to the user
    pageProps.query = ctx.query;
    return { pageProps };
  }
  render() {
    const { Component, apollo, pageProps } = this.props;

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Home>
            <Component {...pageProps} />
          </Home>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withData(MyApp);
