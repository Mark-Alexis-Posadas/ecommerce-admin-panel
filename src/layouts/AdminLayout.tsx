import { Flex, Box, useColorModeValue } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const bg = useColorModeValue("gray.50", "gray.900");
  const contentBg = useColorModeValue("white", "gray.800");

  return (
    <Flex minH="100vh" bg={bg}>
      <Sidebar />

      <Flex flex="1" direction="column">
        <Navbar />

        <Box p={6} bg={contentBg} minH="calc(100vh - 64px)">
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

export default AdminLayout;
