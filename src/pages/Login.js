import { Button } from "@chakra-ui/button";
import { Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import React from "react";
import { Link } from "react-router-dom";

export const Login = () => {
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
      <Text> Login</Text>
      <Link to="/">
        <Button>Home</Button>
      </Link>
      <Link to="/signup">
        <Button>Signup</Button>
      </Link>
    </Flex>
  );
};
