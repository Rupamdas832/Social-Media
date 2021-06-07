import { Text, Flex, Avatar, Button, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadUserProfile } from "../features/user/userSlice";

export const Search = () => {
  const { usersList } = useSelector((state) => state.user);

  const [userSearch, setUserSearch] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loadUserProfileHandler = (user) => {
    dispatch(loadUserProfile({ userProfile: user }));
    navigate(`/timeline/${user.userName}`);
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
      <Flex direction="row">
        <Input
          type="text"
          onChange={(e) => setUserSearch(e.target.value)}
          w={["65vw", "65vw", "30vw", "30vw"]}
        />
        <Button>Search</Button>
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
            onClick={() => loadUserProfileHandler(user)}
          >
            <Flex direction="row" w="100%" mt="2" px="2" py="3">
              <Avatar size="md" name="Kent Dodds" src={profileImg} />
              <Flex direction="column">
                <Text fontWeight="bold" px="2">
                  {name}
                </Text>
                <Text color="gray.500" px="2">
                  {userName}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
};
