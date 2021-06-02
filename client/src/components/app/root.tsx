/* eslint-disable */
import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { GitHubAuthProvider } from 'src/components/auth-provider';
import { auth } from 'src/api/auth';
import { MainContent } from './main';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  cache: new InMemoryCache(),
  headers: {
    get Authorization() {
      const accessToken = auth.getAccessToken();
      return `Bearer ${accessToken}`;
    },
  },
});

export function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <GitHubAuthProvider>
          <MainContent />
        </GitHubAuthProvider>
      </BrowserRouter>
    </ApolloProvider>
  );
}
