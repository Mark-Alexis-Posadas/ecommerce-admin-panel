import React from "react";
import { HStack, Button } from "@chakra-ui/react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  return (
    <HStack justify="center" mt={10} spacing={2} wrap="wrap">
      {/* Prev */}
      <Button
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        isDisabled={currentPage === 1}
        variant="outline"
      >
        Prev
      </Button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          size="sm"
          onClick={() => onPageChange(page)}
          colorScheme={currentPage === page ? "indigo" : "gray"}
          variant={currentPage === page ? "solid" : "outline"}
        >
          {page}
        </Button>
      ))}

      {/* Next */}
      <Button
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        isDisabled={currentPage === totalPages}
        variant="outline"
      >
        Next
      </Button>
    </HStack>
  );
};

export default Pagination;
