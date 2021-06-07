import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPostOnModal } from "../features/posts/postsSlice";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Textarea,
  Button,
  useDisclosure,
  Avatar,
  Text,
  Box,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { commentHandler } from "../features/posts";
import { PostCard } from "../components/PostCard";

export const Home = () => {
  const { posts, postModal } = useSelector((state) => state.posts);
  const { loggedInUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [reply, setReply] = useState("");

  const commentModalHandler = (post) => {
    dispatch(loadPostOnModal({ post }));
    onOpen();
  };

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
      {postModal && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
              <Flex direction="row" p="2" align="center">
                <Avatar name="Kent Dodds" src={postModal.profileImg} />
                <Flex ml="3" direction="column">
                  <Text fontWeight="bold">{postModal.name}</Text>
                  <Text fontSize="sm">@{postModal.userName}</Text>
                </Flex>
              </Flex>
              <Box p="2">
                <Text>{postModal.content}</Text>
              </Box>
            </ModalBody>
            <Flex direction="row" p="2" align="center">
              <Avatar
                name="Kent Dodds"
                src={loggedInUser.profileImg}
                size="sm"
              />
              <Flex ml="3" direction="column" w="100%">
                <Flex direction="row">
                  <Text fontWeight="bold">{loggedInUser.name}</Text>
                  <Text fontSize="sm" color="gray.500" ml="3">
                    @{loggedInUser.userName}
                  </Text>
                </Flex>
                <Textarea
                  placeholder="Post your reply"
                  maxLength={280}
                  onChange={(e) => setReply(e.target.value)}
                />
              </Flex>
            </Flex>
            <ModalFooter>
              <Button
                colorScheme="teal"
                disabled={reply === "" ? true : false}
                onClick={() =>
                  commentHandler(
                    postModal,
                    reply,
                    onClose,
                    loggedInUser,
                    dispatch
                  )
                }
              >
                Reply
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      {posts === null ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="teal"
          size="xl"
        />
      ) : (
        posts.map((post) => {
          return (
            <PostCard
              post={post}
              key={post._id}
              commentModalHandler={commentModalHandler}
            />
          );
        })
      )}
    </Flex>
  );
};
