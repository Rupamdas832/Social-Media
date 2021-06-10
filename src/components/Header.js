import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Spacer } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import { MenuList } from "@chakra-ui/menu";
import { MenuItem } from "@chakra-ui/menu";
import { MenuButton } from "@chakra-ui/menu";
import { Menu } from "@chakra-ui/menu";
import { Switch } from "@chakra-ui/switch";
import React, { useEffect, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleThemeMode } from "../features/theme/themeSlice";
import { logoutUser } from "../features/user/userSlice";

export const Header = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const { themeMode, themeColor } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    if (isDarkTheme) {
      dispatch(toggleThemeMode("dark"));
    } else {
      dispatch(toggleThemeMode("light"));
    }
  }, [isDarkTheme]);

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
      style={{
        backgroundColor: `${themeColor[themeMode].bg}`,
        color: `${themeColor[themeMode].color}`,
      }}
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
          <MenuButton
            as={Button}
            style={{
              backgroundColor: `${themeColor[themeMode].bg}`,
              color: `${themeColor[themeMode].color}`,
            }}
          >
            <IoSettingsOutline />
          </MenuButton>
          <MenuList>
            <Link to="/settings/profile">
              <MenuItem
                style={{
                  backgroundColor: `${themeColor[themeMode].bg}`,
                  color: `${themeColor[themeMode].color}`,
                }}
              >
                Edit Profile
              </MenuItem>
            </Link>
            <MenuItem
              style={{
                backgroundColor: `${themeColor[themeMode].bg}`,
                color: `${themeColor[themeMode].color}`,
              }}
            >
              <Text>{isDarkTheme ? "Dark" : "Light"}</Text>
              <Switch
                ml="3"
                isChecked={isDarkTheme}
                onChange={() => setIsDarkTheme(!isDarkTheme)}
              />
            </MenuItem>
            <Link to="/login">
              <MenuItem
                onClick={() => logoutHandler()}
                style={{
                  backgroundColor: `${themeColor[themeMode].bg}`,
                  color: `${themeColor[themeMode].color}`,
                }}
              >
                Logout
              </MenuItem>
            </Link>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};
