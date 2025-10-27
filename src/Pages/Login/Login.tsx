import { useEffect, useState } from 'react';
import { Center, Flex, Input, Button, Paper, Text, Loader } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {

  const [email, setEmail] = useState<string>('');
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const { isAuthenticated, login } = useAuth();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [navigate, isAuthenticated]);

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setIsEmailValid(isValid);
    setError(isValid ? '' : 'Invalid email');
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    validateEmail();
    if (!isEmailValid) return;

    try {
      setLoading(true);
      await login(email);
      setLoading(false);
      // navigate to home
      navigate('/');
    } catch (error: any) {
      setLoading(false);
      console.error(error);
      setError("Authentication failed");
    }
  }

  return (
    <Center h="64vh">
      <Paper bg="gray.1" p="md" shadow="md" radius="md" w="24vw">
        <Flex direction="column" justify="center" align="center" gap="sm">
          <Input w="100%" placeholder="Enter your email" value={email} leftSection={<IconAt size={16} />} onChange={(e) => setEmail(e.currentTarget.value)} onSubmit={handleLogin}/>
          {!loading && <Button w="100%" onClick={handleLogin}>Login</Button>}
          {loading && <Loader />}
          {error && <Text c="red">{error}</Text>}
        </Flex>
      </Paper>
    </Center>
  )
}

export default Login;