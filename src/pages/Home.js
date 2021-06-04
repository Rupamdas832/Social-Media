import { Avatar } from "@chakra-ui/avatar";
import { Text, Box, Flex, Spacer } from "@chakra-ui/layout";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { AiOutlineRetweet } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadPostOnModal } from "../features/posts/postsSlice";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Textarea,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { commentHandler, likeHandler } from "../features/posts";

export const Home = () => {
  const { posts, postModal } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.user);
  const { allUsersNotifications } = useSelector((state) => state.notifications);

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
              <Avatar name="Kent Dodds" src={user.profileImg} size="sm" />
              <Flex ml="3" direction="column" w="100%">
                <Flex direction="row">
                  <Text fontWeight="bold">{user.name}</Text>
                  <Text fontSize="sm" color="gray.500" ml="3">
                    @{user.userName}
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
                  commentHandler(postModal, reply, onClose, user, dispatch)
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
          const isLiked = likes.find((like) => like.userName === user.userName);
          return (
            <Box
              w={["100vw", "100vw", "45vw", "45vw"]}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              mt="5"
              key={_id}
            >
              <Flex direction="row" p="2" align="center">
                <Avatar name="Kent Dodds" src={profileImg} />
                <Flex ml="3" direction="column">
                  <Text fontWeight="bold">{name}</Text>
                  <Text fontSize="sm">@{userName}</Text>
                </Flex>
              </Flex>
              <Link to={`/post/${_id}`}>
                <Box p="2">
                  <Text>{content}</Text>
                </Box>
              </Link>
              <Flex
                w={["60%", "50%", "40%", "40%"]}
                direction="row"
                align="center"
                p="3"
                fontSize="xl"
              >
                <Box onClick={() => likeHandler(isLiked, post, user, dispatch)}>
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
            </Box>
          );
        })
      )}
    </Flex>
  );
};
