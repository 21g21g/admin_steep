<script setup>
const route = useRoute();
const router = useRouter();
const currentPage = ref("");
const textValue = ref("");

// Address sidebar for navigation
const navigation = [
  {
    id: 1,
    name: "Intervention Types",
    href: "/app/admin/interventions",
    title: "Intervention Types",
    current: true,
  },
  {
    id: 2,
    name: "Intervention Category",
    href: "/app/admin/interventions/category",
    title: "Intervention Category",
  }
  
];

const handleclick = (value) => {
  currentPage.value = value;
};

const updateCurrentPage = (path) => {
  if (path === "/app/admin/interventions") {
    currentPage.value = "Intervention Types";
  } else if (path === "/app/admin/interventions/category") {
    currentPage.value = "Intervention Category";
  }
};

onMounted(() => {
  updateCurrentPage(route.path);
});
</script>

<template>
  <div class="flex flex-col lg:flex-row lg:gap-6 p-4 lg:p-6 min-h-screen">
    <!-- Sidebar -->
    <div>
      <div class="flex flex-col lg:w-full rounded-lg p-4">
        <ul class="space-y-3 md:ml-10 md:space-y-8">
          <li
            v-for="nav in navigation"
            :key="nav.id"
            class="group flex items-center p-1"
          >
            <NuxtLink
              :to="nav.href"
              @click="handleclick(nav.name)"
              class="font-medium w-full"
            >
              <span
                class="hover:border-primary px-5"
                :class="[
                  currentPage === nav.name
                    ? 'border-l-[8px] py-1 border-primary pl-1'
                    : 'pl-1  hover:bg-[#697280] hover:text-slate-100 bg-transparent border-transparent py-2 border-l-[8px]',
                ]"
              >
                {{ nav.name }}
              </span>
            </NuxtLink>
          </li>
        </ul>
      </div>
      <div
        class="hidden lg:block border-r h-full lg:min-h-screen md:ml-48 lg:-mt-60"
      ></div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col space-y-6 overflow-x-auto lg:pl-6 lg:pr-20">
      <!-- Header -->
      <div class="flex flex-wrap items-center">
        <h1 class="text-xs md:text-sm text-[#161344]">
          Interventions / {{ currentPage || "Intervention Types" }}
        </h1>
       
      </div>

      <div class="flex flex-wrap lg:flex-nowrap items-start lg:items-center justify-between gap-y-4">
        <h1 class="text-lg lg:text-2xl text-[#161344]">
          {{ currentPage || "Intervention Types" }}
        </h1>
        <div>
          <slot name="button" />
        </div>
         
      </div>

        <!-- Search Field -->
   <div class="flex w-full justify-between items-center">
    <h-textfield
      :modelValue="searchText"
      inputClass="block w-full md:w-96 text-base mt-3 text-gray-800 dark:bg-gray-700 dark:text-gray-300 placeholder-gray-300 dark:placeholder-secondary py-3 transition-all duration-300 rounded-md font-body focus:outline-none border-[1px] border-gray-300 focus:border-gray-600 focus:ring-gray-600 disabled:bg-gray-100 disabled:cursor-not-allowed"
      name="searchField"
      label="Search"
      :maxlength="100"
      placeholder="Search"
      trailingIcon="uil:search-alt"
      trailingIconClass="absolute inset-y-0 right-0  text-[#161344]  flex items-center pr-3 hover:cursor-pointer"
      id="searchInput"
      labelClass="text-sm lg:text-base font-medium"
    />
    <button>
      <Icon class="w-10 h-6" name="majesticons:save-as-line"/>

    </button>
   </div>
         <!-- Content Section -->

      <div class="py-6">
        <slot name="contents" />
      </div>
    </div>
  </div>
</template>
