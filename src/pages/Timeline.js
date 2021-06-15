import { BiLink } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
  Spinner,
} from "@chakra-ui/react";
import { loadPostOnModal } from "../features/posts/postsSlice";
import { PostCard } from "../components/PostCard";
import { followUserHandler } from "../features/user/followUserHandler";
import axios from "axios";
import { loadUserProfile } from "../features/user/userSlice";
import { apiUrl } from "../api/ApiURL";

export const Timeline = () => {
  const { loggedInUser, token, userProfile } = useSelector(
    (state) => state.user
  );
  const { posts, postModal } = useSelector((state) => state.posts);
  const { themeColor, themeMode } = useSelector((state) => state.theme);

  const dispatch = useDispatch();

  const [reply, setReply] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { userNameFromParam } = useParams();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const {
        status,
        data: { user },
      } = await axios.get(`${apiUrl}/user/${userNameFromParam}`, {
        headers: { Authorization: token },
      });
      if (status === 200) {
        dispatch(loadUserProfile({ user: user }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userNameFromParam]);

  const isFollowing = loggedInUser.following.find(
    (item) => item.userName === userNameFromParam
  );

  let userPosts = [];
  userPosts = posts?.filter((post) => post.userName === userNameFromParam);
  const sortedUserPosts = userPosts
    ?.slice()
    .sort((a, b) => new Date(b["createdAt"]) - new Date(a["createdAt"]));

  const commentModalHandler = (post) => {
    dispatch(loadPostOnModal({ post }));
    onOpen();
  };

  const authenticateUser = async () => {
    try {
      await axios.get(`${apiUrl}/user`, {
        headers: { authorization: token },
      });
    } catch (error) {
      console.log(error.response.data);
      if (error.response.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    authenticateUser();
  }, [token]);

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
      {postModal && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent
            style={{
              backgroundColor: `${themeColor[themeMode].bg}`,
              color: `${themeColor[themeMode].color}`,
              border: `1px solid ${themeColor[themeMode].color}`,
            }}
          >
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
                    token,
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
      <Flex>
        {userProfile === null ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        ) : (
          <Flex
            w={["100vw", "100vw", "45vw", "45vw"]}
            direction="column"
            align="center"
            key={userProfile._id}
          >
            <Box h={["150px", "200px", "250px", "250px"]} w="100%" bg="red.200">
              <Image
                src={userProfile.coverImg}
                alt="Segun Adebayo"
                h="100%"
                w="100%"
                overflow
              />
            </Box>
            <Flex w="100%" direction="row" align="center" px="8">
              <Link to={`/${userProfile.userName}/followers`}>
                <Flex direction="column" align="center">
                  <Text fontWeight="bold" fontSize="lg">
                    {userProfile.followers.length}
                  </Text>
                  <Text fontSize="sm">Followers</Text>
                </Flex>
              </Link>
              <Spacer />
              <Avatar
                size="xl"
                name="Christian Nwamba"
                src={userProfile.profileImg}
                mt="-5"
                border="2px"
                borderColor="white"
              />
              <Spacer />
              <Link to={`/${userProfile.userName}/following`}>
                <Flex direction="column" align="center">
                  <Text fontWeight="bold" fontSize="lg">
                    {userProfile.following.length}
                  </Text>
                  <Text fontSize="sm">Following</Text>
                </Flex>
              </Link>
            </Flex>
            <Flex direction="row" my="5">
              <Text fontWeight="medium" fontSize="lg">
                {userProfile.name}{" "}
              </Text>
              <Text mx="2">|</Text>
              <Text fontWeight="medium" fontSize="md" color="gray.500">
                @{userProfile.userName}
              </Text>
            </Flex>
            <Flex px="3" mb="5">
              <Text>{userProfile.bio}</Text>
            </Flex>
            <Flex direction="row" align="center" color="teal" w="100%">
              <BiLink />
              <Text>{userProfile.website}</Text>
            </Flex>
            <Flex
              direction="row"
              px="2"
              my="3"
              w="100%"
              justifyContent="space-around"
            >
              {userNameFromParam === loggedInUser.userName ? null : (
                <>
                  {isFollowing === undefined ? (
                    <Button
                      colorScheme="teal"
                      px="6"
                      onClick={() =>
                        followUserHandler(
                          userProfile._id,
                          loggedInUser,
                          token,
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
                </>
              )}
            </Flex>
            <Divider />
            {sortedUserPosts?.length === 0 ? (
              <Text mt="5" fontSize="lg" fontWeight="medium" color="gray.400">
                Compose your first post
              </Text>
            ) : (
              sortedUserPosts?.map((post) => {
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
        )}
      </Flex>
    </Flex>
  );
};
