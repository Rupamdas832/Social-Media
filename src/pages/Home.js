import { Avatar } from "@chakra-ui/avatar";
import { Image } from "@chakra-ui/image";
import { Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/layout";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { AiOutlineRetweet } from "react-icons/ai";
import { FaRegComment, FaRetweet } from "react-icons/fa";
import React from "react";
import { Spacer } from "@chakra-ui/layout";
import { Link } from "react-router-dom";

// Sample card from Airbnb

export const Home = () => {
  const property = {
    imageUrl: "https://bit.ly/2Z4KKcF",
    imageAlt: "Rear view of modern home with pool",
    beds: 3,
    baths: 2,
    title: "Modern home in city center in the heart of historic Los Angeles",
    formattedPrice: "$1,900.00",
    reviewCount: 34,
    rating: 4,
  };

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
      <Box
        maxW={["sm", "md", "xl", "xl"]}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        mt="5"
      >
        <Flex direction="row" p="2" align="center">
          <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
          <Flex ml="3" direction="column">
            <Text fontWeight="bold">Rupam Das</Text>
            <Text fontSize="sm">@rupamdas832</Text>
          </Flex>
        </Flex>
        <Box p="2">
          <Text>
            Modern home in city center in the heart of historic Los Angeles
          </Text>
        </Box>
        <Image src={property.imageUrl} alt={property.imageAlt} />
        <Flex
          w={["60%", "50%", "40%", "40%"]}
          direction="row"
          align="center"
          p="3"
          fontSize="xl"
        >
          <FcLike fontSize="2xl" />
          <Text fontSize="sm" ml="1">
            121
          </Text>
          <Spacer />
          <FaRegComment />
          <Text fontSize="sm" ml="1">
            23
          </Text>
          <Spacer />
          <AiOutlineRetweet />
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
          <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
          <Flex ml="3" direction="column">
            <Text fontWeight="bold">Peter Parkar</Text>
            <Text fontSize="sm">@realSpiderMan</Text>
          </Flex>
        </Flex>
        <Box p="2">
          <Text>
            Why not try something new today? Explore the #PanamaPapers data set
            with a #graphdatabase sandbox. Easy to get started with, friendly
            step-by-step guide, all free and no download required! #Neo4j
            #learning
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
          <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
          <Flex ml="3" direction="column">
            <Text fontWeight="bold">Tony Stark</Text>
            <Text fontSize="sm">@meIronMan</Text>
          </Flex>
        </Flex>
        <Box p="2">
          <Text>
            Why not try something new today? Explore the #PanamaPapers data set
            with a #graphdatabase sandbox. Easy to get started with, friendly
            step-by-step guide, all free and no download required! #Neo4j
            #learning
          </Text>
        </Box>
        <Image src={property.imageUrl} alt={property.imageAlt} />
        <Flex
          w={["60%", "50%", "40%", "40%"]}
          direction="row"
          align="center"
          p="3"
          fontSize="2xl"
        >
          <FcLike fontSize="2xl" />
          <Text fontSize="sm" ml="1">
            550
          </Text>
          <Spacer />
          <FaRegComment />
          <Text fontSize="sm" ml="1">
            56
          </Text>
          <Spacer />
          <FaRetweet style={{ color: "green" }} />
          <Text fontSize="sm" ml="1">
            42
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};
