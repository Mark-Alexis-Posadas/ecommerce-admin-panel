import { Box, Flex, Text } from '@chakra-ui/react';
import { ShoppingBag, LockKeyhole } from 'lucide-react';
import type { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Flex minH="100dvh" direction="column" bg="#f5f6fa" color="gray.900">
      <Flex
        as="header"
        align="center"
        justify="space-between"
        gap={4}
        px={{ base: 6, md: 10 }}
        py={6}
      >
        <Flex align="center" gap={2.5}>
          <ShoppingBag size={25} color="#6366f1" aria-hidden="true" />
          <Text fontSize="xl" fontWeight="800" letterSpacing="tight">
            ShopZone
            <Box as="span" color="purple.600">
              .
            </Box>
          </Text>
        </Flex>
        <Text
          fontSize="10px"
          fontWeight="600"
          letterSpacing="0.12em"
          textTransform="uppercase"
          color="gray.500"
        >
          Administration
        </Text>
      </Flex>
      <Flex
        flex="1"
        align="center"
        justify="center"
        px={{ base: 5, sm: 8 }}
        py={{ base: 6, md: 10 }}
      >
        <Box
          as="main"
          w="full"
          maxW="440px"
          bg="white"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="2xl"
          px={{ base: 6, sm: 10 }}
          py={{ base: 8, sm: 10 }}
          boxShadow="0 12px 40px -20px rgba(15,23,42,0.18)"
        >
          {children}
        </Box>
      </Flex>
      <Flex as="footer" justify="center" align="center" gap={2} px={5} py={7} color="gray.500">
        <LockKeyhole size={13} aria-hidden="true" />
        <Text textAlign="center" fontSize="xs">
          Private workspace. Authorized store staff only.
        </Text>
      </Flex>
    </Flex>
  );
}
