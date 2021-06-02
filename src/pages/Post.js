import { Avatar } from "@chakra-ui/avatar";
import { Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/layout";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { AiOutlineRetweet } from "react-icons/ai";
import { FaRegComment, FaRetweet } from "react-icons/fa";
import React from "react";
import { Spacer } from "@chakra-ui/layout";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// Sample card from Airbnb

export const Post = () => {
  const { posts } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.user);

  const { postId } = useParams();

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
        if (_id === postId) {
          return (
            <Box
              maxW={["sm", "md", "xl", "xl"]}
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
                  <Text fontSize="sm">@{userId}</Text>
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
                {isLiked ? <FcLike /> : <FcLikePlaceholder fontSize="2xl" />}
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
                              @{comment.userId}
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
