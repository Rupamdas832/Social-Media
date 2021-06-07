import { Avatar } from "@chakra-ui/avatar";
import { Spacer } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoIosAddCircleOutline, IoIosSearch } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUserProfile } from "../features/user/userSlice";

export const Footer = () => {
  const { loggedInUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loadUserHandler = () => {
    dispatch(loadUserProfile({ userProfile: loggedInUser }));
    navigate(`/timeline/${loggedInUser.userName}`);
  };

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
      {loggedInUser && (
        <Flex direction="row" align="center" w={["100%", "100%", "60%", "60%"]}>
          <Link to="/">
            <AiOutlineHome />
          </Link>
          <Spacer />
          <Link to="/search">
            <IoIosSearch />
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
          <Avatar
            size="sm"
            name="Christian Nwamba"
            src={loggedInUser.profileImg}
            onClick={() => loadUserHandler()}
          />
        </Flex>
      )}
    </Flex>
  );
};
