// Gerekli importları yapıyoruz.
import './App.css';
import { IconButton } from '@mui/material';
import Input from '@mui/joy/Input';
import { Send } from '@mui/icons-material';
import Messages from './Messages';
import sendMessages from './sendMessages.js';
import { useRef, useState, memo } from 'react';
import './FirebaseInit';
import { getDatabase, ref, get, child } from "firebase/database";

// Uygulamamızın ana bileşeni.
function App() {
  // useRef ile bir değişken oluşturuyoruz.
  const valueRef = useRef('');
  const [index, setIndex] = useState(0);

  // Mesaj sayısını alıyoruz.
  get(child(ref(getDatabase()), 'message/')).then((snapshot) => {
    if (snapshot.exists()) {
      setIndex(Object.values(snapshot.val()).length);
    }
  })

  // Enter ile mesaj kontrole yönlendirme işlemi.
  const send = (ev) => {
    if (ev.key === 'Enter') {
      checkMessages();
    }
  }

  // Mesaj kontrol işlemi
  const checkMessages = () => {
    if (valueRef.current.value !== undefined && valueRef.current.value !== '') {
      sendMessages(valueRef.current.value, index);
      setIndex(index+1);
    }
  }

  // Uygulamamızın dönüş değeri.
  return (
    <>
      <div id='response-area'>
        <Messages/>
      </div>
      <div id='messageSender' style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 'fit-content', padding: "15px" }}>
        <div style={{ width: "93%" }} className='input'>
          <Input onKeyDown={(ev) => send(ev)} color="neutral" disabled={false} placeholder='Sorunuz mu var ? Hemen sorun.' size="lg" variant="soft" onChange={(e) => { valueRef.current = e.target; }} />
        </div>
        <div style={{ padding: "15px", position: "absolute", bottom: 0, right: 0 }}>
          <IconButton onClick={() => checkMessages()} color='primary'>
            <Send />
          </IconButton>
        </div>
      </div>
    </>
  );
}

// App bileşenini dışa aktarıyoruz.
export default memo(App);