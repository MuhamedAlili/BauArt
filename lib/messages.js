"use client";

/* Contact-form inbox, stored in localStorage and read by /admin. */
const STORE_KEY = "bauart_messages";

export function loadMessages() {
  try {
    return JSON.parse(window.localStorage.getItem(STORE_KEY) || "[]");
  } catch (e) {
    return [];
  }
}

export function saveMessages(list) {
  window.localStorage.setItem(STORE_KEY, JSON.stringify(list));
}

export function addMessage(msg) {
  const list = loadMessages();
  list.unshift({ ...msg, id: "m" + Date.now(), date: new Date().toISOString(), read: false });
  saveMessages(list);
  return list;
}
