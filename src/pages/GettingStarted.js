import { Button } from "@chakra-ui/button";
import { Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import React from "react";
import { Link } from "react-router-dom";

export const GettingStarted = () => {
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
      <Text> Getting Started</Text>
      <Link to="/">
        <Button colorScheme="teal" variant="solid">
          Done
        </Button>
      </Link>
    </Flex>
  );
};
