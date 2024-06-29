"use client"
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure
} from "@chakra-ui/react"
import { useNavigate } from 'react-router-dom';
import './css/login.css';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon
} from "@chakra-ui/icons"
import iconImage from './css/icon.png';
export default function WithSubnavigation() {
  
  const { isOpen: isLoginOpen, onClose: onLoginClose } = useDisclosure();
  const { isOpen, onToggle } = useDisclosure()
  let navigate = useNavigate();
  const onLoginOpen = () => {
    navigate('/login');
  };
  const onSignOpen = () =>{
    navigate('/signup');
  }
  return (

    
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 0 }}
        px={{ base: 4 }}
        // borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex 
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex textAlign={"center"}  flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
        <img 
            src={iconImage}
            // alt="Logo Icon"
            style={{
              marginRight: '1px', // Adjust margin as needed
              width: '4%', // Adjust width and height to control the icon size
              height: '2%',
            }}
      />
        {/* <Text
          className="sh_logo"
          textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
          fontFamily={'heading'}
          color={useColorModeValue('gray.800', 'white')}
          display="flex"
          alignItems="center"
        >
          
    </Text> */}
          <Flex py={{ base: 4 }}   textAlign={"center"} verticalAlign={"baseline"} display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Button
          _hover={{
            bgGradient: "linear(to-r, blue.400,purple.400)",
           boxShadow: "xl",
           color:"white"
         }}
            // as={"a"}
            fontSize={"sm"}
            fontWeight={600}
            variant={"link"}
            onClick={onLoginOpen}
            px={3}
                py={3}  
          >
            Sign In
          </Button>
          <Button
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bgGradient="linear(to-r, blue.400,purple.400)"
            onClick={onSignOpen}
            _hover={{
              bg: "blue.600,purple.600"
            }}
          >
            Sign Up
          </Button>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
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
    </Box>
    
  )
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200")
  const linkHoverColor = useColorModeValue("gray.800", "white")
  const popoverContentBgColor = useColorModeValue("white", "gray.800")

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map(navItem => (
        <Box key={navItem.label}>
          <Popover  trigger={"hover"} placement={"bottom-start"}>
              
            <PopoverTrigger>
              <Box 
                as="a"
                _hover={{
                   bgGradient: "linear(to-r, blue.400,purple.400)",
                  boxShadow: "xl",
                  color:"white"
                }}
                px={3}
                py={7}
                href={navItem.href ?? "#"}
                fontSize={"md"}
                fontWeight={600}
                color={linkColor}
                borderRadius={"var(--chakra-radii-md)"}
                // _hover={{
                //   textDecoration: "none",
                //   color: linkHoverColor
                // }}
              >
                {navItem.label}
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={6}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map(child => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  )
}

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Box
      as="a"
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("teal.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "teal.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"teal.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  )
}

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map(navItem => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  )
}

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Box
        py={3}
        as="a"
        href={href ?? "#"}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: "none"
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map(child => (
              <Box as="a" key={child.label} py={2} href={child.href}>
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  )
}

const NAV_ITEMS = [
  {
    label: "Dashboard",
    href: "/dashboard"
  },
  {
    label: "Reporting",
    href: "/report"
  },
  // {
  //   label: "Settings",
  //   href: "/settings"
  // }
]
