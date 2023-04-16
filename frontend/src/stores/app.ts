import { defineStore } from "pinia";

export interface AppStore {
  accessTokenExpiry: number | undefined,
  firstRefresh: boolean
}

export const useAppStore = defineStore({
  id: "appStore",
  state: (): AppStore => ({
    accessTokenExpiry: 0,
    firstRefresh: true
  })
});
