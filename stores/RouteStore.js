import { defineStore } from 'pinia'
export const useRouteStore = defineStore('route', {
   
    state: () => (
        { 
            currentPage: ""
        }),
    actions: {
        updatePage(value) {
            this.currentPage=value

       
      },
    },
  })