import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Heading, VStack, useToast, Spinner } from '@chakra-ui/react';
import { LoginInput } from '../types/authTypes';
import { useAuth } from '../hooks/useAuth';
import axiosInstance from '../api/axiosInstance';

const Login = () => {
	const { login } = useAuth();
	const [formData, setFormData] = useState<LoginInput>({
		email: '',
		password: '',
	});
	const [loading, setLoading] = useState(false);
	const toast = useToast();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await axiosInstance.post('/auth/login', formData);
			console.log(response.data, 'response.data');
			localStorage.setItem('accessToken', response.data.accessToken);
			localStorage.setItem('refreshToken', response.data.refreshToken);
			localStorage.setItem('user', response.data.user);

			login(response.data);
			toast({
				title: 'Success',
				description: 'Logged in successfully!',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
		} catch (error: any) {
			console.error('Login error:', error);
			toast({
				title: 'Error',
				description: error.response?.data?.message || 'Invalid credentials.',
				status: 'error',
				duration: 3000,
				isClosable: true,
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<Box maxW='md' mx='auto' mt={10}>
			<Heading as='h1' size='lg' mb={6} textAlign='center'>
				Login
			</Heading>
			<form onSubmit={handleSubmit}>
				<VStack spacing={4}>
					<FormControl isRequired>
						<FormLabel htmlFor='email'>Email</FormLabel>
						<Input id='email' name='email' type='email' value={formData.email} onChange={handleChange} placeholder='Enter your email' />
					</FormControl>

					<FormControl isRequired>
						<FormLabel htmlFor='password'>Password</FormLabel>
						<Input id='password' name='password' type='password' value={formData.password} onChange={handleChange} placeholder='Enter your password' />
					</FormControl>

					<Button type='submit' colorScheme='teal' isDisabled={loading}>
						{loading ? <Spinner size='sm' /> : 'Log In'}
					</Button>
				</VStack>
			</form>
		</Box>
	);
};

export default Login;
