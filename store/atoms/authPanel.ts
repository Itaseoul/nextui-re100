import { atom } from "jotai";

type authPanelT = "login" | "signup" | "forgot" | "reset";
export const authPanelState = atom<authPanelT>("login");
