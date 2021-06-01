import { Avatar } from "@chakra-ui/avatar";
import { Spacer } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";

export const Footer = () => {
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
      p="3"
      borderTop="2px"
      borderColor="gray.300"
    >
      <Flex
        direction="row"
        align="center"
        p="2"
        w={["100%", "100%", "60%", "60%"]}
      >
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
          <Avatar
            size="sm"
            name="Christian Nwamba"
            src="https://bit.ly/code-beast"
          />
        </Link>
      </Flex>
    </Flex>
  );
};
