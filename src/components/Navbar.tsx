import { Link } from 'react-router-dom';
import { Box, Button, Spacer } from '@chakra-ui/react';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
	const { auth, logout } = useAuth();

	return (
		<Box p={4} display='flex'>
			<Spacer />
			<Box>
				{!auth?.accessToken ? (
					<>
						<Link to='/auth/login'>
							<Button>Login</Button>
						</Link>
						<Link to='/auth/signup'>
							<Button ml={2}>Signup</Button>
						</Link>
					</>
				) : (
					<>
						<Link to='/posts'>
							<Button>Posts</Button>
						</Link>

						<Button onClick={logout}>Logout</Button>
					</>
				)}
			</Box>
		</Box>
	);
};

export default Navbar;
