import {
    ApolloClient,
    InMemoryCache,
  } from '@apollo/client'
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';

const httpLink = new HttpLink({
  uri: "https://quidax-feec-graphql.herokuapp.com/graphql",
  // headers: {
  //   authorization: `Bearer ${
  //     process.env.REACT_APP_ACCESS_TOKEN
  //   }`,
  // },
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `GraphQL error: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );
    }
  
    if (networkError) {
      console.log(`Network error: ${networkError}`);
    }
});

const link = ApolloLink.from([errorLink, httpLink]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

export default client