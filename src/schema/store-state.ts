export type StoreState<T> = T | undefined;

export interface CurrentStoreState<T> {
  fetched: boolean;
  data: StoreState<T>
}
