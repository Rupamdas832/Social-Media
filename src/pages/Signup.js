import {
  Button,
  Image,
  Text,
  Flex,
  Input,
  FormLabel,
  FormControl,
  InputGroup,
  InputRightElement,
  Alert,
  AlertIcon,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Photo from "../assets/Asset880.svg";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../features/user/userSlice";
import { loadUserNotification } from "../features/notifications/notificationSlice";

export const Signup = () => {
  const [userName, setUserName] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  const { themeColor, themeMode } = useSelector((state) => state.theme);
  const { loggedInUserStatus, userLoginError, token } = useSelector(
    (state) => state.user
  );
  const { notificationStatus } = useSelector((state) => state.notifications);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toast = useToast();

  const signupUserHandler = async () => {
    toast({
      title: "Signing up",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
    if (loggedInUserStatus === "idle") {
      dispatch(
        signupUser({
          name: name,
          email: email,
          userName: userName,
          password: password,
        })
      );
    }
  };

  useEffect(() => {
    if (loggedInUserStatus === "fulfilled") {
      if (notificationStatus === "idle") {
        dispatch(loadUserNotification({ token: token }));
      }
      navigate("/getting-started");
      toast({
        title: "Successfully logged In.",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    }
  }, [loggedInUserStatus]);

  return (
    <Flex
      w="100vw"
      h="100vh"
      direction="row"
      align="center"
      justify="center"
      position="relative"
      zIndex="2"
      style={{
        backgroundColor: `${themeColor[themeMode].bg}`,
        color: `${themeColor[themeMode].color}`,
      }}
    >
      <Flex
        display={["none", "none", "flex", "flex"]}
        w={["0vw", "0vw", "40vw", "40vw"]}
        h={["0vw", "0vw", "80vh", "80vh"]}
        mr="20"
      >
        <Image src={Photo} alt="Rear view of modern home with pool" />
      </Flex>
      <Flex direction="column" w={["100vw", "100vw", "40vw", "40vw"]} px="3">
        <Text fontSize="3xl" fontWeight="medium" fontFamily="cursive">
          Grader
        </Text>
        <Text my="3" fontSize="4xl" fontWeight="bold">
          Create an account
        </Text>
        <p>Signup with your Grader credentials to connect your account.</p>
        <FormControl px="2" mt="2" isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            placeholder="Enter name"
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl px="2" mt="2" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="text"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl px="2" mt="2" isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            placeholder="Enter username"
            onChange={(e) => setUserName(e.target.value)}
          />
        </FormControl>
        <FormControl px="2" mt="2" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={handleClick}
                variant="outline"
              >
                {show ? <BsEye /> : <BsEyeSlash />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        {userLoginError && (
          <Alert status="error">
            <AlertIcon />
            {userLoginError}
          </Alert>
        )}
        <Button
          colorScheme="teal"
          variant="solid"
          my="5"
          ml="2"
          onClick={() => signupUserHandler()}
        >
          Signup
        </Button>
        <Text>
          Already have an account! login{" "}
          <Link to="/login" style={{ color: "teal" }}>
            here
          </Link>
        </Text>
      </Flex>
    </Flex>
  );
};
