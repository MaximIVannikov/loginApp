import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getPosts, getPostUserById } from '../api/posts';
import { PostResponse } from '../types/postTypes';
import { Box, Button, Heading, Input, VStack } from '@chakra-ui/react';
import PostList from '../components/PostList';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';

const Posts = () => {
	const { auth } = useAuth();
	const [posts, setPosts] = useState<PostResponse[]>([]);
	const [loading, setLoading] = useState(true);
	const [postId, setPostId] = useState<string>('');
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		console.log(auth, 'auth');
		if (!auth) {
			navigate('/auth/login');
			return;
		}

		const fetchPosts = async () => {
			try {
				const fetchedPosts = await getPosts();
				setPosts(fetchedPosts);
			} catch (error) {
				console.error('Error fetching posts:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchPosts();
	}, [auth, navigate]);

	const handlePostIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPostId(e.target.value);
	};

	const handleSearchPost = async () => {
		if (postId) {
			setLoading(true);
			setError(null);
			try {
				const fetchedPosts = await getPostUserById(postId);
				setPosts(fetchedPosts);
			} catch (error) {
				console.error('Error fetching post by user ID:', error);
				setError('Post not found.');
			} finally {
				setLoading(false);
			}
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleSearchPost();
		}
	};

	if (loading) {
		return <Spinner />;
	}

	return (
		<Box maxW='md' mx='auto' mt={10}>
			<VStack spacing={4} mt={4}>
				<Input placeholder='Enter Post ID' value={postId} onChange={handlePostIdChange} onKeyDown={handleKeyDown} />
				<Button onClick={handleSearchPost} colorScheme='blue'>
					Search
				</Button>
			</VStack>
			<Heading>Posts</Heading>
			<Button onClick={() => navigate('/posts/new')} colorScheme='blue' mt={4}>
				New Post
			</Button>
			<PostList posts={posts} />
		</Box>
	);
};

export default Posts;
