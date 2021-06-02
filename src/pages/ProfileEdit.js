import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { FormLabel } from "@chakra-ui/form-control";
import { FormControl } from "@chakra-ui/form-control";
import { Image } from "@chakra-ui/image";
import { Input } from "@chakra-ui/input";
import { Box } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { editProfile } from "../features/user/userSlice";

export const ProfileEdit = () => {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);
  const [website, setWebsite] = useState(user.website);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeProfileHandler = () => {
    dispatch(editProfile({ name: name, bio: bio, website: website }));
    navigate("/timeline");
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
            src={user.coverImg}
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
            src={user.profileImg}
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