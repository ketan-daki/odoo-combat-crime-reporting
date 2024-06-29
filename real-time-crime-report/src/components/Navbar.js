import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Spacer,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

const Navbar = () => {
  const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure();
  const { isOpen: isSignupOpen, onOpen: onSignupOpen, onClose: onSignupClose } = useDisclosure();

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="teal.500"
      color="white"
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg">
          Crime Report
        </Heading>
      </Flex>

      <Spacer />

      <Box>
        {/* Navigation links */}
        <a href="#" style={{ marginRight: '1rem', color: 'white' }}>
          Home
        </a>
        <a href="#" style={{ marginRight: '1rem', color: 'white' }}>
          About
        </a>
        <a href="#" style={{ color: 'white' }}>
          Contact
        </a>

        {/* Login and Signup buttons */}
        <Button variant="outline" colorScheme="white" mx={2} onClick={onLoginOpen}>
          Login
        </Button>
        <Button variant="solid" colorScheme="white" mx={2} onClick={onSignupOpen}>
          Sign Up
        </Button>
      </Box>

      {/* Login Modal */}
      <Modal isOpen={isLoginOpen} onClose={onLoginClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Your login form components go here */}
            <p>Login Form Placeholder</p>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onLoginClose}>
              Close
            </Button>
            <Button variant="ghost">Forgot Password?</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Signup Modal */}
      <Modal isOpen={isSignupOpen} onClose={onSignupClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign Up</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Your signup form components go here */}
            <p>Signup Form Placeholder</p>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onSignupClose}>
              Close
            </Button>
            <Button variant="ghost">Terms of Service</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Navbar;
