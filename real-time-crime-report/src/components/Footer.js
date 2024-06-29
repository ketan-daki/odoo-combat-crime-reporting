import React from 'react';
import { Box, Center, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box
      as="footer"
      position="absolute"
      bottom="0"
      width="100%"
      textAlign="center"
      padding="1rem"
      bg="teal.500"
      color="white"
    >
      <Center>
        <Text>&copy; 2024 Your Company. All rights reserved.</Text>
      </Center>
    </Box>
  );
};

export default Footer;
