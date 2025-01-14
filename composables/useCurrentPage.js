import { ref } from "vue";

export function useCurrentPage() {
  const currentPage = ref("");

  // Define a mapping of paths to page names
  const pageMapping = [
    { path: "/app/admin/", name: "Dashboard" },
    { path: "/app/admin/address", name: "Address" },
    { path: "/app/admin/address/region", name: "Region" },
    { path: "/app/admin/address/subcity", name: "Subcity" },
    { path: "/app/admin/address/woreda", name: "Woreda" },
    { path: "/app/admin/interventions", name: "Interventions" },
    { path: "/app/admin/support", name: "Support" },
    { path: "/app/admin/users", name: "Users" },
  ];


  // Update the current page based on the path
  const updateCurrentPage = (path) => {
    currentPage.value = pageMapping[path] || "Unknown Page"; // Fallback for undefined paths
  };

  return {
    currentPage,
    updateCurrentPage,
  };
}
