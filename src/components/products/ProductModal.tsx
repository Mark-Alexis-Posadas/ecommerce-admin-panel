import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea, Select, Checkbox, FormControl, FormLabel, FormErrorMessage, Stack, Text } from '@chakra-ui/react';
import type { ProductForm, Category } from '../../types/product';
import type { Dispatch, SetStateAction, FormEvent } from 'react';
interface Props {
    isOpen: boolean;
    onClose: () => void;
    form: ProductForm;
    setForm: Dispatch<SetStateAction<ProductForm>>;
    onSubmit: (event: FormEvent) => void;
    mode: 'create' | 'edit';
    categories: Category[];
    errors: Record<string, string[]>;
    busy: boolean;
}
export default function ProductModal({ isOpen, onClose, form, setForm, onSubmit, mode, categories, errors, busy }: Props) {
    const field = (key: keyof ProductForm, label: string, type = 'text') => <FormControl isInvalid={!!errors[key]}>
  <FormLabel>
    {label}
  </FormLabel>
  <Input isRequired={key === "title" || key === "description" || key === "price" || key === "stock"} type={type} value={String(form[key])} onChange={e => setForm({ ...form, [key]: e.target.value })} min={type === 'number' ? 0 : undefined} step={key === 'stock' ? 1 : key === 'price' || key === 'discount' ? 'any' : undefined}/>
  <FormErrorMessage>
    {errors[key]?.join(', ')}
  </FormErrorMessage>
    </FormControl>;
    return <Modal isOpen={isOpen} onClose={onClose} size="xl">
  <ModalOverlay />
  <ModalContent as="form" onSubmit={onSubmit}>
    <ModalHeader>
      {mode === 'create' ? 'Add Product' : 'Edit Product'}
    </ModalHeader>
    <ModalBody>
      <Stack spacing={4}>
        {field('title', 'Title')}
        {field('description', 'Description')}
        <FormControl isInvalid={!!errors.category}>
          <FormLabel>
            Category
          </FormLabel>
          <Select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
            <option value="">
              Select category
            </option>
            {categories.filter(c => c.isActive !== false || c._id === form.category).map(c => <option key={c._id} value={c._id}>
              {c.name}
              {c.isActive === false ? ' (inactive)' : ''}
            </option>)}
          </Select>
          <FormErrorMessage>
            {errors.category?.join(', ')}
          </FormErrorMessage>
        </FormControl>
        {field('brand', 'Brand')}
        {field('price', 'Price (₱)', 'number')}
        {field('discount', 'Discount (%)', 'number')}
        {field('stock', 'Stock', 'number')}
        {field('image', 'Primary image URL or local path')}
        <FormControl isInvalid={!!errors.images}>
          <FormLabel>
            Images (one URL or local path per line)
          </FormLabel>
          <Textarea value={form.images} onChange={e => setForm({ ...form, images: e.target.value })}/>
          <FormErrorMessage>
            {errors.images?.join(', ')}
          </FormErrorMessage>
        </FormControl>
        <Text>
          Discounted price: ₱
          {(Math.round((Number(form.price) * (1 - Number(form.discount) / 100) + Number.EPSILON) * 100) / 100).toFixed(2)}
        </Text>
        <Checkbox isChecked={form.isFeatured} onChange={e => setForm({ ...form, isFeatured: e.target.checked })}>
          Featured
        </Checkbox>
        <Checkbox isChecked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })}>
          Available
        </Checkbox>
      </Stack>
    </ModalBody>
    <ModalFooter gap={2}>
      <Button type="submit" colorScheme="purple" isLoading={busy}>
        Save
      </Button>
      <Button onClick={onClose} isDisabled={busy}>
        Cancel
      </Button>
    </ModalFooter>
  </ModalContent>
    </Modal>;
}
