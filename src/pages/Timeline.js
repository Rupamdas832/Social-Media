import { Avatar } from "@chakra-ui/avatar";
import { Image } from "@chakra-ui/image";
import { Text, Box, Flex, Spacer, Divider } from "@chakra-ui/layout";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { FaRegComment, FaRetweet } from "react-icons/fa";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../features/posts/postsSlice";

export const Timeline = () => {
  const { user } = useSelector((state) => state.user);
  const { userId, name, followers, following, profileImg, coverImg, bio } =
    user;

  const { posts } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  const likeHandler = (isLiked, _id) => {
    if (isLiked === undefined) {
      const newLike = {
        userId: userId,
      };
      dispatch(increment({ newLike: newLike, postId: _id }));
    }
  };

  let userPosts = [];
  userPosts = posts.filter((post) => post.userId === userId);

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
            @{userId}
          </Text>
        </Flex>
        <Flex px="3" mb="5">
          <Text>{bio}</Text>
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
              userId,
              content,
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
                    <Text fontSize="sm">{userId}</Text>
                  </Flex>
                </Flex>
                <Box p="2">
                  <Text>{content}</Text>
                </Box>
                <Flex
                  w={["60%", "50%", "40%", "40%"]}
                  direction="row"
                  align="center"
                  p="3"
                  fontSize="xl"
                >
                  <Box onClick={() => likeHandler(isLiked, _id)}>
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
                  <FaRegComment />
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
