import { Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import { FcLike } from "react-icons/fc";
import { CgProfile } from "react-icons/cg";
import { FaRegComment } from "react-icons/fa";
import React from "react";
import { Avatar } from "@chakra-ui/avatar";
import { useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

export const Notification = () => {
  const { loggedInUser } = useSelector((state) => state.user);

  const { allUsersNotifications } = useSelector((state) => state.notifications);
  const { items } = allUsersNotifications.find(
    (item) => item.userId === loggedInUser._id
  );

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
      <Text>Notifications</Text>
      {items.length === 0 ? (
        <Text fontSize="lg" color="gray.500" mt="5">
          No notifications
        </Text>
      ) : (
        items.map((notification) => {
          const { profileImg, name, type, _id, createdAt, postId } =
            notification;
          if (type === "liked") {
            return (
              <Flex
                w={["100vw", "100vw", "45vw", "45vw"]}
                direction="column"
                border="1px"
                borderColor="gray.200"
                key={_id}
              >
                <Link to={`/post/${postId}`}>
                  <Flex direction="row" w="100%" mt="2" px="2" py="3">
                    <Text fontSize="2xl" px="2">
                      <FcLike />
                    </Text>
                    <Avatar size="sm" name="Kent Dodds" src={profileImg} />
                    <Text fontWeight="bold" px="2">
                      {name}{" "}
                      <span style={{ fontWeight: "lighter" }}>
                        {type} your post
                      </span>
                    </Text>
                  </Flex>
                  <Text
                    fontWeight="hairline"
                    fontStyle="italic"
                    ml="5"
                    fontSize="sm"
                  >
                    {formatDistanceToNow(createdAt)} ago
                  </Text>
                </Link>
              </Flex>
            );
          } else if (type === "commented") {
            return (
              <Flex
                w={["100vw", "100vw", "45vw", "45vw"]}
                direction="column"
                align="center"
                border="1px"
                borderColor="gray.200"
                key={_id}
              >
                <Link to={`/post/${postId}`}>
                  <Flex direction="row" w="100%" mt="2" px="2" py="3">
                    <Text fontSize="2xl" px="2">
                      <FaRegComment />
                    </Text>
                    <Avatar size="sm" name="Kola Tioluwani" src={profileImg} />
                    <Text fontWeight="bold" px="2">
                      {name}{" "}
                      <span style={{ fontWeight: "lighter" }}>
                        {type} on your post
                      </span>
                    </Text>
                  </Flex>
                  <Text
                    fontWeight="hairline"
                    fontStyle="italic"
                    ml="5"
                    fontSize="sm"
                  >
                    {formatDistanceToNow(createdAt)} ago
                  </Text>
                </Link>
              </Flex>
            );
          } else if (type === "followed") {
            return (
              <Flex
                w={["100vw", "100vw", "45vw", "45vw"]}
                direction="column"
                align="center"
                border="1px"
                borderColor="gray.200"
                key={_id}
              >
                <Link to={`/post/${postId}`}>
                  <Flex direction="row" w="100%" mt="2" px="2" py="3">
                    <Text fontSize="2xl" px="2">
                      <CgProfile />
                    </Text>
                    <Avatar size="sm" name="Dan Abrahmov" src={profileImg} />
                    <Text fontWeight="bold" px="2">
                      {name}{" "}
                      <span style={{ fontWeight: "lighter" }}>{type} you</span>
                    </Text>
                  </Flex>
                  <Text
                    fontWeight="hairline"
                    fontStyle="italic"
                    ml="5"
                    fontSize="sm"
                  >
                    {formatDistanceToNow(createdAt)} ago
                  </Text>
                </Link>
              </Flex>
            );
          } else return null;
        })
      )}
    </Flex>
  );
};
