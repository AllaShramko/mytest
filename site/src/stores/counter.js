import { defineStore } from 'pinia'

// TODO: rename store to something more meaningful
export const useCounterStore = defineStore('counter', {
  state: () => {
    // TODO: remove example
    return { count: 0 }
  }
})
