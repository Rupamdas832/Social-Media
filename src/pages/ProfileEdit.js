import {
  Textarea,
  Button,
  Image,
  Avatar,
  Box,
  Flex,
  Input,
  FormLabel,
  FormControl,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { GrAdd } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl } from "../api/ApiURL";
import { addUserDetails } from "../features/user/userSlice";

export const ProfileEdit = () => {
  const { loggedInUser, token } = useSelector((state) => state.user);
  const { themeMode, themeColor } = useSelector((state) => state.theme);

  const [name, setName] = useState(loggedInUser.name);
  const [bio, setBio] = useState(loggedInUser.bio);
  const [website, setWebsite] = useState(loggedInUser.website);
  const [profileImg, setProfileImg] = useState(loggedInUser.profileImg);
  const [coverImg, setCoverImg] = useState(loggedInUser.coverImg);

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

  const profileDetailHandler = async () => {
    try {
      const {
        status,
        data: { user },
      } = await axios.post(
        `${apiUrl}/user`,
        {
          bio: bio,
          website: website,
          profileImg: profileImg,
          coverImg: coverImg,
        },
        {
          headers: { Authorization: token },
        }
      );
      if (status === 201) {
        dispatch(addUserDetails(user));
        navigate(`/timeline/${loggedInUser.userName}`);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Flex
      w="100vw"
      minH="100vh"
      direction="row"
      align="center"
      justify="center"
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
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
        <Link to={`/timeline/${loggedInUser.userName}`}>
          <Button variant="ghost">Cancel</Button>
        </Link>
      </Flex>
    </Flex>
  );
};
