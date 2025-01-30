import React, { useState } from "react";
import Auth from "../src/services/Auth";
import Chat from "../src/services/Chat";

const App = () => {
  const [receiverId, setReceiverId] = useState("USER_ID_HERE");
  const token = localStorage.getItem("token");

  return token ? <Chat receiverId={receiverId} /> : <Auth />;
};

export default App;
