import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea, Checkbox, Heading, VStack, useToast, Spinner } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const NewPost = () => {
	const [formData, setFormData] = useState<{
		title: string;
		content: string;
		published: boolean;
	}>({
		title: '',
		content: '',
		published: false,
	});
	const [loading, setLoading] = useState(false);
	const toast = useToast();
	const navigate = useNavigate();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, type, value } = e.target as HTMLInputElement | HTMLTextAreaElement;

		setFormData(prevData => ({
			...prevData,
			[name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		try {
			await axiosInstance.post('https://frontend-test-be.stage.thinkeasy.cz/posts', formData);
			toast({
				title: 'Success',
				description: 'Post created successfully!',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
			navigate('/posts');
		} catch (error: any) {
			console.error('Error creating post:', error);
			toast({
				title: 'Error',
				description: error.response?.data?.message || 'Failed to create post.',
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
				Create New Post
			</Heading>
			<form onSubmit={handleSubmit}>
				<VStack spacing={4}>
					<FormControl isRequired>
						<FormLabel htmlFor='title'>Title</FormLabel>
						<Input id='title' name='title' type='text' value={formData.title} onChange={handleChange} placeholder='Enter post title' />
					</FormControl>

					<FormControl isRequired>
						<FormLabel htmlFor='content'>Content</FormLabel>
						<Textarea id='content' name='content' value={formData.content} onChange={handleChange} placeholder='Enter post content' />
					</FormControl>

					<FormControl>
						<Checkbox id='published' name='published' isChecked={formData.published} onChange={handleChange}>
							Publish
						</Checkbox>
					</FormControl>

					<Button type='submit' colorScheme='teal' isDisabled={loading}>
						{loading ? <Spinner size='sm' /> : 'Create Post'}
					</Button>
				</VStack>
			</form>
		</Box>
	);
};

export default NewPost;
