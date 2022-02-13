import React, { useState, useEffect } from 'react';
import './style.css';
import ChatHeader from '../ChatHeader';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Messages from '../Message';
import { selectChannelId, selectChannelName } from '../../features/appSlice';
import { selectUser } from '../../features/userSlice';
import { useSelector } from 'react-redux';
import db from '../../firebase/firebase.js';
import firebase from 'firebase';

function Chat() {
  const channelName = useSelector(selectChannelName);
  const channelId = useSelector(selectChannelId);
  const user = useSelector(selectUser);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  // console.log(input);

  const handle__submit = (e) => {
    e.preventDefault();
    db.collection('channels').doc(channelId).collection('messages').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user,
    });
    setInput('');
  };

  const input__handler = (e) => {
    // console.log(e.target.value);
    setInput(e.target.value);
  };

  useEffect(() => {
    if (channelId) {
      db.collection('channels')
        .doc(channelId)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [channelId]);

  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />
      <div className="chat__meassages">
        {messages.map((message) => {
          return (
            <Messages
              timestamp={message.timestamp}
              user={message.user}
              message={message.message}
            />
          );
        })}
      </div>
      <div className="chat__input">
        <AddCircleIcon fontSize="large" />
        <form onSubmit={handle__submit}>
          <input
            disabled={!channelId}
            placeholder={`Message #${channelName}`}
            onChange={input__handler}
            value={input}
          />
          <button
            disabled={!input}
            className="chat__inputButton"
            type="submit"
          />
        </form>
        <div className="chat__inputIcons">
          <CardGiftcardIcon />
          <GifIcon />
          <EmojiEmotionsIcon />
        </div>
      </div>
    </div>
  );
}

export default Chat;
