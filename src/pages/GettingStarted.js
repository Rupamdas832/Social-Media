import { Button } from "@chakra-ui/button";
import React from "react";
import { Link } from "react-router-dom";

export const GettingStarted = () => {
  return (
    <div>
      <Link to="/">
        <Button colorScheme="teal" variant="solid">
          Login
        </Button>
      </Link>
    </div>
  );
};
