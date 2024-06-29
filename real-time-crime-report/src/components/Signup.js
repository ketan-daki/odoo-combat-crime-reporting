"use client"

import {
  Box, Flex, Text, IconButton, Button, Stack, Collapse, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, FormControl, FormLabel, FormErrorMessage, 
  useColorModeValue, useBreakpointValue, useDisclosure,Icon,Container,SimpleGrid,Heading,useToast
} from "@chakra-ui/react";
import { ChakraProvider, Grid, GridItem } from '@chakra-ui/react';
import { GoogleLogin } from '@react-oauth/google';
import './css/login.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

import WithSubnavigation from './ResNavbar';

const avatars = [
  {
    name: "Ryan Florence",
    url: "https://bit.ly/ryan-florence"
  },
  {
    name: "Segun Adebayo",
    url: "https://bit.ly/sage-adebayo"
  },
  {
    name: "Kent Dodds",
    url: "https://bit.ly/kent-c-dodds"
  },
  {
    name: "Prosper Otemuyiwa",
    url: "https://bit.ly/prosper-baba"
  },
  {
    name: "Christian Nwamba",
    url: "https://bit.ly/code-beast"
  }
]

const Blur = props => {
  return (
    <Icon
      width={useBreakpointValue({ base: "100%", md: "40vw", lg: "30vw" })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" /> */}
    </Icon>
  )
}
const Login = () => {
  let navigate = useNavigate();
  const toast = useToast();
  const [isEmailError, setIsEmailError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordError, setIsPasswordError] = useState(false);
  const onSubmitOpen = () => {
    setIsEmailError(!email);
    setIsPasswordError(!password);

    if (email && password) {
      axios.post('http://192.168.100.11:4004/signup', {
        username: email,
        password: password
      }).then(response => {
        // Login success notification
        toast({
          title: "Sign up Successful",
          description: "You have successfully logged in.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top"
        });
        localStorage.setItem('jwt', response.data.access_token); // Save the JWT token to localStorage
        navigate('/'); // Navigate to the home page or dashboard
      }).catch(error => {
        // Login failure notification
        toast({
          title: "Sign up Failed",
          description: "Check your credentials and try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top"
        });
        setIsEmailError(true);
        setIsPasswordError(true);
      });
    }
  };
  return (
    <ChakraProvider>
      <WithSubnavigation/>
      <Box position={"relative"} className="login-container">
        <Container
          as={SimpleGrid}
          maxW={"7xl"}
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 10, lg: 32 }}
          py={{ base: 10, sm: 20, lg: 32 }}

        >
          <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
                color={"gray.800"}
                lineHeight={1.1}
                fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
                gap={0}
                textAlign={"center"}
              >
                {/* <Text
                  as={"div"}
                  bgGradient="linear(to-r, blue.400,purple.600)"
                  bgClip="text"
                  >
                  Welcome To
                  
                </Text> */}
                <Text
                  as={"div"}
                  bgGradient="linear(to-r, blue.400,purple.600)"
                  bgClip="text"
                  >
                  Real-Time Crime Reporting System
                  
                </Text>
                </Heading>       
            <Stack direction={"row"} spacing={4} align={"center"}>
            </Stack>
          </Stack>
          <Stack
            bg={"gray.50"}
            rounded={"xl"}
            p={{ base: 4, sm: 6, md: 8 }}
            spacing={{ base: 8 }}
            maxW={{ lg: "lg" }}
          >
            <Stack spacing={4}>
              <Heading
                color={"gray.800"}
                lineHeight={1.1}
                fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
              >
                Sign Up
                <Text
                  as={"span"}
                  bgGradient="linear(to-r, blue.400,purple.400)"
                  bgClip="text"
                >
                  !
                </Text>
              </Heading>
              {/* <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
                We’re looking for amazing engineers just like you! Become a part
                of our rockstar engineering team and skyrocket your career!
              </Text> */}
            </Stack>
            <Box as={"form"} mt={10}>
              <Stack spacing={4}>
              <FormControl isInvalid={isEmailError} mb={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500"
                }}
              />
              {isEmailError && <FormErrorMessage>Email is required.</FormErrorMessage>}
            </FormControl>
            <FormControl isInvalid={isPasswordError}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500"
                }}
              />
              {isPasswordError && <FormErrorMessage>Password is required.</FormErrorMessage>}
            </FormControl>
              </Stack>
              <Button
                fontFamily={"heading"}
                mt={8}
                w={"full"}
                bgGradient="linear(to-r, blue.400,purple.400)"
                color={"white"}
                _hover={{
                  bgGradient: "linear(to-r, blue.400,purple.400)",
                  boxShadow: "xl"
                }}
                onClick={onSubmitOpen}
              >
                Submit
              </Button>
              <Box mt={3}>

                <GoogleLogin
                  onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                  useOneTap
                />
              </Box>
            </Box>
            form
          </Stack>
        </Container>
        <Blur
          position={"absolute"}
          top={-10}
          left={-10}
          style={{ filter: "blur(70px)" }}
        />
      </Box>
    </ChakraProvider>
  )
}

export default Login;
