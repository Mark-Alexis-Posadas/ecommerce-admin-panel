import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Image,
  Badge,
  Spinner,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";

import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchOrders = async () => {
    const { data } = await axios.get("http://localhost:5000/api/orders/my", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  const bg = useColorModeValue("white", "gray.800");
  const tableHead = useColorModeValue("gray.100", "gray.700");

  if (loading) return <Spinner size="xl" />;

  return (
    <Box p={6}>
      <Heading size="lg" mb={6}>
        📦 My Orders
      </Heading>

      <Box
        bg={bg}
        borderRadius="xl"
        borderWidth="1px"
        overflow="hidden"
        shadow="sm"
      >
        <Table>
          <Thead bg={tableHead}>
            <Tr>
              <Th>Order</Th>
              <Th>Items</Th>
              <Th>Total</Th>
              <Th>Status</Th>
              <Th>Date</Th>
              <Th></Th>
            </Tr>
          </Thead>

          <Tbody>
            {orders.map((order) => (
              <Tr
                key={order._id}
                _hover={{ bg: useColorModeValue("gray.50", "gray.700") }}
              >
                <Td>#{order._id.slice(-6)}</Td>

                <Td>
                  <Flex align="center" gap={3}>
                    {order.orderItems.map((item: any, i: number) => (
                      <Image
                        key={i}
                        src={item.image}
                        boxSize="40px"
                        borderRadius="md"
                      />
                    ))}
                  </Flex>
                </Td>

                <Td color="purple.500" fontWeight="semibold">
                  ₱{order.totalPrice.toLocaleString()}
                </Td>

                <Td>
                  <Flex gap={2}>
                    <Badge colorScheme={order.isPaid ? "green" : "yellow"}>
                      {order.isPaid ? "Paid" : "Pending"}
                    </Badge>

                    <Badge colorScheme={order.isDelivered ? "blue" : "gray"}>
                      {order.isDelivered ? "Delivered" : "Not Delivered"}
                    </Badge>
                  </Flex>
                </Td>

                <Td>{new Date(order.createdAt).toLocaleDateString()}</Td>

                <Td>
                  <IconButton
                    aria-label="view"
                    icon={<Eye size={16} />}
                    onClick={() => navigate(`/orders/${order._id}`)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default Orders;
