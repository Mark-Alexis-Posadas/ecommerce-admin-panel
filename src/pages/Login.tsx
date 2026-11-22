import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { Navigate } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
  Button,
  Alert,
  AlertIcon,
  Flex,
} from '@chakra-ui/react';
import { Eye, EyeOff, Mail, LockKeyhole, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { adminLoginError } from '../services/authErrors';
export default function Login() {
  const { user, login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const pending = useRef(false);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const emailError = () =>
    !email.trim()
      ? 'Enter your work email.'
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
        ? 'Enter a valid email address.'
        : '';
  if (loading)
    return (
      <Text role="status" py={8} color="gray.600">
        Checking your session...
      </Text>
    );
  if (user?.role === 'admin') return <Navigate to="/" replace />;
  return (
    <Box>
      <Flex align="center" gap={2} color="purple.700" mb={4}>
        <ShieldCheck size={16} aria-hidden="true" />
        <Text fontSize="xs" fontWeight="700" letterSpacing="0.14em" textTransform="uppercase">
          Store workspace
        </Text>
      </Flex>
      <Heading
        as="h1"
        fontSize={{ base: '30px', sm: '32px' }}
        lineHeight="1.2"
        letterSpacing="tight"
        color="gray.900"
      >
        Welcome back.
      </Heading>
      <Text mt={3} mb={7} fontSize="sm" lineHeight="1.7" color="gray.600">
        Sign in to manage your ShopZone store.
      </Text>
      <Box
        as="form"
        noValidate
        aria-busy={busy}
        onSubmit={async (event: FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          if (pending.current) return;
          const next = { email: emailError(), password: password ? '' : 'Enter your password.' };
          setErrors(next);
          setError('');
          if (next.email) {
            emailInput.current?.focus();
            return;
          }
          if (next.password) {
            passwordInput.current?.focus();
            return;
          }
          pending.current = true;
          setBusy(true);
          try {
            await login(email.trim(), password);
          } catch (failure) {
            setError(adminLoginError(failure));
          } finally {
            pending.current = false;
            setBusy(false);
          }
        }}
      >
        <Stack spacing={5}>
          {error && (
            <Alert
              status="error"
              role="alert"
              borderRadius="lg"
              fontSize="sm"
              alignItems="flex-start"
            >
              <AlertIcon mt={0.5} />
              {error}
            </Alert>
          )}
          <FormControl isRequired isInvalid={!!errors.email} isDisabled={busy}>
            <FormLabel htmlFor="admin-email" fontSize="sm" color="gray.800" mb={2}>
              Email address
            </FormLabel>
            <InputGroup>
              <InputLeftElement h="50px" pointerEvents="none" color="gray.400">
                <Mail size={17} aria-hidden="true" />
              </InputLeftElement>
              <Input
                ref={emailInput}
                id="admin-email"
                name="email"
                type="email"
                autoComplete="username"
                inputMode="email"
                autoCapitalize="none"
                spellCheck={false}
                placeholder="you@example.com"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setErrors((v) => ({ ...v, email: '' }));
                  setError('');
                }}
                onBlur={() => setErrors((v) => ({ ...v, email: emailError() }))}
                h="50px"
                borderRadius="lg"
                borderColor="gray.200"
                bg="white"
                color="gray.900"
                fontSize="md"
                focusBorderColor="purple.500"
                _hover={{ borderColor: 'gray.400' }}
                transition="border-color 150ms, box-shadow 150ms"
                _placeholder={{ color: 'gray.400' }}
                aria-describedby={errors.email ? 'admin-email-error' : undefined}
              />
            </InputGroup>
            <FormErrorMessage id="admin-email-error">{errors.email}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={!!errors.password} isDisabled={busy}>
            <FormLabel htmlFor="admin-password" fontSize="sm" color="gray.800" mb={2}>
              Password
            </FormLabel>
            <InputGroup>
              <InputLeftElement h="50px" pointerEvents="none" color="gray.400">
                <LockKeyhole size={17} aria-hidden="true" />
              </InputLeftElement>
              <Input
                ref={passwordInput}
                id="admin-password"
                name="password"
                type={visible ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setErrors((v) => ({ ...v, password: '' }));
                  setError('');
                }}
                onBlur={() =>
                  setErrors((v) => ({ ...v, password: password ? '' : 'Enter your password.' }))
                }
                h="50px"
                pr="52px"
                borderRadius="lg"
                borderColor="gray.200"
                bg="white"
                color="gray.900"
                fontSize="md"
                focusBorderColor="purple.500"
                _hover={{ borderColor: 'gray.400' }}
                transition="border-color 150ms, box-shadow 150ms"
                aria-describedby={errors.password ? 'admin-password-error' : undefined}
              />
              <InputRightElement h="50px" w="48px">
                <IconButton
                  type="button"
                  isDisabled={busy}
                  aria-label={visible ? 'Hide password' : 'Show password'}
                  aria-pressed={visible}
                  aria-controls="admin-password"
                  icon={visible ? <EyeOff size={18} /> : <Eye size={18} />}
                  onClick={() => setVisible((v) => !v)}
                  variant="ghost"
                  size="sm"
                  color="gray.500"
                  _focusVisible={{ boxShadow: '0 0 0 3px #c4b5fd' }}
                />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage id="admin-password-error">{errors.password}</FormErrorMessage>
          </FormControl>
          <Button
            type="submit"
            colorScheme="purple"
            bg="purple.600"
            color="white"
            h="50px"
            borderRadius="xl"
            fontSize="sm"
            isLoading={busy}
            loadingText="Signing in..."
            rightIcon={<ArrowRight size={17} aria-hidden="true" />}
            _hover={{ bg: 'purple.700' }}
            _focusVisible={{ boxShadow: '0 0 0 3px #c4b5fd' }}
          >
            Sign in to workspace
          </Button>
        </Stack>
        <Text
          role="status"
          sx={{
            position: 'absolute',
            width: '1px',
            height: '1px',
            overflow: 'hidden',
            clipPath: 'inset(50%)',
          }}
        >
          {busy ? 'Your sign-in request is being processed.' : ''}
        </Text>
      </Box>
      <Text
        mt={7}
        pt={5}
        borderTop="1px solid"
        borderColor="gray.100"
        fontSize="xs"
        lineHeight="1.7"
        color="gray.500"
      >
        This workspace is for administrators. Use the account provided by your store operator.
      </Text>
    </Box>
  );
}
