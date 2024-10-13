import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById } from '../api/posts';
import { PostResponse } from '../types/postTypes';
import { Box, Heading, Text } from '@chakra-ui/react';
import Spinner from '../components/Spinner';

const PostDetail = () => {
	const { postId } = useParams();
	const [post, setPost] = useState<PostResponse | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPost = async () => {
			try {
				if (postId) {
					const fetchedPost = await getPostById(postId);
					setPost(fetchedPost);
				}
			} catch (error) {
				console.error('Error fetching post:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchPost();
	}, [postId]);

	if (loading) {
		return <Spinner />;
	}

	return (
		<Box maxW='md' mx='auto' mt={10}>
			{post ? (
				<>
					<Heading>{post.title}</Heading>
					<Text mt={4}>ID: {post.id}</Text>
					<Text mt={4}>Author Id: {post.authorId}</Text>
					<Text mt={4}>Content: {post.content}</Text>
					<Text mt={4}>Published: {post.published.toString()}</Text>
					<Text mt={4}>Created: {post.createdAt}</Text>
					<Text mt={4}>Updated: {post.updatedAt}</Text>
				</>
			) : (
				<Text>Post not found.</Text>
			)}
		</Box>
	);
};

export default PostDetail;
