import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { FormHelperText } from "@chakra-ui/form-control";
import { FormLabel } from "@chakra-ui/form-control";
import { FormControl } from "@chakra-ui/form-control";
import { Image } from "@chakra-ui/image";
import { Input } from "@chakra-ui/input";
import { Text } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const ProfileEdit = () => {
  const [name, setName] = useState("Rupam Das");
  const [bio, setBio] = useState(
    "Web Developer • JavaScript • React • Coding with neogcamp | Unreal Engine 4 • Game Design | Loves travelling"
  );
  const [website, setWebsite] = useState("https://rupamdasportfolio.com");

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
          <Avatar
            size="xl"
            name="Christian Nwamba"
            src="https://bit.ly/code-beast"
            mt="-5"
            border="2px"
            borderColor="white"
          />
        </Flex>
        <FormControl px="2" mt="2">
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl px="2" mt="2">
          <FormLabel>Bio</FormLabel>
          <Textarea value={bio} onChange={(e) => setBio(e.target.value)} />
        </FormControl>
        <FormControl px="2" mt="2">
          <FormLabel>Website</FormLabel>
          <Input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </FormControl>
        <Link to="/timeline">
          <Button colorScheme="teal" variant="solid" my="5">
            Save
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};
