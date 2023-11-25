import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => {
    return { theme: 'dark' }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
   lightTheme(){
     this.theme = 'light'
   },
   darkTheme(){
     this.theme = 'dark'
   }
  },
})