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
  Spacer,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loadPostOnModal } from "../features/posts/postsSlice";
import { commentHandler, deleteComment } from "../features/posts";
import { formatDistanceToNow } from "date-fns";
import { PostCard } from "../components/PostCard";
import { HiDotsVertical } from "react-icons/hi";
import axios from "axios";
import { apiUrl } from "../api/ApiURL";

export const Post = () => {
  const { posts, postModal } = useSelector((state) => state.posts);
  const { loggedInUser, token } = useSelector((state) => state.user);
  const { themeColor, themeMode } = useSelector((state) => state.theme);

  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [reply, setReply] = useState("");

  const commentModalHandler = (post) => {
    dispatch(loadPostOnModal({ post }));
    onOpen();
  };

  const { postId } = useParams();
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
      {posts.map((post) => {
        if (post._id === postId) {
          return (
            <Flex
              direction="column"
              key={post._id}
              mt="5"
              rounded="lg"
              style={{
                backgroundColor: `${themeColor[themeMode].bg}`,
                color: `${themeColor[themeMode].color}`,
              }}
            >
              <PostCard post={post} commentModalHandler={commentModalHandler} />
              <Flex
                direction="column"
                mt="3"
                px="2"
                style={{
                  backgroundColor: `${themeColor[themeMode].bg}`,
                  color: `${themeColor[themeMode].color}`,
                }}
              >
                {post.comments.map((comment) => {
                  if (
                    post.userName === loggedInUser.userName ||
                    comment.userName === loggedInUser.userName
                  ) {
                    return (
                      <Flex
                        direction="row"
                        p="2"
                        align="center"
                        key={comment._id}
                      >
                        <Avatar
                          name={comment.name}
                          src={comment.profileImg}
                          size="sm"
                        />
                        <Flex ml="3" direction="column" w="100%">
                          <Flex direction="row">
                            <Text fontWeight="bold">{comment.name}</Text>
                            <Text fontSize="sm" color="gray.500" ml="3">
                              @{comment.userName}
                            </Text>
                            <Spacer />
                            <Menu>
                              <MenuButton
                                as={Button}
                                style={{
                                  backgroundColor: `${themeColor[themeMode].bg}`,
                                  color: `${themeColor[themeMode].color}`,
                                }}
                              >
                                <HiDotsVertical />
                              </MenuButton>
                              <MenuList
                                style={{
                                  backgroundColor: `${themeColor[themeMode].bg}`,
                                  color: `${themeColor[themeMode].color}`,
                                }}
                              >
                                <MenuItem
                                  style={{
                                    backgroundColor: `${themeColor[themeMode].bg}`,
                                    color: `${themeColor[themeMode].color}`,
                                  }}
                                  onClick={() =>
                                    deleteComment(
                                      post,
                                      comment._id,
                                      token,
                                      dispatch
                                    )
                                  }
                                >
                                  Delete
                                </MenuItem>
                              </MenuList>
                            </Menu>
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
                  } else
                    return (
                      <Flex
                        direction="row"
                        p="2"
                        align="center"
                        key={comment._id}
                      >
                        <Avatar
                          name={comment.name}
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
