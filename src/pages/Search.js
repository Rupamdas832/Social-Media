import { Text, Flex, Avatar, Button, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Search = () => {
  const { usersList } = useSelector((state) => state.user);

  const [userSearch, setUserSearch] = useState();

  return (
    <Flex
      w="100vw"
      minH="100vh"
      direction="column"
      align="center"
      position="relative"
      pt="16"
      pb="20"
    >
      <Flex direction="row" my="3">
        <Input
          type="text"
          onChange={(e) => setUserSearch(e.target.value)}
          placeholder="Search with userName"
          w={["65vw", "65vw", "30vw", "30vw"]}
        />
        <Button variant="outline">Search</Button>
      </Flex>
      {usersList.map((user) => {
        const { profileImg, name, userName, _id } = user;
        return (
          <Flex
            w={["100vw", "100vw", "45vw", "45vw"]}
            direction="column"
            border="1px"
            borderColor="gray.200"
            key={_id}
          >
            <Link to={`/timeline/${userName}`}>
              <Flex direction="row" w="100%" mt="2" px="2" py="3">
                <Avatar size="md" name="Kent Dodds" src={profileImg} />
                <Flex direction="column">
                  <Text fontWeight="bold" px="2">
                    {name}
                  </Text>
                  <Text color="gray.500" px="2">
                    @{userName}
                  </Text>
                </Flex>
              </Flex>
            </Link>
          </Flex>
        );
      })}
    </Flex>
  );
};
