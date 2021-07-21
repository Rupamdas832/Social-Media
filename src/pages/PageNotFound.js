import React from "react";
import { Text, Flex, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const PageNotFound = () => {
  return (
    <Flex
      w="100vw"
      minH="100vh"
      direction="column"
      align="center"
      justify="center"
    >
      <Text fontSize="5xl" fontWeight="light">
        Error 404
      </Text>
      <Text marginY="3" fontSize="2xl" fontWeight="bold">
        Page Not Found
      </Text>
      <Link to="/">
        <Button colorScheme="teal">Redirect to Home</Button>
      </Link>
    </Flex>
  );
};
