import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://delicate-snail-78.hasura.app/v1/graphql',
    headers: {
        'x-hasura-admin-secret':
          'G1QVNM1TXuRrEPi8LUFRVj3c4YsgKPd7HLIEQxTygEaHWGdXb78EuS2DXEEqKd7Q',
      },
      cache: new InMemoryCache(),
});

export default client;