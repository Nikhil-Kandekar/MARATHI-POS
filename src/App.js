import { Box, Button, Center, Container, FormControl, FormLabel, Input, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

function App() {
  const [sentence, setSentence] = useState('')
  const [pos, setPos] = useState([])

  const handlesubmit =()=>{
    console.log(sentence)
    axios.get(`http://localhost:8765/getpos?sentence=${sentence}`).then((res)=>{
      setPos(res.data.POS)
      console.log(pos)
    })
  }

  return (
    <div className="App">
      <Container>       
      <FormControl isRequired>
        <FormLabel htmlFor='first-name'>First name</FormLabel>
        <Input id='first-name' placeholder='First name' onChange={(e)=>setSentence(e.target.value)}/>
        <Button colorScheme='teal' variant='outline' onClick={handlesubmit}>
          Get POS
        </Button>
      </FormControl>
      {pos.length>0 &&  
      <TableContainer>
        <Table variant='striped' colorScheme="blackAlpha" size='sm'>
          <Thead>
            <Tr>
              <Th>WORD</Th>
              <Th>Part of Speech</Th>
            </Tr>
          </Thead>
          <Tbody>
            {pos.map((elem,i)=>(
              <Tr key={i}>
                <Td>{elem[0]}</Td>
                <Td>{elem[1]}</Td>
              </Tr>
            ))}
            
          </Tbody>
        </Table>
      </TableContainer>  
      } 
      </Container>
    </div>
  );
}

export default App;
