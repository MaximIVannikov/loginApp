import { Spinner as ChakraSpinner, Box } from '@chakra-ui/react';

const Spinner = () => (
	<Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
		<ChakraSpinner size='xl' thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' />
	</Box>
);

export default Spinner;
