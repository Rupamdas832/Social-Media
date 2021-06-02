import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Spacer } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import { MenuList } from "@chakra-ui/menu";
import { MenuItem } from "@chakra-ui/menu";
import { MenuButton } from "@chakra-ui/menu";
import { Menu } from "@chakra-ui/menu";
import React from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../features/user/userSlice";

export const Header = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutUser());
  };
  return (
    <Flex
      justify="center"
      align="center"
      position="fixed"
      w="100vw"
      bg="white"
      zIndex="2"
      borderBottom="2px"
      borderColor="gray.200"
    >
      <Flex
        direction="row"
        align="center"
        p="2"
        w={["100%", "100%", "60%", "60%"]}
      >
        <Box>
          <Text fontSize="3xl" fontWeight="medium" fontFamily="cursive">
            Grader
          </Text>
        </Box>
        <Spacer />
        <Menu>
          <MenuButton as={Button}>
            <IoSettingsOutline />
          </MenuButton>
          <MenuList>
            <Link to="/settings/profile">
              <MenuItem>Edit Profile</MenuItem>
            </Link>
            <MenuItem>Theme</MenuItem>
            <Link to="/login">
              <MenuItem onClick={() => logoutHandler()}>Logout</MenuItem>
            </Link>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};
