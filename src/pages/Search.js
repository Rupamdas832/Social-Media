import { Text, Flex, Avatar, Input, Spinner } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadUsersList, updateUserSearch } from "../features/user/userSlice";

export const Search = () => {
  const { usersList, usersListStatus, search } = useSelector(
    (state) => state.user
  );
  const { themeColor, themeMode } = useSelector((state) => state.theme);

  const dispatch = useDispatch();

  const compare = ({ name, userName }, search) => {
    return (
      name.toLowerCase().includes(search) ||
      userName.toLowerCase().includes(search)
    );
  };

  const searchedUser = usersList.filter((user) =>
    compare(user, search.toLowerCase())
  );

  useEffect(() => {
    if (usersListStatus === "idle") {
      dispatch(loadUsersList());
    }
  }, []);

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
          onChange={(e) =>
            dispatch(updateUserSearch({ search: e.target.value }))
          }
          placeholder="Search with name OR userName"
          w={["65vw", "65vw", "30vw", "30vw"]}
        />
      </Flex>
      {usersList === null ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      ) : (
        <>
          {searchedUser.map((user) => {
            const { profileImg, name, userName, _id } = user;
            return (
              <Flex
                w={["100vw", "100vw", "45vw", "45vw"]}
                direction="column"
                key={_id}
                style={{
                  borderBottom: `1px solid ${themeColor[themeMode].border}`,
                }}
              >
                <Link to={`/timeline/${userName}`}>
                  <Flex direction="row" w="100%" mt="2" px="2" py="3">
                    <Avatar size="md" name={name} src={profileImg} />
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
        </>
      )}
    </Flex>
  );
};
