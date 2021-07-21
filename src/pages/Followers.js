import { IoMdArrowRoundBack, IoMdPersonAdd } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { followUserHandler } from "../features/user/followUserHandler";
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  Text,
  Flex,
  Spacer,
  Avatar,
  Button,
  useToast,
} from "@chakra-ui/react";
import { loadUsersList } from "../features/user/userSlice";
import { unFollowUserHandler } from "../features/user/unFollowUserHandler";

export const Followers = () => {
  const [selectedUser, setSelectedUser] = useState({});

  const { token, loggedInUser, usersList } = useSelector((state) => state.user);
  const { themeColor, themeMode } = useSelector((state) => state.theme);

  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const { userNameFromParam } = useParams();

  const userProfile = usersList.find(
    (user) => user.userName === userNameFromParam
  );

  const openUnfollowModal = (user) => {
    setSelectedUser(user);
    onOpen();
  };

  useEffect(() => {
    dispatch(loadUsersList());
  }, []);

  return (
    <Flex
      w="100vw"
      minH="100vh"
      direction="column"
      align="center"
      position="relative"
      pt="20"
      pb="20"
    >
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex direction="row">
              <Text>Unfollow</Text>
              <Text fontWeight="bold" marginLeft="3">
                @{selectedUser.userName}
              </Text>
            </Flex>
          </ModalHeader>

          <ModalCloseButton />
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="teal"
              onClick={() =>
                unFollowUserHandler(
                  selectedUser.userId,
                  onClose,
                  token,
                  dispatch,
                  toast
                )
              }
            >
              Unfollow
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex
        direction="row"
        align="center"
        w={["100vw", "100vw", "40vw", "40vw"]}
        my="2"
        px="2"
      >
        <Link to={`/timeline/${userNameFromParam}`}>
          <Button variant="ghost" fontSize="xl">
            <IoMdArrowRoundBack />
          </Button>
        </Link>
        <Spacer />
        <Text fontSize="lg" fontWeight="semibold">
          Followers
        </Text>
        <Spacer />
        <Button variant="ghost" fontSize="xl">
          <IoMdPersonAdd />
        </Button>
      </Flex>
      {userProfile === undefined ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      ) : (
        <Flex direction="column">
          {userProfile.followers.length === 0 ? (
            <Text mt="5" color="gray.500">
              No Followers
            </Text>
          ) : (
            userProfile.followers.map((user) => {
              const { name, userName, profileImg, _id, userId } = user;
              const isFollowing = loggedInUser.following.find(
                (user) => user.userName === userName
              );
              return (
                <Flex
                  w={["100vw", "100vw", "40vw", "40vw"]}
                  direction="column"
                  align="center"
                  key={_id}
                  style={{
                    borderBottom: `1px solid ${themeColor[themeMode].border}`,
                  }}
                >
                  <Flex
                    direction="row"
                    align="center"
                    w="100%"
                    mt="2"
                    px="2"
                    py="3"
                  >
                    <Link to={`/timeline/${userName}`}>
                      <Flex direction="row" align="center">
                        <Avatar size="sm" name={name} src={profileImg} />

                        <Flex direction="column" px="2">
                          <Text fontWeight="semibold">{name}</Text>
                          <Text color="gray.500" fontWeight="light">
                            @{userName}
                          </Text>
                        </Flex>
                      </Flex>
                    </Link>
                    <Spacer />
                    {isFollowing === undefined ? (
                      <Flex>
                        {userName === loggedInUser.userName ? null : (
                          <Button
                            colorScheme="teal"
                            variant="outline"
                            px="4"
                            borderRadius="xl"
                            fontSize="sm"
                            onClick={() =>
                              followUserHandler(
                                userId,
                                loggedInUser,
                                token,
                                dispatch,
                                toast
                              )
                            }
                          >
                            Follow
                          </Button>
                        )}
                      </Flex>
                    ) : (
                      <Button
                        colorScheme="teal"
                        variant="outline"
                        px="4"
                        borderRadius="xl"
                        fontSize="sm"
                        onClick={() => openUnfollowModal(user)}
                      >
                        Following
                      </Button>
                    )}
                  </Flex>
                </Flex>
              );
            })
          )}
        </Flex>
      )}
    </Flex>
  );
};
