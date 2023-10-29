import {  Extensions } from "@/schema/extension";
import { CurrentStoreState, StoreState } from "@/schema/store-state";
import { atom, selector } from "recoil";

export const ExtensionState = atom<StoreState<Extensions>>({
  key: "ExtensionState",
  default: new Array(),
});

export const CurrentExtensionState = selector<CurrentStoreState<Extensions>>({
  key: "CurrentExtensionState",
  get: ({get}) => {
    const extensions = get(ExtensionState);
    return {
      fetched: !!extensions?.length,
      data: extensions!,
    }
  }
})
