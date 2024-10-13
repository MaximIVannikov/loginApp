import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Posts from './pages/Posts';
import PostDetails from './pages/PostDetails';
import { ChakraProvider } from '@chakra-ui/react';
import { RecoilRoot } from 'recoil';
import NewPost from './pages/NewPost';

function App() {
	return (
		<RecoilRoot>
			<ChakraProvider>
				<Router>
					<Navbar />
					<Routes>
						<Route path='/auth/login' element={<Login />} />
						<Route path='/auth/signup' element={<Signup />} />
						<Route path='/posts' element={<Posts />} />
						<Route path='/posts/:postId' element={<PostDetails />} />
						<Route path='/posts/new' element={<NewPost />} />
					</Routes>
				</Router>
			</ChakraProvider>
		</RecoilRoot>
	);
}

export default App;
