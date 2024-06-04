// Gerekli importları yapıyoruz.
import './Message.css';
import { memo } from 'react';

// Mesaj bileşeni.
function Message(props) {
    let IMG_URL = '';
    let TIMESTAMP = '';
    if (props.name === 'Chatbot') {
        IMG_URL = 'https://static.vecteezy.com/system/resources/thumbnails/007/225/199/small_2x/robot-chat-bot-concept-illustration-vector.jpg';
    } else {
        IMG_URL = 'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg';
    }

    // Tarih bilgilerini çekiyoruz.
    let currentDate = new Date();

    // Mesajın tarih bilgilerini alıyoruz ve karşılaştırma işlemi yapıyoruz.
    if (currentDate.getFullYear() === props.time.year && currentDate.getMonth() + 1 === props.time.month && currentDate.getDate() === props.time.day && currentDate.getHours() === props.time.hours && currentDate.getMinutes() === props.time.minutes) {
        TIMESTAMP = "az önce";
    } else if (currentDate.getFullYear() === props.time.year && currentDate.getMonth() + 1 === props.time.month && currentDate.getDate() === props.time.day && currentDate.getHours() === props.time.hours) {
        if (currentDate.getSeconds() < props.time.seconds) {
            if (currentDate.getMinutes() - (props.time.minutes + 1) === 0) {
                TIMESTAMP = "az önce";
            } else {
                TIMESTAMP = currentDate.getMinutes() - (props.time.minutes + 1) + " dakika önce";
            }
        } else {
            TIMESTAMP = currentDate.getMinutes() - props.time.minutes + " dakika önce";
        }
    } else if (currentDate.getFullYear() === props.time.year && currentDate.getMonth() + 1 === props.time.month && currentDate.getDate() === props.time.day) {
        if (currentDate.getHours() - props.time.hours === 1 && currentDate.getMinutes() < props.time.minutes) {
            TIMESTAMP = 60 - props.time.minutes + currentDate.getMinutes() + " dakika önce";
        } else if (currentDate.getHours() - props.time.hours < 4) {
            if (currentDate.getMinutes() < props.time.minutes) {
                TIMESTAMP = currentDate.getHours() - (props.time.hours + 1) + " saat önce";
            } else {
                TIMESTAMP = currentDate.getHours() - props.time.hours + " saat önce";
            }
        } else {
            TIMESTAMP = ("0" + props.time.hours).slice(-2) + "." + ("0" + props.time.minutes).slice(-2);
        }
    } else {
        TIMESTAMP = ("0" + props.time.day).slice(-2) + "/" + ("0" + props.time.month).slice(-2) + "/" + props.time.year;
    }

    // Mesaj bileşenini döndürüyoruz.
    return (
        <div>
            <div className="card p-3">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="user d-flex flex-row align-items-center">
                        <img src={IMG_URL} width="30" className="user-img rounded-circle mr-2 unselectable" alt='Avatar' />
                        <span><small className="font-weight-bold name">{props.name}</small></span>
                    </div>
                    <small className='unselectable'>{TIMESTAMP}</small>
                </div>
                <div className="action d-flex justify-content-between mt-2 align-items-center">
                    <div className="reply px-4">
                        <small>{props.message}</small>
                    </div>
                </div>
                {
                    props.name === 'Chatbot' &&
                    <div className="d-flex justify-content-between align-items-center mt-2">
                        <div className="user d-flex flex-row align-items-center">
                            <span><button className="button-md" onClick={() => navigator.clipboard.writeText(props.message)}> {/* Mesajı panoya kopyalama işlemi*/}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className="icon-md">
                                    <path fill="currentColor" fillRule="evenodd" d="M7 5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-2v2a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h2zm2 2h5a3 3 0 0 1 3 3v5h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-9a1 1 0 0 0-1 1zM5 9a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1z" clipRule="evenodd"></path>
                                </svg>
                            </button></span>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

// Mesaj bileşenini dışa aktarıyoruz.
export default memo(Message);