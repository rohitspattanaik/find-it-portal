import { useEffect, useState } from 'react';
import { Center, Flex, Input, Button, Box, Paper, Text } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';
import { authenticate } from '../../api/Authentication/Authentication';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const { isAuthenticated, setIsAuthenticated, setIsAdmin } = useAuth();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//         const session = await authenticate({ email });
//         setIsAuthenticated(true);
//         setIsAdmin(session.isAdmin);

//         // navigate to home
//         navigate('/');
//     } catch (error: any) {
//       console.error(error);
//         setError("Authentication failed");
//     }

//   };

//   useEffect(() => {
//     if (isAuthenticated) {
//         navigate('/');
//     }
//   }, [navigate, isAuthenticated]);

//   return (
//     <div className={styles.container}>
//       <form className={styles.form} onSubmit={handleSubmit}>
//         <h1 className={styles.title}>Welcome Back</h1>

//         <div className={styles.inputGroup}>
//           <label htmlFor="email" className={styles.label}>
//             Email
//           </label>
//           <input
//             id="email"
//             type="email"
//             className={styles.input}
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>

//         <Button text="Sign In" onClick={handleSubmit} type="submit" />

//         {error && <div className={styles.error}>{error}</div>}
//       </form>
//     </div>
//   );
// };

const Login = () => {

  const [email, setEmail] = useState<string>('');
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const { isAuthenticated, setIsAuthenticated, isAdmin, setIsAdmin } = useAuth();
  const [error, setError] = useState<string>('');
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
    try {
      const session = await authenticate({ email });
      console.log(session);
      setIsAuthenticated(true);
      setIsAdmin(session.isAdmin);

      // navigate to home
      navigate('/');
    } catch (error: any) {
      console.error(error);
      setError("Authentication failed");
    }
  }

  return (
    <Center h="64vh">
      <Paper bg="gray.1" p="md" shadow="md" radius="md" w="24vw">
        <Flex direction="column" justify="center" align="center" gap="sm">
          <Input w="100%" placeholder="Enter your email" value={email} leftSection={<IconAt size={16} />} onChange={(e) => setEmail(e.currentTarget.value)} onBlur={validateEmail} />
          <Button w="100%" onClick={handleLogin} disabled={!isEmailValid}>Login</Button>
          {error && <Text c="red">{error}</Text>}
        </Flex>
      </Paper>
    </Center>
  )
}

export default Login;