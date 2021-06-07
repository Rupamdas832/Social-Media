import { BiLink } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { commentHandler } from "../features/posts";
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
import { PostCard } from "../components/PostCard";
import { followUserHandler } from "../features/user/followUserHandler";

export const Timeline = () => {
  const { loggedInUser, usersList } = useSelector((state) => state.user);
  const { posts, postModal } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const [reply, setReply] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { userNameFromParam } = useParams();

  const isFollowing = loggedInUser.following.find(
    (item) => item.userName === userNameFromParam
  );
  let userPosts = [];
  userPosts = posts.filter((post) => post.userName === userNameFromParam);

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
      {usersList.map((user) => {
        const {
          _id,
          userName,
          name,
          followers,
          following,
          profileImg,
          coverImg,
          bio,
          website,
        } = user;
        if (userName === userNameFromParam) {
          return (
            <Flex
              w={["100vw", "100vw", "45vw", "45vw"]}
              direction="column"
              align="center"
              key={_id}
            >
              <Box
                h={["150px", "200px", "250px", "250px"]}
                w="100%"
                bg="red.200"
              >
                <Image
                  src={coverImg}
                  alt="Segun Adebayo"
                  h="100%"
                  w="100%"
                  overflow
                />
              </Box>
              <Flex w="100%" direction="row" align="center" px="8">
                <Link to={`/${userName}/followers`}>
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
                <Link to={`/${userName}/following`}>
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
              {loggedInUser.userName === userNameFromParam ? null : (
                <Flex
                  direction="row"
                  px="2"
                  my="3"
                  w="100%"
                  justifyContent="space-around"
                >
                  {isFollowing === undefined ? (
                    <Button
                      colorScheme="teal"
                      px="6"
                      onClick={() =>
                        followUserHandler(
                          userName,
                          name,
                          profileImg,
                          loggedInUser,
                          dispatch
                        )
                      }
                    >
                      Follow
                    </Button>
                  ) : (
                    <Button colorScheme="teal" variant="outline">
                      Following
                    </Button>
                  )}

                  <Button variant="outline" colorScheme="teal">
                    Message
                  </Button>
                </Flex>
              )}
              <Divider />
              {userPosts.length === 0 ? (
                <Text mt="5" fontSize="lg" fontWeight="medium" color="gray.400">
                  Compose your first post
                </Text>
              ) : (
                userPosts.map((post) => {
                  return (
                    <PostCard
                      post={post}
                      commentModalHandler={commentModalHandler}
                      key={post._id}
                    />
                  );
                })
              )}
            </Flex>
          );
        } else return null;
      })}
    </Flex>
  );
};
