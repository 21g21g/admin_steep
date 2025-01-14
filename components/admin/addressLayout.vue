<script setup>
const props = defineProps({});
const route = useRoute();
const router = useRouter();
const currentPage = ref("");
const textValue = ref('')
// Address sidebar for navigation
const navigation = [
  {
    id: 1,
    name: "Region/City",
    href: "/app/admin/address/",
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
const updateCurrentPage=(path)=> {
  if (path === "/app/admin/address/") {
    currentPage.value = "Region/City";
  } else if (path === "/app/admin/address/subcity") {
    currentPage.value = "Subcity/Zone";
  } else if (path === "/app/admin/address/woreda") {
    currentPage.value = "Woreda/Town";
  }  
  
}
onMounted(()=>{
  updateCurrentPage(route.path)
})

</script>

<template>
  <div class="flex flex-col lg:flex-row lg:gap-6 p-4 lg:p-6  min-h-screen">
    <div>
        <div class="flex flex-col lg:w-1/4   rounded-lg p-4">
      <ul class="space-y-3">
        <li
          v-for="nav in navigation"
          :key="nav.id"
          :class="{ 'border-l-[7px] border-primary pl-1': currentPage === nav.name }"
          class="group flex items-center p-1   hover:bg-primary-light transition"
        >
          <NuxtLink
            :to="nav.href"
             @click="handleclick(nav.name)"
            class="font-medium w-full"
          >
            {{ nav.name }}
          </NuxtLink>
        </li>
      </ul>
     
    </div>
    <div class="hidden lg:block border-r  min-h-screen md:ml-48 lg:-mt-60"></div>

    </div>
    <!-- Sidebar -->
   
    <!-- Main Content -->
    <div class="flex-1 flex flex-col space-y-6 lg:pl-6 lg:pr-20">
      <!-- Header -->
      <h1 v-if="currentPage" class="text-sm  text-[#161344]">
          Address / {{currentPage}}
        </h1>
        <h1 v-else class="text-sm  text-[#161344]">
          Address / Region/City
        </h1>
      <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between">
        <h1 v-if="currentPage" class="text-2xl  text-[#161344]">
           {{currentPage}}
        </h1>
        <h1 v-else class="text-2xl  text-[#161344]">
          Region/City
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


