import { Avatar, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import classes from "./Sidebar.module.css";
import DonutLarge from "@material-ui/icons/DonutLarge";
import Chat from "@material-ui/icons/Chat";
import MoreVert from "@material-ui/icons/MoreVert";
import { SearchOutlined } from "@material-ui/icons";
import SidebarChat from "../sidebarChat/SidebarChat";
import db from "../../firebase";
import { useStateValue } from "../../StateProvider";

const Sidebar = () => {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  const [text, setText] = useState("");

  useEffect(() => {
    const unsubscribe = db.collection("rooms").onSnapshot((snap) =>
      setRooms(
        snap.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className={classes.sidebar}>
      <div className={classes.sidebar__header}>
        <Avatar src={user?.photoURL} />
        <div className={classes.sidebar__headerRight}>
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className={classes.sidebar__search}>
        <div className={classes.sidebar__searchContainer}>
          <SearchOutlined className={classes.searchOut} />
          <input
            placeholder="Search or start new..."
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </div>
      <div className={classes.sidebar__chats}>
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
