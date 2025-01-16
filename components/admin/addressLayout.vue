<script setup>


const route = useRoute();
const router = useRouter();
const currentPage = ref("");
const textValue = ref("");

// Address sidebar for navigation
const navigation = [
  {
    id: 1,
    name: "Region/City",
    href: "/app/admin/address",
    title: "Region/City",
    current: true,
  },
  {
    id: 2,
    name: "Subcity/Zone",
    href: "/app/admin/address/subcity",
    title: "Subcity/Zone",
  },
  {
    id: 3,
    name: "Woreda/Town",
    href: "/app/admin/address/woreda",
    title: "Woreda/Town",
  },
];

const handleclick = (value) => {
  currentPage.value = value;
};

const updateCurrentPage = (path) => {
  if (path === "/app/admin/address") {
    currentPage.value = "Region/City";
  } else if (path === "/app/admin/address/subcity") {
    currentPage.value = "Subcity/Zone";
  } else if (path === "/app/admin/address/woreda") {
    currentPage.value = "Woreda/Town";
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
      <div class="flex flex-col md:ml-4 lg:w-1/4 rounded-lg p-4">
        <ul class="space-y-3 md:space-y-8">
          <li
            v-for="nav in navigation"
            :key="nav.id"
            class="group  flex items-center p-1"
          >
            <NuxtLink
              :to="nav.href"
              @click="handleclick(nav.name)"
              class="font-medium w-full"
            >
              <span
                class="hover:border-primary py-1 px-5"
                :class="[
                  currentPage === nav.name
                    ? 'border-l-[8px] border-primary pl-1'
                    : 'pl-1 py-1 hover:bg-[#697280] hover:text-slate-100 bg-transparent border-transparent border-l-[8px]',
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
          Address / {{ currentPage || "Region/City" }}
        </h1>
       
      </div>

      <div class="flex flex-wrap lg:flex-nowrap items-start lg:items-center justify-between gap-y-4">
        <h1 class="text-lg lg:text-2xl text-[#161344]">
          {{ currentPage || "Region/City" }}
        </h1>
        <div>
          <slot name="button" />
        </div>
         
      </div>

      <!-- Content Section -->
      <div class="py-6">
        <slot name="contents" />
      </div>
    </div>
  </div>
</template>
