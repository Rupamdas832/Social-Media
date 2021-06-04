import { Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import { IoMdArrowRoundBack, IoMdPersonAdd } from "react-icons/io";
import React from "react";
import { Spacer } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { Link } from "react-router-dom";

export const Followers = () => {
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
        <Link to="/timeline">
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
            variant="outline"
            px="4"
            borderRadius="xl"
            fontSize="sm"
          >
            Follow
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
            name="Kola Tioluwani"
            src="https://bit.ly/tioluwani-kolawole"
          />
          <Text fontWeight="semibold" px="2">
            Kola Tioluwani
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
            name="Dan Abrahmov"
            src="https://bit.ly/dan-abramov"
          />
          <Text fontWeight="semibold" px="2">
            Elon Musk
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
    </Flex>
  );
};
