import React from "react"
import {Button, Center, Container, Flex, Icon, Link, Text, } from "@chakra-ui/react"
import { AiFillGithub, AiFillLinkedin} from "react-icons/ai"


const Footer = () => {
  return (
    <>
    <Container pt={40}>
      <Flex
      bottom="0"
      left="0"
      align="center"
      justify="space-between"
      position="absolute"
      wrap="wrap"
      w="100%"    
      bg="#56c2b0"
      p={8} 
      >
        <Link href='https://github.com/TWetmore/takehome-monthly-payment-calculator' >
          <Icon w={6} h={6} as={AiFillGithub}/>
        </Link>
      </Flex>
    </Container>
    </>
  )
}

export default Footer;