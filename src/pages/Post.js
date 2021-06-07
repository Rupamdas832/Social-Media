import { Avatar } from "@chakra-ui/avatar";
import { Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/layout";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { AiOutlineRetweet } from "react-icons/ai";
import { FaRegComment, FaRetweet } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { Spacer } from "@chakra-ui/layout";
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
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadPostOnModal } from "../features/posts/postsSlice";
import { commentHandler, likeHandler } from "../features/posts";

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
        const {
          _id,
          name,
          userName,
          content,
          profileImg,
          likes,
          rePosts,
          comments,
        } = post;
        const isLiked = likes.find(
          (like) => like.userName === loggedInUser.userName
        );
        if (_id === postId) {
          return (
            <Box
              w={["100vw", "100vw", "45vw", "45vw"]}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              mt="5"
              key={_id}
            >
              <Flex direction="row" p="2" align="center" bg="gray.100">
                <Avatar name="Kent Dodds" src={profileImg} />
                <Flex ml="3" direction="column">
                  <Text fontWeight="bold">{name}</Text>
                  <Text fontSize="sm">@{userName}</Text>
                </Flex>
              </Flex>
              <Box p="2" bg="gray.100">
                <Text>{content}</Text>
              </Box>
              <Flex
                w={["60%", "50%", "40%", "40%"]}
                direction="row"
                align="center"
                p="3"
                fontSize="xl"
              >
                <Box
                  onClick={() =>
                    likeHandler(isLiked, post, loggedInUser, dispatch)
                  }
                >
                  {isLiked ? <FcLike /> : <FcLikePlaceholder fontSize="2xl" />}
                </Box>
                <Text fontSize="sm" ml="1">
                  {likes.length}
                </Text>
                <Spacer />
                <FaRegComment onClick={() => commentModalHandler(post)} />
                <Text fontSize="sm" ml="1">
                  {comments.length}
                </Text>
                <Spacer />
                <AiOutlineRetweet />
                <Text fontSize="sm" ml="1">
                  {rePosts}
                </Text>
              </Flex>
              <Flex direction="column" mt="3" px="2">
                {comments.map((comment) => {
                  return (
                    <Box key={comment._id}>
                      <Flex direction="row" p="2" align="center">
                        <Avatar
                          name="Kent Dodds"
                          src={comment.profileImg}
                          size="sm"
                        />
                        <Flex ml="3" direction="column">
                          <Flex direction="row">
                            <Text fontWeight="bold">{comment.name}</Text>
                            <Text fontSize="sm" color="gray.500" ml="3">
                              @{comment.userName}
                            </Text>
                          </Flex>
                          <Text>{comment.text}</Text>
                        </Flex>
                      </Flex>
                    </Box>
                  );
                })}
              </Flex>
            </Box>
          );
        }
      })}
    </Flex>
  );
};
