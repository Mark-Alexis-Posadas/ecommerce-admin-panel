import { useAuth } from '../hooks/useAuth';
import { Flex, Text, Button, IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { Moon, Sun } from 'lucide-react';

const Navbar = () => {
  const { logout } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('white', 'gray.900');
  const border = useColorModeValue('gray.200', 'whiteAlpha.200');

  return (
    <Flex
      h="64px"
      bg={bg}
      borderBottom="1px solid"
      borderColor={border}
      align="center"
      justify="space-between"
      px={6}
    >
      <Text fontWeight="semibold" fontSize="lg">
        Dashboard
      </Text>

      <Flex align="center" gap={3}>
        {/* 🌙 Dark Mode Toggle */}
        <IconButton
          aria-label="toggle theme"
          onClick={toggleColorMode}
          icon={colorMode === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        />

        <Button onClick={logout} colorScheme="purple">
          Logout
        </Button>
      </Flex>
    </Flex>
  );
};

export default Navbar;
