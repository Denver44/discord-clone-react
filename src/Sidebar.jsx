import React, { useEffect, useState } from "react";
import "./sidebar.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import SidebarChannel from "./SidebarChannel";
import SignalCellularAltIcon from "@material-ui/icons/SignalCellularAlt";
import CallIcon from "@material-ui/icons/Call";
import InfoIcon from "@material-ui/icons/Info";
import { Avatar } from "@material-ui/core";
import MicIcon from "@material-ui/icons/Mic";
import HeadsetIcon from "@material-ui/icons/Headset";
import SettingsIcon from "@material-ui/icons/Settings";
import { selectUser } from "./features/userSlice";
import { useSelector } from "react-redux";
import db, { auth } from "./firebase";

function Sidebar() {
  const user = useSelector(selectUser);
  // console.log(user);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    db.collection("channels").onSnapshot((snapshot) => {
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          channel: doc.data(),
        }))
      );
    });
  }, []);

  const handleAddChannel = () => {
    const channelName = prompt("Enter a new Channel Name");

    if (channelName) {
      db.collection("channels").add({
        channelName: channelName,
      });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <div> Discord </div>
        <ExpandMoreIcon />
      </div>

      <div className="sidebar__channels">
        <div className="side__channelsHeader">
          <div className="sidebar__header">
            <ExpandMoreIcon />
            <h4> Testing Channel</h4>
          </div>
          <AddIcon
            onClick={handleAddChannel}
            className="sidebar__addChannel"
          ></AddIcon>
        </div>
        <div className="sidebar__channelLists">
          {channels.map(({ id, channel }) => {
            return (
              <SidebarChannel
                key={id}
                id={id}
                channelName={channel.channelName}
              />
            );
          })}
        </div>
      </div>

      <div className="sidebar__voice">
        <SignalCellularAltIcon
          fontSize="large"
          className="sidebar__voiceIcon"
        />
        <div className="sidebar__voiceInfo">
          <h3>Voice Connected</h3>
          <p>stream</p>
        </div>

        <div className="sidebar__voiceIcons">
          <InfoIcon />
          <CallIcon />
        </div>
      </div>

      <div className="sidebar__profile">
        <Avatar src={user.photo} onClick={() => auth.signOut()} />
        <div className="sidebar__profileInfo">
          <h3>@{user.displayName}</h3>
          <p>#{user.uid.substr(5, 5)}</p>
        </div>
        <div className="sidebar__profileIcons">
          <MicIcon />
          <HeadsetIcon />
          <SettingsIcon />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
