"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { createChatSocket } from "@/shared/lib/chatSocket";
import "./page.css";
import { Socket } from "socket.io-client";

const NICK_KEY = "chatNickname";

type Channel = {
  id: string;
  emoji: string;
  label: string;
};

type Message = {
  id: string;
  text: string;
  author: {
    name: string;
  };
  createdAt: string;
  channelId: string;
};

export default function ChatPage() {
  const [nickname, setNickname] = useState("");
  const [connected, setConnected] = useState(false);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [channelId, setChannelId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");

  const socketRef = useRef<Socket | null>(null);
  const channelIdRef = useRef<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  function formatMessageTime(iso: string) {
    try {
      return new Date(iso).toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "";
    }
  }

  useEffect(() => {
    channelIdRef.current = channelId || null;
  }, [channelId]);

  useEffect(() => {
    setNickname(sessionStorage.getItem(NICK_KEY) || "");
  }, []);

  useEffect(() => {
    if (!channelId || messages.length === 0) return;
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [channelId, messages]);

  const disconnect = useCallback(() => {
    (socketRef.current as Socket)?.disconnect();
    socketRef.current = null;
    setConnected(false);
    setChannels([]);
    setChannelId(null);
    setMessages([]);
  }, []);

  const connect = useCallback(() => {
    const nick = nickname.trim() || "Гость";
    sessionStorage.setItem(NICK_KEY, nick);

    disconnect();

    const socket = createChatSocket(nick);
    socketRef.current = socket;

    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));

    socket.on("chat:init", ({ channels: list }) => setChannels(list));

    socket.on("channel:history", ({ channelId: id, messages: hist }) => {
      setChannelId(id);
      setMessages(hist);
    });

    socket.on("message:new", (msg) => {
      if (msg.channelId !== channelIdRef.current) return;
      setMessages((prev) => [...prev, msg]);
    });
  }, [nickname, disconnect]);

  useEffect(() => () => disconnect(), [disconnect]);

  function selectChannel(id: string) {
    socketRef.current?.emit("channel:join", { channelId: id });
  }

  function sendMessage(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || !channelId || !socketRef.current?.connected) return;
    socketRef.current.emit("message:send", {
      channelId,
      text: trimmed,
    });
    setText("");
  }

  return (
    <div className="chat-page app-container">
      <header className="chat-page__header"></header>
      <section className="chat-panel" aria-label="Чат">
        <div className="chat-connect">
          <label className="chat-connect__field">
            <span className="chat-connect__label">Имя в чате</span>
            <input
              className="chat-connect__input"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Гость"
              maxLength={50}
              disabled={connected}
            />
          </label>
          {!connected ? (
            <button
              type="button"
              className="chat-btn chat-btn--primary"
              onClick={connect}
            >
              Подключиться
            </button>
          ) : (
            <button
              type="button"
              className="chat-btn chat-btn--ghost"
              onClick={disconnect}
            >
              Отключиться
            </button>
          )}
          <span
            className={`chat-status ${connected ? "chat-status--online" : "chat-status--offline"}`}
          >
            <span className="chat-status__dot" aria-hidden />
            {connected ? "Онлайн" : "Оффлайн"}
          </span>
        </div>
        {connected && channels.length > 0 && (
          <div className="chat-channels" role="tablist" aria-label="Каналы">
            {channels.map((c) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={channelId === c.id}
                className={`chat-channel ${channelId === c.id ? "chat-channel--active" : ""}`}
                onClick={() => selectChannel(c.id)}
              >
                <span className="chat-channel__emoji" aria-hidden>
                  {c.emoji}
                </span>
                <span className="chat-channel__label">{c.label}</span>
              </button>
            ))}
          </div>
        )}
        <div className="chat-messages-wrap">
          <div className="chat-messages" role="log" aria-live="polite">
            {channelId ? (
              <>
                {messages.map((m) => (
                  <article key={m.id} className="chat-msg">
                    <div className="chat-msg__meta">
                      <span className="chat-msg__author">{m.author?.name}</span>
                      <time className="chat-msg__time" dateTime={m.createdAt}>
                        {formatMessageTime(m.createdAt)}
                      </time>
                    </div>
                    <p className="chat-msg__text">{m.text}</p>
                  </article>
                ))}
                <div
                  ref={messagesEndRef}
                  className="chat-messages__end"
                  aria-hidden
                />
              </>
            ) : (
              <p className="chat-hint">Выберите канал выше</p>
            )}
          </div>
        </div>
        <form className="chat-form" onSubmit={sendMessage}>
          <input
            className="chat-form__input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Напишите сообщение…"
            maxLength={500}
            disabled={!connected || !channelId}
          />
          <button
            className="chat-btn chat-btn--primary chat-form__submit"
            type="submit"
            disabled={!connected || !channelId}
          >
            Отправить
          </button>
        </form>
      </section>
    </div>
  );
}
