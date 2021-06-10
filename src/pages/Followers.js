import { Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import { IoMdArrowRoundBack, IoMdPersonAdd } from "react-icons/io";
import React from "react";
import { Spacer } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export const Followers = () => {
  const { usersList, loggedInUser } = useSelector((state) => state.user);
  const { themeColor, themeMode } = useSelector((state) => state.theme);

  const { userNameFromParam } = useParams();

  const { followers } = usersList.find(
    (user) => user.userName === userNameFromParam
  );

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
          Followers
        </Text>
        <Spacer />
        <Button variant="ghost" fontSize="xl">
          <IoMdPersonAdd />
        </Button>
      </Flex>
      {followers.length === 0 ? (
        <Text mt="5" color="gray.500">
          No Followers
        </Text>
      ) : (
        followers.map((user) => {
          const { name, userName, profileImg, _id } = user;
          return (
            <Flex
              w={["100vw", "100vw", "40vw", "40vw"]}
              direction="column"
              align="center"
              key={_id}
              style={{
                borderBottom: `1px solid ${themeColor[themeMode].border}`,
              }}
            >
              <Flex
                direction="row"
                align="center"
                w="100%"
                mt="2"
                px="2"
                py="3"
              >
                <Avatar size="sm" name="Prosper Otemuyiwa" src={profileImg} />
                <Flex direction="column" px="2">
                  <Text fontWeight="semibold">{name}</Text>
                  <Text color="gray.500" fontWeight="light">
                    @{userName}
                  </Text>
                </Flex>

                <Spacer />
                <Button
                  colorScheme="teal"
                  variant="outline"
                  px="4"
                  borderRadius="xl"
                  fontSize="sm"
                >
                  Follow
                </Button>
              </Flex>
            </Flex>
          );
        })
      )}
    </Flex>
  );
};
