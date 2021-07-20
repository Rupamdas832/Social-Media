import { Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import { IoMdArrowRoundBack, IoMdPersonAdd } from "react-icons/io";
import React from "react";
import { Spacer } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { followUserHandler } from "../features/user/followUserHandler";

export const Following = () => {
  const { userProfile, loggedInUser, token } = useSelector(
    (state) => state.user
  );
  const { themeColor, themeMode } = useSelector((state) => state.theme);

  const dispatch = useDispatch();

  const { userNameFromParam } = useParams();

  return (
    <Flex
      w="100vw"
      minH="100vh"
      direction="column"
      align="center"
      position="relative"
      pt="20"
      pb="20"
    >
      <Flex
        direction="row"
        align="center"
        w={["100vw", "100vw", "40vw", "40vw"]}
        my="2"
        px="2"
      >
        <Link to={`/timeline/${userNameFromParam}`}>
          <Button variant="ghost" fontSize="xl">
            <IoMdArrowRoundBack />
          </Button>
        </Link>
        <Spacer />
        <Text fontSize="lg" fontWeight="semibold">
          Following
        </Text>
        <Spacer />
        <Button variant="ghost" fontSize="xl">
          <IoMdPersonAdd />
        </Button>
      </Flex>
      {userProfile.following.length === 0 ? (
        <Text mt="5" color="gray.500">
          No Following
        </Text>
      ) : (
        userProfile.following.map((user) => {
          const { name, userName, profileImg, _id, userId } = user;
          const isFollowing = loggedInUser.following.find(
            (user) => user.userName === userName
          );
          return (
            <Flex
              w={["100vw", "100vw", "40vw", "40vw"]}
              direction="column"
              align="center"
              style={{
                borderBottom: `1px solid ${themeColor[themeMode].border}`,
              }}
              key={_id}
            >
              <Flex
                direction="row"
                align="center"
                w="100%"
                mt="2"
                px="2"
                py="3"
              >
                <Link to={`/timeline/${userName}`}>
                  <Avatar size="sm" name={name} src={profileImg} />
                </Link>
                <Flex direction="column" px="2">
                  <Text fontWeight="semibold">{name}</Text>
                  <Text color="gray.500" fontWeight="light">
                    @{userName}
                  </Text>
                </Flex>
                <Spacer />
                {isFollowing === undefined ? (
                  <>
                    {userName === loggedInUser.userName ? null : (
                      <Button
                        colorScheme="teal"
                        variant="outline"
                        px="4"
                        borderRadius="xl"
                        fontSize="sm"
                        onClick={() =>
                          followUserHandler(
                            userId,
                            loggedInUser,
                            token,
                            dispatch
                          )
                        }
                      >
                        Follow
                      </Button>
                    )}
                  </>
                ) : (
                  <Button
                    colorScheme="teal"
                    variant="outline"
                    px="4"
                    borderRadius="xl"
                    fontSize="sm"
                  >
                    Following
                  </Button>
                )}
              </Flex>
            </Flex>
          );
        })
      )}
    </Flex>
  );
};
