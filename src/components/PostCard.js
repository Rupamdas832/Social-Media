import { Avatar, Box, Flex, Spacer, Text } from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import React from "react";
import { AiOutlineRetweet } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { likeHandler } from "../features/posts";

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

  const { loggedInUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const isLiked = likes.find((like) => like.userName === loggedInUser.userName);

  return (
    <Box
      w={["100vw", "100vw", "45vw", "45vw"]}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      mt="5"
      key={_id}
    >
      <Link to={`/timeline/${userName}`}>
        <Flex direction="row" p="2" align="center">
          <Avatar name="Kent Dodds" src={profileImg} />
          <Flex ml="3" direction="column">
            <Text fontWeight="bold">{name}</Text>
            <Text fontSize="sm">@{userName}</Text>
          </Flex>
          <Text fontWeight="hairline" fontStyle="italic" fontSize="sm" ml="3">
            {formatDistanceToNow(Date.parse(createdAt))} ago
          </Text>
        </Flex>
      </Link>
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
        <Box onClick={() => likeHandler(isLiked, post, loggedInUser, dispatch)}>
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
};
