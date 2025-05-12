// plugins/ani-cursor.client.js
import { setANICursor } from "ani-cursor.js";

export default defineNuxtPlugin(() => {
  setANICursor("body", "/cursor/normal.ani");
  setANICursor(".catBtn", "/cursor/Link.ani");
  setANICursor(".texto", "/cursor/texto.ani");
});
