import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { InputAdornment } from '@mui/material';

export default function CustomInput({handleSendMessage}) {
  const [newMessage, setNewMessage] = React.useState('');
  return (
    <Box sx={{ width: '100%', maxWidth: '100%' }}>
      <TextField  label="Type a message" fullWidth slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end" >
                <SendIcon onClick={()=>{
                  handleSendMessage(newMessage)
                  setNewMessage('');
                  }}/>
              </InputAdornment>
            ),
          },
        }}
        value={newMessage}
         id="input-with-icon-textfield" onChange={e => setNewMessage(e.target.value)}/>
         
    </Box>
  );
}
