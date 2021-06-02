import { Avatar } from "@chakra-ui/avatar";
import { Spacer } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const Footer = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <Flex
      w="100vw"
      direction="row"
      align="center"
      justify="center"
      position="fixed"
      bottom="0"
      bg="white"
      fontSize="2xl"
      py="1"
      px="4"
      borderTop="2px"
      borderColor="gray.300"
    >
      {user && (
        <Flex direction="row" align="center" w={["100%", "100%", "60%", "60%"]}>
          <Link to="/">
            <AiOutlineHome />
          </Link>
          <Spacer />
          <Link to="/compose">
            <IoIosAddCircleOutline />
          </Link>
          <Spacer />
          <Link to="/notification">
            <IoNotificationsOutline />
          </Link>
          <Spacer />
          <Link to="/timeline">
            <Avatar size="sm" name="Christian Nwamba" src={user.profileImg} />
          </Link>
        </Flex>
      )}
    </Flex>
  );
};
