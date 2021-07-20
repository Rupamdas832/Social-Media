import {
  Avatar,
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import React from "react";
import { AiOutlineRetweet } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { HiDotsVertical } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { likeHandler } from "../features/posts";
import { apiUrl } from "../api/ApiURL";
import { loadPosts, postsUpdated } from "../features/posts/postsSlice";

export const PostCard = ({ post, commentModalHandler }) => {
  const {
    _id,
    name,
    userName,
    content,
    profileImg,
    likes,
    rePosts,
    comments,
    createdAt,
  } = post;

  const { loggedInUser, token } = useSelector((state) => state.user);
  const { themeColor, themeMode } = useSelector((state) => state.theme);

  const dispatch = useDispatch();
  const toast = useToast();

  const isLiked = likes.find((like) => like.userName === loggedInUser.userName);

  const deletePost = async () => {
    try {
      const {
        status,
        data: { removedPost },
      } = await axios.delete(`${apiUrl}/posts`, {
        headers: { Authorization: token },
        data: {
          postId: _id,
        },
      });
      if (status === 200) {
        dispatch(postsUpdated({ removedPost }));
        toast({
          title: "Post removed",
          status: "info",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      w={["100vw", "100vw", "45vw", "45vw"]}
      borderY="1px"
      overflow="hidden"
      mt="5"
      key={_id}
      style={{ border: `1px solid ${themeColor[themeMode].border}` }}
    >
      <Flex direction="row">
        <Link to={`/timeline/${userName}`}>
          <Flex direction="row" p="2" align="center">
            <Avatar name={name} src={profileImg} />
            <Flex ml="3" direction="column">
              <Text fontWeight="bold">{name}</Text>
              <Text fontSize="sm">@{userName}</Text>
            </Flex>
            <Text fontWeight="hairline" fontStyle="italic" fontSize="sm" ml="3">
              {formatDistanceToNow(Date.parse(createdAt))} ago
            </Text>
          </Flex>
        </Link>
        <Spacer />
        {userName === loggedInUser.userName && (
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
                onClick={() => deletePost()}
              >
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        )}
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
          onClick={() =>
            likeHandler(isLiked, post, loggedInUser, token, dispatch)
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
        {/*<AiOutlineRetweet />
        <Text fontSize="sm" ml="1">
          {rePosts}
        </Text>*/}
      </Flex>
    </Box>
  );
};
