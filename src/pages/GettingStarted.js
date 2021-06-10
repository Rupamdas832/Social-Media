import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GrAdd } from "react-icons/gr";
import axios from "axios";
import { addUserDetails } from "../features/user/userSlice";
import { useNavigate } from "react-router";

export const GettingStarted = () => {
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [profileImg, setProfileImg] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiItcLdyEroY3V8TFUW3tNjVCX5aNXBwKgAA&usqp=CAU"
  );
  const [coverImg, setCoverImg] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIu4v4dm223UFtdQXxFJ_jCpOn6LNKMsjfaw&usqp=CAU"
  );

  const { loggedInUser } = useSelector((state) => state.user);
  const { themeColor, themeMode } = useSelector((state) => state.theme);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const profileImgHandler = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "profileIMG");

    try {
      const { data, status } = await axios.post(
        "https://api.cloudinary.com/v1_1/rupamdas/image/upload",
        formData
      );
      if (status === 200) {
        setProfileImg(data.url);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const coverImgHandler = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "profileIMG");

    try {
      const { data, status } = await axios.post(
        "https://api.cloudinary.com/v1_1/rupamdas/image/upload",
        formData
      );
      if (status === 200) {
        setCoverImg(data.url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const profileDetailHandler = () => {
    const user = {
      userName: loggedInUser.userName,
      bio: bio,
      website: website,
      profileImg: profileImg,
      coverImg: coverImg,
    };
    dispatch(addUserDetails(user));
    navigate("/");
  };

  return (
    <Flex
      w="100vw"
      h="100vh"
      direction="row"
      align="center"
      justify="center"
      position="relative"
      zIndex="2"
      style={{
        backgroundColor: `${themeColor[themeMode].bg}`,
        color: `${themeColor[themeMode].color}`,
      }}
    >
      <Flex
        w={["100vw", "100vw", "45vw", "45vw"]}
        direction="column"
        align="center"
      >
        <Box h="150px" w="100%" position="relative">
          <FormLabel
            position="absolute"
            zIndex="3"
            fontSize="3xl"
            ml="14"
            mt="10"
            color="white"
          >
            <input
              type="file"
              style={{ display: "none" }}
              onChange={(e) => coverImgHandler(e.target.files[0])}
            />
            <Text color="white" fontSize="5xl" fontWeight="hairline">
              +
            </Text>
          </FormLabel>
          <Image
            src={coverImg}
            alt="Segun Adebayo"
            h="100%"
            w="100%"
            overflow
          />
        </Box>
        <Flex
          w="100%"
          direction="row"
          align="center"
          px="8"
          position="relative"
        >
          <FormLabel
            position="absolute"
            zIndex="3"
            fontSize="3xl"
            ml="8"
            mt="-2"
          >
            <input
              type="file"
              style={{ display: "none" }}
              onChange={(e) => profileImgHandler(e.target.files[0])}
            />
            <GrAdd />
          </FormLabel>
          <Avatar
            size="xl"
            name="Christian Nwamba"
            src={profileImg}
            mt="-5"
            border="2px"
            borderColor="white"
          />
        </Flex>
        <FormControl px="2" mt="2">
          <FormLabel>Name</FormLabel>
          <Input type="text" value={loggedInUser.name} readOnly />
        </FormControl>
        <FormControl px="2" mt="2">
          <FormLabel>Bio</FormLabel>
          <Textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            maxLength={120}
          />
          <Text color="gray.700" textAlign="right" mr="5">
            {120 - bio.length}
          </Text>
        </FormControl>
        <FormControl px="2" mt="2">
          <FormLabel>Website</FormLabel>
          <Input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </FormControl>
        <Button
          colorScheme="teal"
          variant="solid"
          my="5"
          onClick={() => profileDetailHandler()}
        >
          Save
        </Button>
        <Button variant="ghost" onClick={() => profileDetailHandler()}>
          Skip
        </Button>
      </Flex>
    </Flex>
  );
};
