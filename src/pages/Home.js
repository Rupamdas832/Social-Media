import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPostOnModal, loadPosts } from "../features/posts/postsSlice";
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
import axios from "axios";
import { apiUrl } from "../api/ApiURL";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { posts, postModal, postStatus } = useSelector((state) => state.posts);
  const { loggedInUser, token } = useSelector((state) => state.user);
  const { themeColor, themeMode } = useSelector((state) => state.theme);

  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [reply, setReply] = useState("");

  const commentModalHandler = (post) => {
    dispatch(loadPostOnModal({ post }));
    onOpen();
  };

  const sortedPosts = posts
    ?.slice()
    .sort((a, b) => new Date(b["createdAt"]) - new Date(a["createdAt"]));

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(loadPosts());
    }
  }, [dispatch, postStatus]);

  const navigate = useNavigate();
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
                <Avatar name={postModal.name} src={postModal.profileImg} />
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
                name={loggedInUser.name}
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
      {postStatus !== "fulfilled" ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="teal"
          size="xl"
        />
      ) : (
        sortedPosts.map((post) => {
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
