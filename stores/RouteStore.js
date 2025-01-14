import { defineStore } from 'pinia'
export const useRouteStore = defineStore('route', {
   
    state: () => (
        { 
            currentPage: ""
        }),
    actions: {
        updateCurrentPage(value) {
            this.currentPage=value

       
      },
    },
  })