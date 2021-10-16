import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  Message,
  Mic,
  SearchOutlined,
} from "@material-ui/icons";
import MoreVert from "@material-ui/icons/MoreVert";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import db, { auth } from "../../firebase";
import classes from "./Chat.module.css";
import firebase from "firebase";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../reducer";

const Chat = () => {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);

  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snap) => setRoomName(snap.data().name));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snap) => setMessages(snap.docs.map((doc) => doc.data())));
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  const logoutHandler = () => {
    if (user) {
      auth.signOut();
      dispatch({
        type: actionTypes.SET_USER,
        user: null,
      });
    }
  };

  return (
    <div className={classes.chat}>
      <div className={classes.chat__header}>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className={classes.chat__headerInfo}>
          <h3>{roomName}</h3>
          <p>
            last seen{" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toLocaleString()}
          </p>
        </div>
        <div className={classes.chat__headerRight}>
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <p onClick={logoutHandler}>Logout</p>
        </div>
      </div>
      <div className={classes.chat__body}>
        {messages.map((message) => (
          <p
            className={`${classes.chat__message} ${
              message.name === user.displayName && classes.chat__receiver
            }`}
          >
            <span className={classes.chat__name}>{message.name}</span>
            {message.message}
            <span className={classes.chat__timestamp}>
              {new Date(message.timestamp?.toDate()).toLocaleString()}
            </span>
          </p>
        ))}
      </div>
      <div className={classes.chat__footer}>
        <InsertEmoticon className={classes.emoji} />
        <form>
          <input
            type="text"
            placeholder="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" onClick={sendMessage}>
            Send a message
          </button>
        </form>
        <Mic className={classes.mic} />
      </div>
    </div>
  );
};

export default Chat;
