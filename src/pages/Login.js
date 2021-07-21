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
  Grid,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Photo from "../assets/Asset880.svg";
import { loadLoggedInUser } from "../features/user/userSlice";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { loadUserNotification } from "../features/notifications/notificationSlice";

export const Login = () => {
  const [userCredential, setUserCredential] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const toastRef = useRef();

  const handleClick = () => setShow(!show);

  const { themeColor, themeMode } = useSelector((state) => state.theme);
  const { loggedInUserStatus, userLoginError, token } = useSelector(
    (state) => state.user
  );

  const navigate = useNavigate();
  const { state } = useLocation();

  const dispatch = useDispatch();

  const toast = useToast();

  const fillGuestCredential = () => {
    setUserCredential("rupam832");
    setPassword("Rupam@123");
  };

  const loginWithCredentials = () => {
    toastRef.current = toast({
      title: "Checking credentials.",
      status: "info",
      isClosable: true,
    });
    if (loggedInUserStatus === "idle") {
      dispatch(
        loadLoggedInUser({ userCredential: userCredential, password: password })
      );
    }
  };

  useEffect(() => {
    if (loggedInUserStatus === "fulfilled") {
      dispatch(loadUserNotification({ token: token }));
      navigate(state?.from ? state.from : "/");
      if (toastRef.current) {
        toast.close(toastRef.current);
      }
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
          Welcome Back
        </Text>
        <p>Login with your Grader credentials to connect your account.</p>
        <FormControl px="2" mt="2" isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            placeholder="Enter username OR email"
            onChange={(e) => setUserCredential(e.target.value)}
            value={userCredential}
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
              value={password}
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
        <Button
          colorScheme="teal"
          size="sm"
          variant="outline"
          my="5"
          ml="2"
          bg="gray.300"
          onClick={fillGuestCredential}
          style={{
            backgroundColor: `${themeColor[themeMode].bg}`,
            color: `${themeColor[themeMode].color}`,
          }}
        >
          Fill guest credentials
        </Button>
        <Text marginY="2" fontWeight="extrabold">
          More credentials
        </Text>
        <Flex direction="column">
          <Grid templateColumns="repeat(2, 1fr)" fontWeight="bold">
            <Text>UserName</Text>
            <Text>Password</Text>
          </Grid>
          <Grid templateColumns="repeat(2, 1fr)">
            <Text>itsRealAman</Text>
            <Text>Aman@123</Text>
          </Grid>
          <Grid templateColumns="repeat(2, 1fr)">
            <Text>angelPriya</Text>
            <Text>Priya@123</Text>
          </Grid>
        </Flex>
      </Flex>
    </Flex>
  );
};
