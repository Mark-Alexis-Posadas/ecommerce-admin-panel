import { useEffect, useState } from 'react';
import { Box, Button, Heading, Input, Checkbox, FormControl, FormLabel, FormErrorMessage, Stack, Table, Thead, Tbody, Tr, Th, Td, Spinner, Text, useColorModeValue } from '@chakra-ui/react';
import toast from 'react-hot-toast';
import { api } from '../services/api';
import { catalogFailure } from '../services/catalogErrors';
interface Category {
    _id: string;
    name: string;
    slug: string;
    description: string;
    image: string;
    isActive?: boolean;
}
const empty = { name: '', slug: '', description: '', image: '', isActive: true };
export default function Categories() {
    const [rows, setRows] = useState<Category[]>([]);
    const [form, setForm] = useState(empty);
    const [id, setId] = useState('');
    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const [loading, setLoading] = useState(true);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');
    const bg = useColorModeValue('white', 'gray.800');
    const load = async () => {
        try {
            const { data } = await api.get<Category[]>('/api/categories?visibility=all');
            setRows(data);
            setError('');
        }
        catch {
            setError('Failed to load categories');
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => { void load(); }, []);
    const save = async () => {
        setBusy(true);
        setErrors({});
        try {
            const { slug, ...values } = form;
            const payload = { ...values, ...(slug ? { slug } : {}) };
            if (id)
                await api.put('/api/categories/' + id, payload);
            else
                await api.post('/api/categories', payload);
            setId('');
            setForm(empty);
            toast.success('Category saved');
            await load();
        }
        catch (e) {
            const failure = catalogFailure(e);
            setErrors(failure.errors || {});
            toast.error(failure.message);
        }
        finally {
            setBusy(false);
        }
    };
    const toggle = async (c: Category) => {
        if (!window.confirm((c.isActive === false ? 'Restore ' : 'Deactivate ') + c.name + '?'))
            return;
        setBusy(true);
        try {
            await api.put('/api/categories/' + c._id, { isActive: c.isActive === false });
            toast.success('Category availability updated');
            await load();
        }
        catch (e) {
            toast.error(catalogFailure(e).message);
        }
        finally {
            setBusy(false);
        }
    };
    return <Box>
  <Heading size="md" mb={6}>
    {id ? 'Edit Category' : 'Categories'}
  </Heading>
  <Stack spacing={3} mb={6}>
    {(['name', 'slug', 'description', 'image'] as const).map(key => <FormControl key={key} isInvalid={!!errors[key]}>
      <FormLabel>
        {key}
      </FormLabel>
      <Input value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })}/>
      <FormErrorMessage>
        {errors[key]?.join(', ')}
      </FormErrorMessage>
    </FormControl>)}
    <Checkbox isChecked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })}>
      Active
    </Checkbox>
    {errors.isActive && <Text color="red.500">
      {errors.isActive.join(', ')}
    </Text>}
    <Button colorScheme="purple" isLoading={busy} onClick={save}>
      {id ? 'Update Category' : 'Add Category'}
    </Button>
    {id && <Button onClick={() => { setId(''); setForm(empty); setErrors({}); }}>
      Cancel
    </Button>}
  </Stack>
  {error && <Text role="alert">
    {error}
    <Button onClick={load}>
      Retry
    </Button>
  </Text>}
  {loading ? <Spinner /> : <Box bg={bg} borderWidth="1px" borderRadius="xl" overflowX="auto">
    <Table>
      <Thead>
        <Tr>
          <Th>
            Image
          </Th>
          <Th>
            Name
          </Th>
          <Th>
            Description
          </Th>
          <Th>
            Status
          </Th>
          <Th>
            Actions
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {rows.map(c => <Tr key={c._id}>
          <Td>
            {c.image && <img src={c.image} alt={c.name} width={60}/>}
          </Td>
          <Td>
            {c.name}
          </Td>
          <Td>
            {c.description}
          </Td>
          <Td>
            {c.isActive === false ? 'Inactive' : 'Active'}
          </Td>
          <Td>
            <Button mr={2} onClick={() => { setId(c._id); setForm({ name: c.name, slug: c.slug, description: c.description || '', image: c.image || '', isActive: c.isActive !== false }); setErrors({}); }}>
              Edit
            </Button>
            <Button isDisabled={busy} onClick={() => toggle(c)}>
              {c.isActive === false ? 'Restore' : 'Deactivate'}
            </Button>
          </Td>
        </Tr>)}
      </Tbody>
    </Table>
    {!rows.length && <Text p={6}>
      No categories found.
    </Text>}
  </Box>}
    </Box>;
}
