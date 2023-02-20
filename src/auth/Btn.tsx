import React from "react";
import { Button, useTheme, Theme } from "@chakra-ui/react";

export const Btn = () => {
  const { colors } = useTheme<Theme>();
  return <Button fontSize="6xl">Btn</Button>;
};
