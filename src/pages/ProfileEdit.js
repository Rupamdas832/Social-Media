import {
  Textarea,
  Button,
  Image,
  Avatar,
  Box,
  Flex,
  Input,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editProfile } from "../features/user/userSlice";

export const ProfileEdit = () => {
  const { loggedInUser } = useSelector((state) => state.user);
  const [name, setName] = useState(loggedInUser.name);
  const [bio, setBio] = useState(loggedInUser.bio);
  const [website, setWebsite] = useState(loggedInUser.website);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeProfileHandler = () => {
    dispatch(editProfile({ name: name, bio: bio, website: website }));
    navigate(`/timeline/${loggedInUser.userName}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Flex
      w="100vw"
      direction="column"
      justify="center"
      align="center"
      position="relative"
      pt="16"
      pb="20"
    >
      <Flex
        w={["100vw", "100vw", "45vw", "45vw"]}
        direction="column"
        align="center"
      >
        <Box h="150px" w="100%" bg="red.200">
          <Image
            src={loggedInUser.coverImg}
            alt="Segun Adebayo"
            h="100%"
            w="100%"
            overflow
          />
        </Box>
        <Flex w="100%" direction="row" align="center" px="8">
          <Avatar
            size="xl"
            name="Christian Nwamba"
            src={loggedInUser.profileImg}
            mt="-5"
            border="2px"
            borderColor="white"
          />
        </Flex>
        <FormControl px="2" mt="2">
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl px="2" mt="2">
          <FormLabel>Bio</FormLabel>
          <Textarea value={bio} onChange={(e) => setBio(e.target.value)} />
        </FormControl>
        <FormControl px="2" mt="2">
          <FormLabel>Website</FormLabel>
          <Input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </FormControl>
        <Button
          colorScheme="teal"
          variant="solid"
          my="5"
          onClick={() => changeProfileHandler()}
        >
          Save
        </Button>
      </Flex>
    </Flex>
  );
};
