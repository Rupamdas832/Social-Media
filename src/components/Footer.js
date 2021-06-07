import { Avatar } from "@chakra-ui/avatar";
import { Spacer } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import React, { useState } from "react";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { IoNotifications, IoNotificationsOutline } from "react-icons/io5";
import { IoIosAddCircle, IoIosAddCircleOutline } from "react-icons/io";
import { RiSearchFill, RiSearchLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUserProfile } from "../features/user/userSlice";

export const Footer = () => {
  const { loggedInUser } = useSelector((state) => state.user);

  const [route, setRoute] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loadUserHandler = () => {
    setRoute("");
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
          <Link to="/" onClick={() => setRoute("home")}>
            {route === "home" ? <AiFillHome /> : <AiOutlineHome />}
          </Link>
          <Spacer />
          <Link to="/search" onClick={() => setRoute("search")}>
            {route === "search" ? <RiSearchFill /> : <RiSearchLine />}
          </Link>
          <Spacer />
          <Link to="/compose" onClick={() => setRoute("compose")}>
            {route === "compose" ? (
              <IoIosAddCircle />
            ) : (
              <IoIosAddCircleOutline />
            )}
          </Link>
          <Spacer />
          <Link to="/notification" onClick={() => setRoute("notification")}>
            {route === "notification" ? (
              <IoNotifications />
            ) : (
              <IoNotificationsOutline />
            )}
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
