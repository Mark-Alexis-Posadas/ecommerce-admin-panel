import { Badge } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import {
  Box,
  Flex,
  Heading,
  Button,
  Input,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Spinner,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import toast from 'react-hot-toast';
import { api } from '../services/api';
import { catalogFailure } from '../services/catalogErrors';
import type { Product, ProductForm, Category } from '../types/product';
import useProducts from '../hooks/useProducts';
import ProductModal from '../components/products/ProductModal';
import ViewModal from '../components/products/ViewModal';
import Pagination from '../components/ui/Pagination';
const empty: ProductForm = {
  title: '',
  description: '',
  brand: '',
  category: '',
  price: '',
  discount: '0',
  stock: '0',
  image: '',
  images: '',
  isFeatured: false,
  isActive: true,
};
export default function Products() {
  const [inventory, setInventory] = useState('all');
  const [viewed, setViewed] = useState<Product | null>(null);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('latest');
  const [category, setCategory] = useState('');
  const [visibility, setVisibility] = useState<'active' | 'archived' | 'all'>('all');
  const { products, loading, error, meta, page, setPage, refetch } = useProducts({
    search,
    sort,
    category,
    visibility,
    inventory,
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoryError, setCategoryError] = useState('');
  const [selected, setSelected] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<ProductForm>(empty);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const bg = useColorModeValue('white', 'gray.800');
  useEffect(() => {
    let active = true;
    api
      .get<Category[]>('/api/categories?visibility=all')
      .then(({ data }) => {
        if (active) setCategories(data);
      })
      .catch(() => {
        if (active) setCategoryError('Could not load categories. Reload to retry.');
      })
      .finally(() => {
        if (active) setCategoriesLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);
  const edit = (p: Product) => {
    setSelected(p);
    setForm({
      title: p.title,
      description: p.description,
      brand: p.brand || '',
      category: typeof p.category === 'string' ? p.category : p.category?._id || '',
      price: String(p.price),
      discount: String(p.discount || 0),
      stock: String(p.stock),
      image: p.image || '',
      images: (p.images || []).join('\n'),
      isFeatured: p.isFeatured === true,
      isActive: p.isActive !== false,
    });
    setErrors({});
    setOpen(true);
  };
  const save = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setErrors({});
    try {
      const images = form.images
        .split('\n')
        .map((v) => v.trim())
        .filter(Boolean);
      const payload = {
        title: form.title,
        description: form.description,
        brand: form.brand,
        category: form.category,
        price: Number(form.price),
        discount: Number(form.discount),
        stock: Number(form.stock),
        ...(form.image.trim() ? { image: form.image.trim() } : {}),
        images,
        isFeatured: form.isFeatured,
        isActive: form.isActive,
      };
      if (selected) await api.put('/api/products/' + selected._id, payload);
      else await api.post('/api/products', payload);
      setOpen(false);
      setMessage('Product saved');
      toast.success('Product saved');
      refetch();
    } catch (e) {
      const failure = catalogFailure(e);
      setErrors(failure.errors || {});
      toast.error(failure.message);
    } finally {
      setBusy(false);
    }
  };
  const archive = async (p: Product) => {
    const restore = p.isActive === false;
    if (!window.confirm((restore ? 'Restore ' : 'Archive ') + p.title + '?')) return;
    setBusy(true);
    try {
      if (restore) await api.put('/api/products/' + p._id, { isActive: true });
      else await api.delete('/api/products/' + p._id);
      setMessage(restore ? 'Product restored' : 'Product archived');
      toast.success(restore ? 'Product restored' : 'Product archived');
      refetch();
    } catch (e) {
      toast.error(catalogFailure(e).message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <Box>
      <Flex justify="space-between" mb={6}>
        <Heading size="md">Products</Heading>
        <Button
          colorScheme="purple"
          onClick={() => {
            setSelected(null);
            setForm(empty);
            setErrors({});
            setOpen(true);
          }}
        >
          Add Product
        </Button>
      </Flex>
      <Flex gap={4} mb={4} wrap="wrap">
        <Input
          maxW="250px"
          placeholder="Search products..."
          value={search}
          maxLength={100}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select maxW="200px" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="latest">Newest</option>
          <option value="low_to_high">Price: Low to High</option>
          <option value="high_to_low">Price: High to Low</option>
          <option value="top_rated">Top Rated</option>
          <option value="best_selling">Best Selling</option>
        </Select>
        <Select maxW="200px" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </Select>
        <Select
          maxW="180px"
          value={visibility}
          onChange={(e) => {
            const value = e.target.value;
            if (value === 'active' || value === 'archived' || value === 'all') setVisibility(value);
          }}
        >
          <option value="all">All products</option>
          <option value="active">Available</option>
          <option value="archived">Archived</option>
        </Select>
        <Select
          maxW="200px"
          aria-label="Filter inventory"
          value={inventory}
          onChange={(event) => setInventory(event.target.value)}
        >
          <option value="all">All inventory</option>
          <option value="in_stock">In stock</option>
          <option value="low_stock">Low stock</option>
          <option value="out_of_stock">Out of stock</option>
        </Select>
      </Flex>
      <Text fontSize="sm" color="gray.500" mb={3}>
        {meta?.lowStockThreshold === 0
          ? 'Low-stock classification disabled.'
          : 'Low stock: 1-' + (meta?.lowStockThreshold ?? 5) + ' units.'}{' '}
        Carts do not reserve inventory.
      </Text>
      {categoriesLoading && <Text>Loading categories...</Text>}
      {categoryError && <Text role="alert">{categoryError}</Text>}
      {message && <Text role="status">{message}</Text>}
      {error && (
        <Text role="alert" color="red.500">
          {error}
          <Button onClick={refetch}>Retry</Button>
        </Text>
      )}
      {loading ? (
        <Spinner />
      ) : (
        <Box bg={bg} borderWidth="1px" borderRadius="xl" overflowX="auto">
          <Table>
            <Thead>
              <Tr>
                <Th>Product</Th>
                <Th>Price</Th>
                <Th>Stock</Th>
                <Th>Category</Th>
                <Th>Status</Th>
                <Th>Created</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.map((p) => (
                <Tr key={p._id}>
                  <Td>
                    <Flex gap={3} align="center">
                      <Image src={p.image || p.images?.[0]} boxSize="40px" objectFit="cover" />
                      {p.title}
                    </Flex>
                  </Td>
                  <Td>₱{p.priceAfterDiscount ?? p.price}</Td>
                  <Td>
                    <Text>{p.stock}</Text>
                    <Badge
                      colorScheme={
                        p.stock <= 0
                          ? 'red'
                          : p.inventoryStatus === 'low_stock'
                            ? 'orange'
                            : 'green'
                      }
                    >
                      {p.stock <= 0
                        ? 'Out of stock'
                        : p.inventoryStatus === 'low_stock'
                          ? 'Low stock'
                          : 'In stock'}
                    </Badge>
                  </Td>
                  <Td>
                    {typeof p.category === 'object'
                      ? p.category?.name || 'No category'
                      : 'No category'}
                  </Td>
                  <Td>{p.isActive === false ? 'Archived' : 'Available'}</Td>
                  <Td>{new Date(p.createdAt).toLocaleDateString()}</Td>
                  <Td>
                    <Flex gap={2}>
                      <Button size="sm" onClick={() => setViewed(p)}>
                        View
                      </Button>
                      <Button size="sm" onClick={() => edit(p)}>
                        Edit
                      </Button>
                      <Button size="sm" isDisabled={busy} onClick={() => archive(p)}>
                        {p.isActive === false ? 'Restore' : 'Archive'}
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          {!products.length && <Text p={6}>No products found.</Text>}
        </Box>
      )}
      <Pagination currentPage={page} totalPages={meta?.totalPages || 1} onPageChange={setPage} />
      <ProductModal
        isOpen={open}
        onClose={() => setOpen(false)}
        form={form}
        setForm={setForm}
        onSubmit={save}
        mode={selected ? 'edit' : 'create'}
        categories={categories}
        errors={errors}
        busy={busy}
      />
      <ViewModal
        isOpen={viewed !== null}
        onClose={() => setViewed(null)}
        selectedProduct={viewed}
      />
    </Box>
  );
}
