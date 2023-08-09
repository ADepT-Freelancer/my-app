const subscribers = {
  "message-received": [] as MessagesReceivedSubscriberType[],
  "status-changed": [] as StatusChangedSubscriberType[],
};

let ws: WebSocket | null = null;

const closeHandler = () => {
  notifySubscribersAboutStatus("pending");

  setTimeout(createChannel, 3000);
};
const messageHandler = (e: MessageEvent) => {
  const newMessage = JSON.parse(e.data);
  subscribers["message-received"].forEach((s) => s(newMessage));
};
const openHandler = () => {
  notifySubscribersAboutStatus("ready");
};
const errorHandler = () => {
  notifySubscribersAboutStatus("error");
  console.log("RESTART-PAGE");
};

const cleanUp = () => {
  ws?.removeEventListener("close", closeHandler);
  ws?.removeEventListener("message", messageHandler);
  ws?.removeEventListener("open", openHandler);
  ws?.removeEventListener("error", errorHandler);
};

const notifySubscribersAboutStatus = (status: StatusType) => {
  subscribers["status-changed"].forEach((s) => s(status));
};

function createChannel() {
  cleanUp();
  ws?.removeEventListener("close", closeHandler);
  ws?.close();
  ws = new WebSocket(
    "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
  );
  notifySubscribersAboutStatus("pending");
  ws.addEventListener("close", closeHandler);
  ws.addEventListener("message", messageHandler);
  ws.addEventListener("open", openHandler);
  ws.addEventListener("error", errorHandler);
}

export const chatAPI = {
  start() {
    createChannel();
  },
  stop() {
    subscribers["message-received"] = [];
    subscribers["status-changed"] = [];
    cleanUp();
    ws?.close();
  },

  subscribe(
    eventsNames: EventsNamesType,
    callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType | null
  ) {
    //@ts-ignore
    subscribers[eventsNames].push(callback);
    return () => {
      //@ts-ignore
      subscribers[eventsNames] = subscribers[eventsNames].filter(
        (s: MessagesReceivedSubscriberType | StatusChangedSubscriberType) =>
          s !== callback
      );
    };
  },
  unsubscribe(
    eventsNames: EventsNamesType,
    callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType | null
  ) {
    //@ts-ignore

    subscribers[eventsNames] = subscribers[eventsNames].filter(
      (s: MessagesReceivedSubscriberType | StatusChangedSubscriberType) =>
        s !== callback
    );
  },

  sendMessage(message: string) {
    ws?.send(message);
  },
};

type MessagesReceivedSubscriberType = (messages: ChatMessageType[]) => void;
type StatusChangedSubscriberType = (messages: StatusType) => void;
type EventsNamesType = "message-received" | "status-changed";
export type StatusType = "pending" | "ready" | "error";

export type ChatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};
