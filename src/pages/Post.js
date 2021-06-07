import React, { useEffect, useState } from "react";
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
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadPostOnModal } from "../features/posts/postsSlice";
import { commentHandler } from "../features/posts";
import { formatDistanceToNow } from "date-fns";
import { PostCard } from "../components/PostCard";

export const Post = () => {
  const { posts, postModal } = useSelector((state) => state.posts);
  const { loggedInUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [reply, setReply] = useState("");

  const commentModalHandler = (post) => {
    dispatch(loadPostOnModal({ post }));
    onOpen();
  };

  const { postId } = useParams();

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
      {posts.map((post) => {
        if (post._id === postId) {
          return (
            <Flex
              direction="column"
              key={post._id}
              bg="gray.200"
              mt="5"
              rounded="lg"
            >
              <PostCard post={post} commentModalHandler={commentModalHandler} />
              <Flex direction="column" mt="3" px="2" bg="white">
                {post.comments.map((comment) => {
                  return (
                    <Flex
                      direction="row"
                      p="2"
                      align="center"
                      key={comment._id}
                    >
                      <Avatar
                        name="Kent Dodds"
                        src={comment.profileImg}
                        size="sm"
                      />
                      <Flex ml="3" direction="column" w="100%">
                        <Flex direction="row">
                          <Text fontWeight="bold">{comment.name}</Text>
                          <Text fontSize="sm" color="gray.500" ml="3">
                            @{comment.userName}
                          </Text>
                        </Flex>
                        <Text>{comment.text}</Text>
                        <Text
                          fontWeight="hairline"
                          fontStyle="italic"
                          fontSize="xs"
                          textAlign="right"
                        >
                          {formatDistanceToNow(Date.parse(comment.createdAt))}{" "}
                          ago
                        </Text>
                      </Flex>
                    </Flex>
                  );
                })}
              </Flex>
            </Flex>
          );
        } else return null;
      })}
    </Flex>
  );
};
