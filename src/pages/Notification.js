import { Text, Flex, Avatar } from "@chakra-ui/react";
import { FcLike } from "react-icons/fc";
import { IoPersonCircle } from "react-icons/io5";
import { FaRegComment } from "react-icons/fa";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../api/ApiURL";

export const Notification = () => {
  const { token } = useSelector((state) => state.user);
  const { themeColor, themeMode } = useSelector((state) => state.theme);

  const { notifications } = useSelector((state) => state.notifications);

  const sortedNotifications = notifications
    ?.slice()
    .sort((a, b) => new Date(b["createdAt"]) - new Date(a["createdAt"]));

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
      <Text>Notifications</Text>
      {sortedNotifications.length === 0 ? (
        <Text fontSize="lg" color="gray.500" mt="5">
          No notifications
        </Text>
      ) : (
        sortedNotifications.map((notification) => {
          const { profileImg, name, type, _id, createdAt, postId, userName } =
            notification;
          if (type === "liked") {
            return (
              <Flex
                w={["100vw", "100vw", "45vw", "45vw"]}
                direction="column"
                key={_id}
                style={{
                  borderBottom: `1px solid ${themeColor[themeMode].border}`,
                }}
              >
                <Link to={`/post/${postId}`}>
                  <Flex direction="row" w="100%" mt="2" px="2" py="3">
                    <Text fontSize="xl" px="2">
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
                    {formatDistanceToNow(Date.parse(createdAt))} ago
                  </Text>
                </Link>
              </Flex>
            );
          } else if (type === "commented") {
            return (
              <Flex
                w={["100vw", "100vw", "45vw", "45vw"]}
                direction="column"
                key={_id}
                style={{
                  borderBottom: `1px solid ${themeColor[themeMode].border}`,
                }}
              >
                <Link to={`/post/${postId}`}>
                  <Flex direction="row" w="100%" mt="2" px="2" py="3">
                    <Text fontSize="xl" px="2">
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
                    {formatDistanceToNow(Date.parse(createdAt))} ago
                  </Text>
                </Link>
              </Flex>
            );
          } else if (type === "followed") {
            return (
              <Flex
                w={["100vw", "100vw", "45vw", "45vw"]}
                direction="column"
                key={_id}
                style={{
                  borderBottom: `1px solid ${themeColor[themeMode].border}`,
                }}
              >
                <Link to={`/timeline/${userName}`}>
                  <Flex direction="row" w="100%" mt="2" px="2" py="3">
                    <Text fontSize="2xl" px="2" color="teal">
                      <IoPersonCircle />
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
                    {formatDistanceToNow(Date.parse(createdAt))} ago
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
