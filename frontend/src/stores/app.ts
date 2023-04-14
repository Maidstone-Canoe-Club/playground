import { defineStore } from "pinia";

export interface AppStore {
  accessTokenExpiry: number | undefined
}

export const useAppStore = defineStore({
  id: "appStore",
  state: (): AppStore => ({
    accessTokenExpiry: 0
  })
});
