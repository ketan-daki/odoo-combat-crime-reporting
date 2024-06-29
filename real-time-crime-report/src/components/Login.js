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
      axios.post('http://192.168.100.11:4004/login', {
        username: email,
        password: password
      }).then(response => {
        // Login success notification
        toast({
          title: "Login Successful",
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
          title: "Login Failed",
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
  const handleLoginSuccess = (credentialResponse) => {
    // const { credential } = credentialResponse;
   
    // Send the ID token to your Flask backend
    axios.post('http://localhost:4004/token-login',credentialResponse).then(response => {
      console.log('Backend verified token and returned:', response.data);
      // You can now store the user data or JWT from your backend in local storage or context
    }).catch(error => {
      console.error('Backend token verification failed:', error);
    });
  };

  const handleLoginFailure = () => {
    console.log('Login Failed');
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
          <Stack spacing={{ base: 10, md: 20 }}
          verticalAlign={"center"}>
          <Heading
                color={"gray.800"}
                lineHeight={1.1}
                fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
                gap={0}
                textAlign={"center"}
              >
                <Text
                  as={"div"}
                  bgGradient="linear(to-r, blue.400,purple.600)"
                  bgClip="text"
                  >
                  Real-Time Crime Reporting System
                  
                </Text>
                </Heading>       
            {/* <Stack direction={"row"} spacing={4} align={"center"}>
            </Stack> */}
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
                Login
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
                  onSuccess={handleLoginSuccess}
                  onError={handleLoginFailure}
                  useOneTap
                />
              </Box>
            </Box>
            form
          </Stack>
        </Container>
        {/* <Blur
          position={"absolute"}
          top={-10}
          left={-10}
          style={{ filter: "blur(70px)" }}
        /> */}
      </Box>
    </ChakraProvider>
  )
}

export default Login;
