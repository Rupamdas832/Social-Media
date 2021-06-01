import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { FormLabel } from "@chakra-ui/form-control";
import { FormControl } from "@chakra-ui/form-control";
import { Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import React from "react";
import { Link } from "react-router-dom";

export const ComposePost = () => {
  return (
    <Flex
      w="100vw"
      direction="column"
      align="center"
      position="relative"
      pt="16"
      pb="20"
    >
      <Flex
        w={["100vw", "100vw", "45vw", "45vw"]}
        direction="column"
        mt="5"
        px="2"
      >
        <Flex direction="row" w="100%">
          <Avatar
            size="md"
            name="Christian Nwamba"
            src="https://bit.ly/code-beast"
            border="2px"
            borderColor="white"
          />
          <FormControl px="2" size="xl">
            <FormLabel>Compose new post</FormLabel>
            <Textarea placeholder="Whats on your mind type it up?" h="250px" />
          </FormControl>
        </Flex>
        <Button colorScheme="teal" variant="solid" my="5">
          Post
        </Button>
      </Flex>
    </Flex>
  );
};
