import React from "react";
import { Container, HStack } from "@chakra-ui/react";
import { Username } from "./Username";
import { Login } from "./Login";
import { Logout } from "./Logout";

export const Home = () => {
  return (
    <Container>
      <Username />
      <HStack>
        <Login />
        <Logout />
      </HStack>
    </Container>
  );
};
