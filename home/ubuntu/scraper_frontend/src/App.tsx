import React from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  Text,
  Input,
  FormControl,
  FormLabel,
  Button,
  Select,
} from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
      <Box p={4}>
        <VStack spacing={4}>
          <Text fontSize="2xl" mb={2}>Data Broker Opt-Out Form</Text>
          <FormControl id="fullName" isRequired>
            <FormLabel>Full Name</FormLabel>
            <Input placeholder="John Doe" />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="example@domain.com" />
          </FormControl>
          <FormControl id="state" isRequired>
            <FormLabel>State</FormLabel>
            <Select placeholder="Select state">
              <option value="MA">Massachusetts</option>
              {/* Additional states can be added here */}
            </Select>
          </FormControl>
          <Button colorScheme="blue">Submit</Button>
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;
