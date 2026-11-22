import {Box,Flex,Text,Container} from '@chakra-ui/react';
import {ShoppingBag} from 'lucide-react';
import type {ReactNode} from 'react';
export default function AuthLayout({children}:{children:ReactNode}) {
  return <Flex minH="100dvh" bg="#f6f7fb" color="gray.900" align="center" justify="center" px={{base:5,sm:8}} py={{base:10,md:16}}>
    <Container maxW="460px" p={0}>
      <Flex justify="center" align="center" gap={3} mb={8}><Flex w="42px" h="42px" bg="purple.600" color="white" align="center" justify="center" borderRadius="xl"><ShoppingBag size={23} aria-hidden="true"/></Flex><Text fontSize="2xl" fontWeight="700" letterSpacing="tight">ShopZone<Box as="span" color="purple.600">.</Box></Text></Flex>
      <Box as="main" bg="white" border="1px solid" borderColor="gray.200" borderRadius="2xl" px={{base:6,sm:10}} py={{base:8,sm:10}} boxShadow="0 8px 24px rgba(15,23,42,0.03)">{children}</Box>
      <Text mt={6} textAlign="center" fontSize="xs" color="gray.500">ShopZone administration &middot; Authorized access only</Text>
    </Container>
  </Flex>;
}
