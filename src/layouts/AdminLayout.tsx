import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Flex, Box, useColorModeValue } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const bg = useColorModeValue("gray.50", "gray.900");
  const contentBg = useColorModeValue("white", "gray.800");

  const { user, loading } = useAuth();
  if (loading) return <p>Loading session...</p>;
  if (user?.role !== "admin") return <Navigate to="/login" replace />;
  return (
    <Flex minH="100vh" bg={bg}>
      <Sidebar />

      <Flex flex="1" direction="column" ml="260px">
        <Navbar />

        <Box p={6} bg={contentBg} minH="calc(100vh - 64px)">
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

export default AdminLayout;
