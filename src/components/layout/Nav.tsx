/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Heading,
  Image,
  useColorMode,
  Text,
  Link,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useUser } from "@auth0/nextjs-auth0";
import { useQuery } from "react-query";
import { getOrCreateUser } from "src/utils/User";
import NextLink from "next/link";
import { useRouter } from "next/router";
import BreadCrumb from "../BreadCrumb";

const logo: string =
  "https://res.cloudinary.com/mauro4202214/image/upload/v1663331570/world-travelers/logowt_qifbpn.png";
const logoNight: string =
  "https://res.cloudinary.com/mauro4202214/image/upload/v1663331569/world-travelers/logolargonight_yqpbps.png";

const Links = [
  ["/home", "Home"],
  ["/trips", "All-Trips"],
  ["/activities", "All-Activities"],
  ["/about", "About"],
  ["/contact", "Contact-Us"],
];

export default function NavBar() {
  const { user, error } = useUser();
  const router = useRouter();
  const [active, setActive] = useState(router.pathname);
  const { data: userDb, isLoading } = useQuery(
    ["userDb", user],
    () => user && getOrCreateUser(user)
  );
  // const handleActive = (
  //   e: React.MouseEvent<HTMLHeadingElement, MouseEvent>
  // ) => {
  //   setActive(e.currentTarget.id);
  // };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const textColor = useColorModeValue("#293541", "white");

  return (
    <>
      <Flex
        as="header"
        position={"sticky"}
        backgroundColor="transparent"
        backdropFilter="blur(10px)"
        w="100%"
        h={["70px", "70px", "70px", "70px"]}
        top={0}
        zIndex={10}
      >
        <Box
          w={"100%"}
          padding={"3px"}
          boxShadow={"1px 1px 1px 1px #D1DFE3"}
          px={4}
        >
          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <IconButton
              id="menu"
              size={"md"}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={"Open Menu"}
              display={{ lg: "none" }}
              onClick={isOpen ? onClose : onOpen}
            />
            <HStack spacing={12} alignItems={"center"}>
              <NextLink href={Links[0][0]}>
                <Image
                  cursor={"pointer"}
                  w={["100px", "150px", "150px", "200px"]}
                  src={useColorModeValue(logo, logoNight)}
                  alt="logo"
                />
              </NextLink>
            </HStack>
            <HStack
              as={"nav"}
              spacing={10}
              justifyContent={"center"}
              display={{ base: "none", lg: "flex", xl: "flex" }}
            >
              {Links.map((l, index) => (
                <NextLink href={l[0]} id={l[1]} key={index}>
                  <Link
                    id={l[1]}
                    cursor={"pointer"}
                    fontSize={"2xl"}
                    fontWeight={"3px"}
                    // onClick={(e) => handleActive(e)}
                    color={active === l[0] ? "#F3B46F" : textColor}
                  >
                    {l[1].split("-").join(" ")}
                  </Link>
                </NextLink>
              ))}
            </HStack>
            <Flex alignItems={"center"}>
              <Button
                marginRight={"50px"}
                justifyContent={"center"}
                alignItems={"center"}
                onClick={toggleColorMode}
                bgColor={"transparent"}
                id="daynight"
              >
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar id="profile" size={"md"} src={userDb?.data.avatar} />
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    <NextLink href={`/user/profile`}>
                      <Link>My Profile</Link>
                    </NextLink>
                  </MenuItem>
                  <MenuItem>
                    <NextLink href={`/user/${userDb?.data.id}`}>
                      <Link> My Public Profile </Link>
                    </NextLink>
                  </MenuItem>
                  <MenuItem>
                    <NextLink href={`/user/my-trips`} passHref>
                      <a>
                        <Link> My Trips </Link>
                      </a>
                    </NextLink>
                  </MenuItem>
                  {userDb?.data.isAdmin && (
                    <MenuItem>
                      <NextLink href={`/user/admin`}>
                        <Link> Admin Panel </Link>
                      </NextLink>
                    </MenuItem>
                  )}
                  <MenuItem>
                    <NextLink href={"/api/auth/logout"}>
                      <Link>Logout</Link>
                    </NextLink>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>
          {isOpen ? (
            <Box
              backgroundColor={useColorModeValue("white", "#2e3c4d")}
              width={"100%"}
              height={"88.5vh"}
              rounded={"10px"}
              mt={1.5}
              mb={1.5}
              pb={4}
              pl={4}
              pt={2}
              display={{ base: "flex", xl: "none" }}
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
              boxShadow={"2px 8px 35px -6px rgba(0,0,0,0.76)"}
            >
              {Links.map((l, index) => (
                <NextLink href={l[0]} key={index}>
                  <Link
                    mt={10}
                    mb={10}
                    cursor={"pointer"}
                    fontSize={"2xl"}
                    fontWeight={"2px"}
                    id={l[0]}
                    // onClick={(e) => handleActive(e)}
                    color={active === l[0] ? "#02b1b1" : textColor}
                  >
                    {l[1]}
                  </Link>
                </NextLink>
              ))}
            </Box>
          ) : null}
          <BreadCrumb />
        </Box>
      </Flex>
    </>
  );
}
