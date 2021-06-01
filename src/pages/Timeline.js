import { Avatar } from "@chakra-ui/avatar";
import { Image } from "@chakra-ui/image";
import { Spacer } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { AiOutlineRetweet } from "react-icons/ai";
import { FaRegComment, FaRetweet } from "react-icons/fa";
import React, { useEffect } from "react";
import { Divider } from "@chakra-ui/layout";

export const Timeline = () => {
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
        <Box h="150px" w="100%" bg="red.200">
          <Image
            src="https://images.unsplash.com/photo-1620825937374-87fc7d6bddc2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fGNvZGVyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            alt="Segun Adebayo"
            h="100%"
            w="100%"
            overflow
          />
        </Box>
        <Flex w="100%" direction="row" align="center" px="8">
          <Flex direction="column" align="center">
            <Text fontWeight="bold" fontSize="lg">
              999
            </Text>
            <Text fontSize="sm">Followers</Text>
          </Flex>
          <Spacer />
          <Avatar
            size="xl"
            name="Christian Nwamba"
            src="https://bit.ly/code-beast"
            mt="-5"
            border="2px"
            borderColor="white"
          />
          <Spacer />
          <Flex direction="column" align="center">
            <Text fontWeight="bold" fontSize="lg">
              2
            </Text>
            <Text fontSize="sm">Following</Text>
          </Flex>
        </Flex>
        <Flex direction="row" my="5">
          <Text fontWeight="medium" fontSize="lg">
            Rupam Das{" "}
          </Text>
          <Text mx="2">|</Text>
          <Text fontWeight="medium" fontSize="lg">
            @rupamdas832
          </Text>
        </Flex>
        <Flex px="3" my="5">
          <Text>
            Web Developer • JavaScript • React • Coding with @neogcamp • |
            Unreal Engine 4 • Game Design | Loves travelling
          </Text>
        </Flex>
        <Divider />
        <Box
          maxW={["sm", "md", "xl", "xl"]}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          mt="5"
        >
          <Flex direction="row" p="2" align="center">
            <Avatar name="Ryan Florence" src="https://bit.ly/code-beast" />
            <Flex ml="3" direction="column">
              <Text fontWeight="bold">Rupam Das</Text>
              <Text fontSize="sm">@rupamdas832</Text>
            </Flex>
          </Flex>
          <Box p="2">
            <Text>
              Why not try something new today? Explore the #PanamaPapers data
              set with a #graphdatabase sandbox. Easy to get started with,
              friendly step-by-step guide, all free and no download required!
              #Neo4j #learning
            </Text>
          </Box>
          <Flex
            w={["60%", "50%", "40%", "40%"]}
            direction="row"
            align="center"
            p="3"
            fontSize="2xl"
          >
            <FcLikePlaceholder fontSize="2xl" />
            <Text fontSize="sm" ml="1">
              121
            </Text>
            <Spacer />
            <FaRegComment />
            <Text fontSize="sm" ml="1">
              23
            </Text>
            <Spacer />
            <FaRetweet style={{ color: "green" }} />
            <Text fontSize="sm" ml="1">
              4
            </Text>
          </Flex>
        </Box>

        <Box
          maxW={["sm", "md", "xl", "xl"]}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          mt="5"
        >
          <Flex direction="row" p="2" align="center">
            <Avatar name="Ryan Florence" src="https://bit.ly/code-beast" />
            <Flex ml="3" direction="column">
              <Text fontWeight="bold">Rupam Das</Text>
              <Text fontSize="sm">@rupamdas832</Text>
            </Flex>
          </Flex>
          <Box p="2">
            <Text>
              Set with a #graphdatabase sandbox. Easy to get started with,
              friendly step-by-step guide, all free and no download required!
              #Neo4j #learning.Got it!
            </Text>
            <Text>
              Why not try something new today? Explore the #PanamaPapers data
              set with a #graphdatabase sandbox. Easy to get started with,
              friendly step-by-step guide, all free and no download required!
              #Neo4j #learning
            </Text>
          </Box>
          <Flex
            w={["60%", "50%", "40%", "40%"]}
            direction="row"
            align="center"
            p="3"
            fontSize="2xl"
          >
            <FcLikePlaceholder fontSize="2xl" />
            <Text fontSize="sm" ml="1">
              121
            </Text>
            <Spacer />
            <FaRegComment />
            <Text fontSize="sm" ml="1">
              23
            </Text>
            <Spacer />
            <FaRetweet style={{ color: "green" }} />
            <Text fontSize="sm" ml="1">
              4
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};
