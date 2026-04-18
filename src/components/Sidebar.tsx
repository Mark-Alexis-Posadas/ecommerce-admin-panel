import {
  Box,
  VStack,
  Text,
  Flex,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tag,
  Percent,
  BarChart3,
  Settings,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const bg = useColorModeValue("white", "gray.900");
  const border = useColorModeValue("gray.200", "whiteAlpha.200");
  const hoverBg = useColorModeValue("gray.100", "whiteAlpha.100");

  const menu = [
    {
      section: "MAIN",
      items: [
        { name: "Dashboard", path: "/", icon: LayoutDashboard },
        { name: "Orders", path: "/orders", icon: ShoppingCart },
      ],
    },
    {
      section: "CATALOG",
      items: [
        { name: "Products", path: "/products", icon: Package },
        { name: "Categories", path: "/categories", icon: Tag },
      ],
    },
    {
      section: "CUSTOMERS",
      items: [{ name: "Users", path: "/users", icon: Users }],
    },
    {
      section: "MARKETING",
      items: [{ name: "Coupons", path: "/coupons", icon: Percent }],
    },
    {
      section: "ANALYTICS",
      items: [{ name: "Analytics", path: "/analytics", icon: BarChart3 }],
    },
    {
      section: "SETTINGS",
      items: [{ name: "Settings", path: "/settings", icon: Settings }],
    },
  ];

  return (
    <Box
      w="260px"
      h="100vh"
      bg={bg}
      borderRight="1px solid"
      borderColor={border}
      p={5}
      overflowY="auto"
    >
      {/* LOGO */}
      <Text fontSize="2xl" fontWeight="bold" mb={6} color="purple.500">
        Admin Panel
      </Text>

      <VStack align="stretch" spacing={4}>
        {menu.map((group, i) => (
          <Box key={i}>
            {/* SECTION TITLE */}
            <Text
              fontSize="xs"
              fontWeight="bold"
              color="gray.400"
              mb={2}
              px={2}
            >
              {group.section}
            </Text>

            <VStack align="stretch" spacing={1}>
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <Link key={item.name} to={item.path}>
                    <Flex
                      align="center"
                      gap={3}
                      px={3}
                      py={2.5}
                      borderRadius="lg"
                      bg={isActive ? "purple.500" : "transparent"}
                      color={isActive ? "white" : "inherit"}
                      _hover={{
                        bg: isActive ? "purple.600" : hoverBg,
                      }}
                      transition="0.2s"
                    >
                      <Icon size={18} />
                      {item.name}
                    </Flex>
                  </Link>
                );
              })}
            </VStack>

            {/* Divider */}
            {i !== menu.length - 1 && <Divider mt={4} />}
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;
