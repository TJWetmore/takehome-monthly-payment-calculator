import {Flex, Text } from "@chakra-ui/react";
import React from "react"

const Banner = () => {

  return (
    <Flex
      top="0"
      left="0"
      align="center"
      position="absolute"
      justify="space-between"
      wrap="wrap"
      w="100%"
      p={8}
      bg="#56c2b0"
    >
      <Text fontSize= {['auto','2xl']} textAlign='center'>Loan Repayment Calculator</Text>
    </Flex>

  );
};

export default Banner;