// Gerekli importları yapıyoruz.
import Message from './Message';
import { useEffect, useState } from 'react';
import { getDatabase, ref, get, child } from "firebase/database";
import { memo } from "react";

// Mesajlar bileşeni.
function Messages() {
    // Mesajları tutacak bir state oluşturuyoruz.
    const [messages, setMessages] = useState([]);

    // Mesajları çekme işlemi.
    useEffect(() => {
        const intervalId = setInterval(() => {
            get(child(ref(getDatabase()), 'message/')).then((snapshot) => {
                if (snapshot.exists()) {
                    setMessages(snapshot.val());
                }
            })
        }, 1500)

        return () => clearInterval(intervalId);

    }, []);

    // Mesajları döndürüyoruz.
    return (
        <>
            {
                Object.values(messages).map((message, index) => (
                    <div key={index}>
                        <Message name="User" message={message.userMsg} time={message.time} />
                        <Message name="Chatbot" message={message.botMsg} time={message.time} />
                    </div>
                ))
            }
        </>
    );
}

// Messages bileşenini dışa aktarıyoruz.
export default memo(Messages);