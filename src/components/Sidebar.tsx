import { Box, VStack, Text, Flex, useColorModeValue } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingCart, Users } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const bg = useColorModeValue("white", "gray.900");
  const border = useColorModeValue("gray.200", "whiteAlpha.200");
  const hoverBg = useColorModeValue("gray.100", "whiteAlpha.100");

  const menu = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Products", path: "/products", icon: Package },
    { name: "Orders", path: "/orders", icon: ShoppingCart },
    { name: "Users", path: "/users", icon: Users },
  ];

  return (
    <Box
      w="250px"
      h="100vh"
      bg={bg}
      borderRight="1px solid"
      borderColor={border}
      p={5}
    >
      <Text fontSize="2xl" fontWeight="bold" mb={8} color="purple.500">
        Admin Panel
      </Text>

      <VStack align="stretch" spacing={2}>
        {menu.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link key={item.name} to={item.path}>
              <Flex
                align="center"
                gap={3}
                p={3}
                borderRadius="lg"
                bg={isActive ? "purple.500" : "transparent"}
                color={isActive ? "white" : "inherit"}
                _hover={{ bg: isActive ? "purple.600" : hoverBg }}
                transition="0.2s"
              >
                <Icon size={18} />
                {item.name}
              </Flex>
            </Link>
          );
        })}
      </VStack>
    </Box>
  );
};

export default Sidebar;
