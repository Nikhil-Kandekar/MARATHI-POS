import { Box, Button, Container, FormControl, FormLabel, Input, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
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

  const dict ={
    "CC":"coordinating conjunction",
    "CD":"cardinal digit",
    "DT": "determiner",
    "EX":"existential",
    "FW":"foreign word",
    "IN": "preposition/subordinating conjunction",
    "JJ" :"adjective 'big'",
    "JJR" :"adjective, comparative 'bigger'",
    "JJS": "adjective, superlative 'biggest'",
    "LS" :"list marker ",
    "MD": "modal ",
    "NN": "noun, singular 'desk'",
    "NNS": "noun plural 'desks'",
    "NNP" :"proper noun, singular 'Harrison'",
    "NNPS" :"proper noun, plural 'Americans'",
    "PDT": "predeterminer 'all the kids'",
    "POS": "possessive ending",
    "PRP": "personal pronoun ",
    "PRP$": "possessive pronoun ",
    "RB" :"adverb ",
    "RBR" :"adverb, comparative",
    "RBS" :"adverb, superlative ",
    "RP" :"particle ",
    "TO":"to ",
    "UH":"interjection" ,
    "VB":"verb, base form take",
    "VBD":"verb, past tense took",
    "VBG":"verb, gerund/present participle taking",
    "VBN":"verb, past participle taken",
    "VBP":"verb, sing. present, non-3d take",
    "VBZ":"verb, 3rd person sing. present takes",
    "WDT":"wh-determiner which",
    "WP":"wh-pronoun who, what",
    "WP$":"possessive wh-pronoun whose",
    "WRB":"wh-abverb where, when",
    "SYM":"Symbol",
    "VAUX":"Auxiliary Verb",
    "VM":"Main Verb",
    "DEM":"Demonstrative",
    "QC":"Cardinal"
  }

  return (
    <div className="App">
      <Container style={{"padding":"50px"}}>  
      <Box boxShadow='dark-lg' p='6' rounded='md' bg='white' >   
      <FormControl isRequired>
        <FormLabel htmlFor='first-name'>Marathi Sentence</FormLabel>
        <Input style={{"margin-bottom":"16px"}} id='first-name' placeholder='Enter Marathi sentence' onChange={(e)=>setSentence(e.target.value)}/>
        <Button colorScheme='teal' variant='outline' onClick={handlesubmit}>
          Get POS
        </Button>
      </FormControl>
      </Box>
      {pos.length>0 && 
      <Box boxShadow='dark-lg' p='6' rounded='md' bg='white' marginTop="16px"> 
       
      <TableContainer >
        <Table variant='striped' colorScheme="blackAlpha" size='sm' style={{"margin-top":"16px","border":"1px "}} >
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
                <Td>{dict[elem[1]]?dict[elem[1]] : elem[1]}</Td>
              </Tr>
            ))}
            
          </Tbody>
        </Table>
      </TableContainer>  
       
      </Box>} 
      </Container>
    </div>
  );
}

export default App;
