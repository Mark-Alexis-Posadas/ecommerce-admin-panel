import {
  Box,
  SimpleGrid,
  Text,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";

const Analytics = () => {
  const bg = useColorModeValue("white", "gray.800");

  const stats = [
    { label: "Revenue", value: "₱25,000" },
    { label: "Orders", value: "120" },
    { label: "Users", value: "80" },
    { label: "Products Sold", value: "340" },
  ];

  return (
    <Box>
      <Heading size="md" mb={6}>
        Analytics
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6}>
        {stats.map((stat, i) => (
          <Box key={i} bg={bg} p={5} borderRadius="xl" borderWidth="1px">
            <Text color="gray.400">{stat.label}</Text>
            <Heading size="lg" mt={2}>
              {stat.value}
            </Heading>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Analytics;
