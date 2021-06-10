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
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Photo from "../assets/Asset880.svg";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { SignupAPI } from "../api/ApiCall";
import {
  addNewUserToUsersList,
  loadLoggedInUser,
} from "../features/user/userSlice";
import { addNewNotificationDataToList } from "../features/notifications/notificationSlice";
import { v4 } from "uuid";

export const Signup = () => {
  const [userName, setUserName] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  const { themeColor, themeMode } = useSelector((state) => state.theme);

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
    try {
      const {
        status,
        data: { user, token },
      } = await SignupAPI(name, email, userName, password);
      if (status === 201) {
        const newUser = {
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            userName: user.userName,
            password: user.password,
            profileImg: " ",
            coverImg: " ",
            bio: " ",
            website: " ",
            followers: [],
            following: [],
          },
          token: token,
        };
        const newNotificationData = {
          _id: v4(),
          userName: user.userName,
          userId: user._id,
          name: user.name,
          items: [],
        };
        dispatch(loadLoggedInUser(newUser));
        dispatch(addNewUserToUsersList({ user: user }));
        dispatch(
          addNewNotificationDataToList({
            newNotificationData: newNotificationData,
          })
        );
        //fetchNotifications(user._id);
        navigate("/getting-started");
        toast({
          title: "Successfully Signed up.",
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
