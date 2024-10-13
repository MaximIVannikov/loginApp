import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Heading, VStack, useToast, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import { SignupInput } from '../types/authTypes';

const Signup = () => {
	const [formData, setFormData] = useState<SignupInput>({
		email: '',
		password: '',
		firstname: '',
		lastname: '',
	});
	const [loading, setLoading] = useState(false);
	const toast = useToast();
	const navigate = useNavigate();

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
			const response = await axios.post('https://frontend-test-be.stage.thinkeasy.cz/auth/signup', formData);
			toast({
				title: 'Success',
				description: 'Account created successfully! Please log in.',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
			navigate('/auth/login');
		} catch (error: any) {
			console.error('Signup error:', error);
			toast({
				title: 'Error',
				description: error.response?.data?.message || 'An error occurred during signup.',
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
				Signup
			</Heading>
			<form onSubmit={handleSubmit}>
				<VStack spacing={4}>
					<FormControl isRequired>
						<FormLabel htmlFor='firstname'>First Name</FormLabel>
						<Input id='firstname' name='firstname' value={formData.firstname} onChange={handleChange} placeholder='Enter your first name' />
					</FormControl>

					<FormControl isRequired>
						<FormLabel htmlFor='lastname'>Last Name</FormLabel>
						<Input id='lastname' name='lastname' value={formData.lastname} onChange={handleChange} placeholder='Enter your last name' />
					</FormControl>

					<FormControl isRequired>
						<FormLabel htmlFor='email'>Email</FormLabel>
						<Input id='email' name='email' type='email' value={formData.email} onChange={handleChange} placeholder='Enter your email' />
					</FormControl>

					<FormControl isRequired>
						<FormLabel htmlFor='password'>Password</FormLabel>
						<Input id='password' name='password' type='password' value={formData.password} onChange={handleChange} placeholder='Enter your password' />
					</FormControl>

					<Button type='submit' colorScheme='teal' isDisabled={loading}>
						{loading ? <Spinner size='sm' /> : 'Sign Up'}
					</Button>
				</VStack>
			</form>
		</Box>
	);
};

export default Signup;
