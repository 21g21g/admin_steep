
//all routes and there pages
const pageMappings = {
  "/app/admin": "Dashboard",
  "/app/admin/address": "Region/City",
  "/app/admin/address/subcity": "Subcity/Zone",
  "/app/admin/address/woreda": "Woreda/Town",
  "/app/admin/interventions": "Intervention Types",
  "/app/admin/interventions/category": "Intervention Category",
  "/app/admin/support": "Support",
  "/app/admin/users": "Users",
};

export const updateCurrentPage = (path,currentPage) => {
  for (const [key, value] of Object.entries(pageMappings)) {
    if (path === key || path.startsWith(key) && key !== "/app/admin") {
      currentPage.value = value; 
    }

  return currentPage
  }

};
