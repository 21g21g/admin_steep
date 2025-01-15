import { ref } from "vue";

export const useCurrentPage=(path)=> {
  const currentPage = ref("");

  if (path === "/app/admin/") {
    currentPage.value = "Dashboard";
  } else if (path === "/app/admin/address") {
    currentPage.value = "Address";
  } else if (path === "/app/admin/interventions") {
    currentPage.value = "Interventions";
  } else if (path === "/app/admin/support") {
    currentPage.value = "Support";
  }
   else if(path === "/app/admin/users") {
    currentPage.value = "Users";
  }
  else if (path === "/app/admin/address/") {
    currentPage.value = "Region/City";
  } else if (path === "/app/admin/address/subcity") {
    currentPage.value = "Subcity/Zone";
  } else if (path === "/app/admin/address/woreda") {
    currentPage.value = "Woreda/Town";
  }  
  else{
    ''
  }

 // check the path of the current page


 

  return {
    currentPage,
  };
}
