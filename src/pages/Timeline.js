import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { FaRegComment, FaRetweet } from "react-icons/fa";
import { BiLink } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { commentHandler, likeHandler } from "../features/posts";
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
  Image,
  Avatar,
  Text,
  Box,
  Flex,
  Spacer,
  Divider,
} from "@chakra-ui/react";
import { loadPostOnModal } from "../features/posts/postsSlice";

export const Timeline = () => {
  const { user } = useSelector((state) => state.user);
  const {
    userName,
    name,
    followers,
    following,
    profileImg,
    coverImg,
    bio,
    website,
  } = user;

  const { posts, postModal } = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [reply, setReply] = useState("");

  let userPosts = [];
  userPosts = posts.filter((post) => post.userName === userName);

  const commentModalHandler = (post) => {
    dispatch(loadPostOnModal({ post }));
    onOpen();
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
      <Flex
        w={["100vw", "100vw", "45vw", "45vw"]}
        direction="column"
        align="center"
      >
        <Box h={["150px", "200px", "250px", "250px"]} w="100%" bg="red.200">
          <Image
            src={coverImg}
            alt="Segun Adebayo"
            h="100%"
            w="100%"
            overflow
          />
        </Box>
        <Flex w="100%" direction="row" align="center" px="8">
          <Link to="/followers">
            <Flex direction="column" align="center">
              <Text fontWeight="bold" fontSize="lg">
                {followers.length}
              </Text>
              <Text fontSize="sm">Followers</Text>
            </Flex>
          </Link>
          <Spacer />
          <Avatar
            size="xl"
            name="Christian Nwamba"
            src={profileImg}
            mt="-5"
            border="2px"
            borderColor="white"
          />
          <Spacer />
          <Link to="/following">
            <Flex direction="column" align="center">
              <Text fontWeight="bold" fontSize="lg">
                {following.length}
              </Text>
              <Text fontSize="sm">Following</Text>
            </Flex>
          </Link>
        </Flex>
        <Flex direction="row" my="5">
          <Text fontWeight="medium" fontSize="lg">
            {name}{" "}
          </Text>
          <Text mx="2">|</Text>
          <Text fontWeight="medium" fontSize="md" color="gray.500">
            @{userName}
          </Text>
        </Flex>
        <Flex px="3" mb="5">
          <Text>{bio}</Text>
        </Flex>
        <Flex direction="row" align="center" color="teal" w="100%">
          <BiLink />
          <Text>{website}</Text>
        </Flex>
        <Divider />
        {userPosts.length === 0 ? (
          <Text mt="5" fontSize="lg" fontWeight="medium" color="gray.400">
            Compose your first post
          </Text>
        ) : (
          userPosts.map((post) => {
            const {
              _id,
              profileImg,
              name,
              userName,
              content,
              likes,
              rePosts,
              comments,
            } = post;
            const isLiked = likes.find(
              (like) => like.userName === user.userName
            );
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
                    <Text fontSize="sm">{userName}</Text>
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
                  <Box
                    onClick={() => likeHandler(isLiked, post, user, dispatch)}
                  >
                    {isLiked ? (
                      <FcLike />
                    ) : (
                      <FcLikePlaceholder fontSize="2xl" />
                    )}
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
                  <FaRetweet />
                  <Text fontSize="sm" ml="1">
                    {rePosts}
                  </Text>
                </Flex>
              </Box>
            );
          })
        )}
      </Flex>
    </Flex>
  );
};
