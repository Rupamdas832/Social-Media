import { Avatar } from "@chakra-ui/avatar";
import { Text, Box, Flex, Spacer } from "@chakra-ui/layout";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { AiOutlineRetweet } from "react-icons/ai";
import { FaRegComment, FaRetweet } from "react-icons/fa";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { increment } from "../features/posts/postsSlice";

export const Home = () => {
  const { posts } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const likeHandler = (isLiked, _id) => {
    if (isLiked === undefined) {
      const newLike = {
        userId: user.userId,
      };
      dispatch(increment({ newLike: newLike, postId: _id }));
    }
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
      {posts.map((post) => {
        const {
          _id,
          name,
          userId,
          content,
          profileImg,
          likes,
          rePosts,
          comments,
        } = post;
        const isLiked = likes.find((like) => like.userId === user.userId);
        return (
          <Box
            maxW={["sm", "md", "xl", "xl"]}
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
                <Text fontSize="sm">@{userId}</Text>
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
              <Box onClick={() => likeHandler(isLiked, _id)}>
                {isLiked ? <FcLike /> : <FcLikePlaceholder fontSize="2xl" />}
              </Box>
              <Text fontSize="sm" ml="1">
                {likes.length}
              </Text>
              <Spacer />
              <FaRegComment />
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
      })}
    </Flex>
  );
};
