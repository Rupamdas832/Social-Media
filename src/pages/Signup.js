import { Button } from "@chakra-ui/button";
import { FormLabel } from "@chakra-ui/form-control";
import { FormControl } from "@chakra-ui/form-control";
import { Image } from "@chakra-ui/image";
import { InputGroup } from "@chakra-ui/input";
import { InputRightElement } from "@chakra-ui/input";
import { Input } from "@chakra-ui/input";
import { Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Photo from "../assets/Asset880.svg";

export const Signup = () => {
  const [userId, setUserId] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Flex
      w="100vw"
      h="100vh"
      direction="row"
      align="center"
      justify="center"
      position="relative"
      bg="white"
      zIndex="2"
    >
      <Flex
        display={["none", "none", "flex", "flex"]}
        w={["0vw", "0vw", "40vw", "40vw"]}
        h={["0vw", "0vw", "80vh", "80vh"]}
        mr="20"
      >
        <Image src={Photo} alt="Rear view of modern home with pool" />
      </Flex>
      <Flex direction="column" w={["100vw", "100vw", "40vw", "40vw"]} px="3">
        <Text fontSize="3xl" fontWeight="medium" fontFamily="cursive">
          Grader
        </Text>
        <Text my="3" fontSize="4xl" fontWeight="bold">
          Create an account
        </Text>
        <p>Signup with your Grader credentials to connect your account.</p>
        <FormControl px="2" mt="2">
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            placeholder="Enter name"
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl px="2" mt="2">
          <FormLabel>Email</FormLabel>
          <Input
            type="text"
            placeholder="Enter userId OR email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl px="2" mt="2">
          <FormLabel>UserId</FormLabel>
          <Input
            type="text"
            placeholder="Enter userId OR email"
            onChange={(e) => setUserId(e.target.value)}
          />
        </FormControl>
        <FormLabel px="2">Password</FormLabel>
        <InputGroup size="md" px="2" mt="2">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Link to="/getting-started">
          <Button colorScheme="teal" variant="solid" my="5" ml="2">
            Signup
          </Button>
        </Link>
        <Text>
          Already have an account! login{" "}
          <Link to="/login" style={{ color: "teal" }}>
            here
          </Link>
        </Text>
      </Flex>
    </Flex>
  );
};
