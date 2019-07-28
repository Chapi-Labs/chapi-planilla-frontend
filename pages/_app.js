import App, { Container } from 'next/app';
import Page from '../components/Page';
import { ApolloProvider, ApolloConsumer } from 'react-apollo';
import withData from '../lib/withData';
import '@fortawesome/fontawesome-svg-core/styles.css';

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
            <ApolloConsumer>
              {client => (
                <Component {...pageProps} mutate={client.mutate} query={client.query}/>
              )}
            </ApolloConsumer>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withData(MyApp);
