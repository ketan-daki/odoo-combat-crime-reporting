// src/components/Users.js
import React from 'react';
import WithSubnavigation from './ResNavbar';
import { ChakraProvider } from '@chakra-ui/react';

function Users() {
  return (
    <ChakraProvider>
      <WithSubnavigation />
    </ChakraProvider>
  );
}

export default Users;
