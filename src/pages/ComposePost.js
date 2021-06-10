import {
  Textarea,
  Button,
  Avatar,
  Text,
  Flex,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { composePost } from "../features/posts/postsSlice";
import { v4 as uuid } from "uuid";

export const ComposePost = () => {
  const [content, setContent] = useState("");

  const { loggedInUser } = useSelector((state) => state.user);
  const { userName, name, profileImg } = loggedInUser;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const composePostHandler = () => {
    const newPost = {
      _id: uuid(),
      userName: userName,
      name: name,
      profileImg: profileImg,
      content: content,
      likes: [],
      rePosts: 0,
      comments: [],
      createdAt: new Date().toISOString(),
    };
    dispatch(composePost({ newPost: newPost }));
    setContent("");
    navigate("/");
  };
  return (
    <Flex
      w="100vw"
      minH="100vh"
      direction="column"
      align="center"
      position="relative"
      pt="16"
      pb="20"
    >
      <Flex
        w={["100vw", "100vw", "45vw", "45vw"]}
        direction="column"
        mt="5"
        px="2"
      >
        <Flex direction="row" w="100%">
          <Avatar
            size="md"
            name="Christian Nwamba"
            src={profileImg}
            border="1px"
            borderColor="white"
          />
          <FormControl px="2" size="xl">
            <FormLabel>
              Compose new post<Text color="gray.400">(max 280 characters)</Text>
            </FormLabel>
            <Textarea
              placeholder="Whats on your mind type it up?"
              h="250px"
              maxLength={280}
              onChange={(e) => setContent(e.target.value)}
            />
          </FormControl>
        </Flex>
        <Text color="gray.700" textAlign="right" mr="5">
          {280 - content.length}
        </Text>
        <Button
          colorScheme="teal"
          variant="solid"
          my="5"
          disabled={content === "" ? true : false}
          onClick={() => composePostHandler()}
        >
          Post
        </Button>
      </Flex>
    </Flex>
  );
};
