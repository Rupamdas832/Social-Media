import { Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import { FcLike } from "react-icons/fc";
import { CgProfile } from "react-icons/cg";
import { FaRegComment, FaRetweet } from "react-icons/fa";
import React from "react";
import { Spacer } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/avatar";

export const Notification = () => {
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
      <Flex
        w={["100vw", "100vw", "45vw", "45vw"]}
        direction="column"
        align="center"
      >
        <Flex
          direction="row"
          w="100%"
          mt="2"
          px="2"
          py="3"
          border="1px"
          borderColor="gray.200"
        >
          <Text fontSize="2xl" px="2">
            <FcLike />
          </Text>
          <Avatar
            size="sm"
            name="Kent Dodds"
            src="https://bit.ly/kent-c-dodds"
          />
          <Text fontWeight="semibold" px="2">
            Peter Parker
          </Text>
          <Text>liked your post</Text>
        </Flex>
      </Flex>

      <Flex
        w={["100vw", "100vw", "45vw", "45vw"]}
        direction="column"
        align="center"
      >
        <Flex
          direction="row"
          w="100%"
          mt="2"
          px="2"
          py="3"
          border="1px"
          borderColor="gray.200"
        >
          <Text fontSize="2xl" px="2">
            <FcLike />
          </Text>
          <Avatar
            size="sm"
            name="Prosper Otemuyiwa"
            src="https://bit.ly/prosper-baba"
          />
          <Text fontWeight="semibold" px="2">
            Samay Raina
          </Text>
          <Text>liked your post</Text>
        </Flex>
      </Flex>
      <Flex
        w={["100vw", "100vw", "45vw", "45vw"]}
        direction="column"
        align="center"
      >
        <Flex
          direction="row"
          w="100%"
          mt="2"
          px="2"
          py="3"
          border="1px"
          borderColor="gray.200"
        >
          <Text fontSize="2xl" px="2">
            <FaRegComment />
          </Text>
          <Avatar
            size="sm"
            name="Kola Tioluwani"
            src="https://bit.ly/tioluwani-kolawole"
          />
          <Text fontWeight="semibold" px="2">
            Kola Tioluwani
          </Text>
          <Text>commented on your post</Text>
        </Flex>
      </Flex>
      <Flex
        w={["100vw", "100vw", "45vw", "45vw"]}
        direction="column"
        align="center"
      >
        <Flex
          direction="row"
          w="100%"
          mt="2"
          px="2"
          py="3"
          border="1px"
          borderColor="gray.200"
        >
          <Text fontSize="2xl" px="2">
            <CgProfile />
          </Text>
          <Avatar
            size="sm"
            name="Dan Abrahmov"
            src="https://bit.ly/dan-abramov"
          />
          <Text fontWeight="semibold" px="2">
            Elon Musk
          </Text>
          <Text>followed you</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
