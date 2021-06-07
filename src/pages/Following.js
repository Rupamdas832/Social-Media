import { Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import React from "react";
import { Spacer } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack, IoMdPersonAdd } from "react-icons/io";
import { useSelector } from "react-redux";

export const Following = () => {
  const { userProfile } = useSelector((state) => state.user);
  return (
    <Flex
      w="100vw"
      direction="column"
      justify="center"
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
        <Link to={`/timeline/${userProfile.userName}`}>
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
      <Flex
        w={["100vw", "100vw", "40vw", "40vw"]}
        direction="column"
        align="center"
      >
        <Flex
          direction="row"
          align="center"
          w="100%"
          mt="2"
          px="2"
          py="3"
          border="1px"
          borderColor="gray.200"
        >
          <Avatar
            size="sm"
            name="Kent Dodds"
            src="https://bit.ly/kent-c-dodds"
          />
          <Text fontWeight="semibold" px="2">
            Peter Parker
          </Text>
          <Spacer />
          <Button
            colorScheme="teal"
            variant="solid"
            px="2"
            borderRadius="xl"
            fontSize="sm"
          >
            Following
          </Button>
        </Flex>
      </Flex>

      <Flex
        w={["100vw", "100vw", "40vw", "40vw"]}
        direction="column"
        align="center"
      >
        <Flex
          direction="row"
          align="center"
          w="100%"
          mt="2"
          px="2"
          py="3"
          border="1px"
          borderColor="gray.200"
        >
          <Avatar
            size="sm"
            name="Prosper Otemuyiwa"
            src="https://bit.ly/prosper-baba"
          />
          <Text fontWeight="semibold" px="2">
            Samay Raina
          </Text>
          <Spacer />
          <Button
            colorScheme="teal"
            variant="solid"
            px="2"
            borderRadius="xl"
            fontSize="sm"
          >
            Following
          </Button>
        </Flex>
      </Flex>
      <Flex
        w={["100vw", "100vw", "40vw", "40vw"]}
        direction="column"
        align="center"
      ></Flex>
    </Flex>
  );
};
