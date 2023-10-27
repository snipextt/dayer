import { Extension } from "@/schema/extension";
import { atom } from "recoil";

export const ExtensionState = atom<Extension[]>({
  key: "ExtensionState",
  default: new Array(),
});
