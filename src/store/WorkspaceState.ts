import { CurrentStoreState, StoreState } from "@/schema/store-state";
import {WorkspaceResponse} from "@/schema/workspace";
import { atom, selector } from "recoil";

export const WorkspaceState = atom<StoreState<WorkspaceResponse>>({
  key: "workspace",
  default: undefined,
});

export const CurrentWokspaceState = selector<CurrentStoreState<WorkspaceResponse>>({
  key: "CurrentWokspaceState",
  get: ({get}) => {
    const workspace = get(WorkspaceState);
    return {
      fetched: !!workspace,
      data: workspace
    }
  },
})
