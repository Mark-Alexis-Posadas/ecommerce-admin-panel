import {
  Box,
  Heading,
  Input,
  Button,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";

const Settings = () => {
  const bg = useColorModeValue("white", "gray.800");

  return (
    <Box>
      <Heading size="md" mb={6}>
        Settings
      </Heading>

      <Box bg={bg} p={6} borderRadius="xl" borderWidth="1px">
        <VStack spacing={4} align="stretch">
          <Input placeholder="Store Name" />
          <Input placeholder="Email" />
          <Input placeholder="Phone" />
          <Input placeholder="Shipping Fee" type="number" />

          <Button colorScheme="purple">Save Settings</Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default Settings;
