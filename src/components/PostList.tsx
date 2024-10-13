import { PostResponse } from '../types/postTypes';
import { Box, Heading, Stack, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

interface PostListProps {
	posts: PostResponse[];
}

const PostList = ({ posts }: PostListProps) => {
	const navigate = useNavigate();

	return (
		<Stack spacing={4} mt={4}>
			{posts.map(post => (
				<Box key={post.id} p={4} borderWidth='1px' borderRadius='lg' shadow='md'>
					<Heading size='md'>{post.title}</Heading>
					<Button onClick={() => navigate(`/posts/${post.id}`)} mt={4} colorScheme='blue'>
						View Post
					</Button>
				</Box>
			))}
		</Stack>
	);
};

export default PostList;
