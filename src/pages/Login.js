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
  useToast,
  AlertIcon,
  Alert,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LoginAPI, NotificationsAPI } from "../api/ApiCall";
import Photo from "../assets/Asset880.svg";
import {
  loadNotifications,
  loadLoggedInUser,
  loadUserProfile,
} from "../features/user/userSlice";
import { BsEye, BsEyeSlash } from "react-icons/bs";

export const Login = () => {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const handleClick = () => setShow(!show);

  const navigate = useNavigate();
  const { state } = useLocation();

  const dispatch = useDispatch();

  const toast = useToast();

  /*const fetchNotifications = async (_id) => {
    try {
      const {
        status,
        data: { notificationData },
      } = await NotificationsAPI(_id);
      if (status === 200) {
        dispatch(loadNotifications({ notifications: notificationData.items }));
        navigate(state?.from ? state.from : "/");
        toast({
          title: "Successfully logged In.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };*/

  const loginWithCredentials = async () => {
    toast({
      title: "Checking credentials.",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
    try {
      const {
        status,
        data: { user, token },
      } = await LoginAPI(userName, password);
      if (status === 200) {
        const newUser = {
          user,
          token,
        };
        dispatch(loadLoggedInUser(newUser));
        dispatch(loadUserProfile({ userProfile: user }));
        //fetchNotifications(user._id);
        navigate(state?.from ? state.from : "/");
        toast({
          title: "Successfully logged In.",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <Flex
      w="100vw"
      h="100vh"
      direction="row"
      align="center"
      justify="center"
      position="relative"
      bg="white"
      zIndex="2"
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
          Welcome Back
        </Text>
        <p>Login with your Grader credentials to connect your account.</p>
        <FormControl px="2" mt="2" isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            placeholder="Enter username OR email"
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
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? <BsEye /> : <BsEyeSlash />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}
        <Button
          colorScheme="teal"
          variant="solid"
          my="5"
          ml="2"
          onClick={() => loginWithCredentials()}
        >
          Login
        </Button>
        <Text>
          New to Grader! signup{" "}
          <Link to="/signup" style={{ color: "teal" }}>
            here
          </Link>
        </Text>
      </Flex>
    </Flex>
  );
};
