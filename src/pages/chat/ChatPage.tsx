import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatMessageType } from "../../api/chat-api";
import {
  sendMessage,
  startMessagesListening,
  stopMessagesListening,
} from "../../redux/chat-reducer";
import { AppStateType } from "../../redux/redux-store";
import { NavLink } from "react-router-dom";

const ChatPage: React.FC = () => {
  return (
    <div>
      <Chat />
    </div>
  );
};

const Chat: React.FC = () => {
  const dispatch: any = useDispatch();

  const status = useSelector((state: AppStateType) => state.chat.status);

  useEffect(() => {
    dispatch(startMessagesListening());
    return () => {
      dispatch(stopMessagesListening());
    };
  });

  return (
    <div>
      {status === "error" ? (
        <div>Some error occured.Please refresh the page </div>
      ) : (
        <div>
          <Messages />
          <AddMessagesForm />
        </div>
      )}
    </div>
  );
};

const Messages: React.FC = () => {
  const messages = useSelector((state: AppStateType) => state.chat.messages);
  const messageAnchorRef = React.useRef<HTMLDivElement>(null);
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const scrollHandler = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    if (
      Math.abs(element.scrollHeight - element.scrollTop) -
        element.clientHeight <
      1
    ) {
      !isAutoScroll && setIsAutoScroll(true);
    } else {
      isAutoScroll && setIsAutoScroll(false);
    }
  };

  useEffect(() => {
    if (isAutoScroll) {
      messageAnchorRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const setIsAutoScrollTrue = () => {
    setIsAutoScroll(true);
    messageAnchorRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="chat__arrowDown">
      <div
        className="chat__messagesBox"
        style={{ height: "350px", overflowY: "auto" }}
        onScroll={scrollHandler}
      >
        {messages.map((m, index) => (
          <Message key={index} message={m} />
        ))}
        <div ref={messageAnchorRef}></div>
      </div>
      <span onClick={setIsAutoScrollTrue}>↓</span>
    </div>
  );
};

const Message: React.FC<{ message: ChatMessageType }> = React.memo(
  ({ message }) => {
    return (
      <div>
        <div>
          <NavLink to={"/profile/" + message.userId}>
            <img title="Avatar" alt="Avatar" width="32" src={message.photo} />
            <b> {message.userName}</b>
          </NavLink>
        </div>
        <div>{message.message}</div>
      </div>
    );
  }
);

const AddMessagesForm: React.FC = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const status = useSelector((state: AppStateType) => state.chat.status);
  const sendMessageHandler = () => {
    if (!message) {
      return;
    }
    dispatch(sendMessage(message) as any);
    setMessage("");
  };

  document.onkeyup = function (e) {
    e = e || window.event;
    if (e.keyCode === 13 && e.ctrlKey === true) {
      sendMessageHandler();
    }
    // Отменяем действие браузера
    return false;
  };

  return (
    <div>
      <div>
        <textarea
          onChange={(e) => setMessage(e.currentTarget.value)}
          value={message}
          name={"AddMessages"}
          id="1"
          placeholder={"What's up?"}
        ></textarea>
      </div>
      <Button disabled={status === "ready"} onClick={sendMessageHandler}>
        Send
      </Button>
    </div>
  );
};

export default ChatPage;
