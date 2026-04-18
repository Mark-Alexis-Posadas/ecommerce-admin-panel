import {
  Box,
  Flex,
  Heading,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";
import { Plus } from "lucide-react";

const Coupons = () => {
  const bg = useColorModeValue("white", "gray.800");
  const headBg = useColorModeValue("gray.100", "gray.700");

  const coupons = [
    { code: "SALE10", discount: "10%", status: "active" },
    { code: "WELCOME", discount: "₱50", status: "inactive" },
  ];

  return (
    <Box>
      <Flex justify="space-between" mb={6}>
        <Heading size="md">Coupons</Heading>
        <Button colorScheme="purple" leftIcon={<Plus size={16} />}>
          Add Coupon
        </Button>
      </Flex>

      <Box bg={bg} borderWidth="1px" borderRadius="xl">
        <Table>
          <Thead bg={headBg}>
            <Tr>
              <Th>Code</Th>
              <Th>Discount</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>

          <Tbody>
            {coupons.map((c, i) => (
              <Tr key={i}>
                <Td fontWeight="bold">{c.code}</Td>
                <Td>{c.discount}</Td>
                <Td>
                  <Badge colorScheme={c.status === "active" ? "green" : "gray"}>
                    {c.status}
                  </Badge>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default Coupons;
