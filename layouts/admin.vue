<script setup>
import { ref, onMounted, watch, } from "vue";
import { useWindowSize } from "@vueuse/core";
import { useRoute, useRouter } from "vue-router";
import { useForm } from 'vee-validate';

import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";



const { width } = useWindowSize();
const { handleSubmit } = useForm();



const route = useRoute();
const router = useRouter();
const currentPage = ref("");
console.log(route.path)

const isFocused = ref(false);
const showNotificationList = ref(false);
const showLogoutConfirmationModal = ref(false);
/* ----------------------------- Dashboard Mode ----------------------------- */
const isModalOpen = ref(false);
const sidebarOpen = ref(false);
const notificationsCount=ref(10)
const mini = ref(true); 
const currentPassword=ref("")
const newPassword=ref("")
const confirmPassword=ref("")

//sidebar routes and pages setup
const navigation = [
  {
    id:1,
    name: "Dashboard",
    href: "/app/admin/",
    title: "Dashboard",
    iconName:"material-symbols:dashboard",
    current: true,
  },
  {
    id:2,
    name: "Address",
    href: "/app/admin/address",
    title: "Address",
    iconName:"ic:round-place",
  },
  {
    id:3,
    name: "Interventions",
    href: "/app/admin/interventions",
    title: "Interventions",
    iconName:"heroicons:rectangle-stack-solid",
  },
  {
    id:4,
    name: "Support",
    href: "/app/admin/support",
    title: "Support",
    iconName:"arcticons:rakuten-link-supporter",
  },
  {
    id:5,
    name: "Users",
    href: "/app/admin/users",
    title: "Users",
    iconName:"fa6-solid:users",
  },
];
// data for when click the user profile
const userNavigation = [
  {
    name: "Change Password",
    textColor:"text-primary",
    href: "#",
     icon: "uil:key-skeleton",
    title: "Check Out Your Profile.",
  },
  // { name: "Settings", href: "#" },
  {
    name: "Log Out",
    textColor:"text-red-500",
    href: "",
    icon: "charm:sign-out",
    title: "Log Out of this browser.",
  },
];

//notification dummy
const notification = ref([
    {
        id: 1,
        type: 'new_job',
        seen: false,
        title: "Status Change",
        status: "Approved",
        remark: 'You have a new job opportunity available. Check it out now!',
        created_at: '12 May, 2025', is_grouped: false,
        leadingIcon: "material-symbols:person-3-outline-rounded",
        subject_id: 5,
    },
    {
        id: 2,
        type: 'application_status',
        seen: true,
        title: "Status Change",
        status: "Approved",
        remark: 'Your application for Software Engineer has been reviewed. Check your status!',
        created_at: '12 May, 2025',
        leadingIcon: "material-symbols:person-3-outline-rounded",
        is_grouped: false,
        subject_id: 12,
    },
    {
        id: 3,
        type: 'vacancy_closed',
        seen: false,
        title: "Status Change",
        status: "Rejected",
        remark: 'The vacancy for Project Manager has been closed. Thank you for applying.',
        created_at: '12 May, 2025', leadingIcon: "material-symbols:person-3-outline-rounded",

        is_grouped: false,
        subject_id: null,
    },
    {
        id: 4,
        type: 'assessment_score',
        seen: false,
        title: "Status Change",
        status: "Rejected",
        remark: 'Your assessment results are now available. Click to view your score.',
        created_at: '12 May, 2025',
        leadingIcon: "material-symbols:person-3-outline-rounded",

        is_grouped: false,
        subject_id: 101,
    },
    {
        id: 5,
        type: 'scheduled_assessment',
        seen: true,
        title: "Status Change",
        status: "",
        remark: 'You have a scheduled assessment for the Data Analyst position on January 20, 2025.',
        created_at: '12 May, 2025', leadingIcon: "material-symbols:person-3-outline-rounded",

        is_grouped: false,
        subject_id: 202,
    },


]);

const onSubmit = handleSubmit(() => {
  console.log('Form submitted');
  const output = {
    name: fullName.value,
    email: Email.value,
    partner: selectedValue.value,
  };
  console.log(output);
  isModalOpen.value=false
});

const navigate=(item)=>{
  if(item.name==="Change Password"){
    isModalOpen.value=true

  }

}

const handleclick = (value) => {
  currentPage.value = value;
  
};


    const updateCurrentPage=(path)=> {
  if (path === "/app/admin/") {
    currentPage.value = "Dashboard";
  } else if (path === "/app/admin/address") {
    currentPage.value = "Address";
  } else if (path === "/app/admin/interventions") {
    currentPage.value = "Interventions";
  } else if (path === "/app/admin/support") {
    currentPage.value = "Support";
  } else {
    currentPage.value = "Users";
  }
  
}
watch(
  () => isFocused.value,
  () => {}
);





if (true) {
  mini.value = false;
} else if (false) {
  mini.value = true;
} else {
  mini.value = width.value < 1536;
}

// controls dashboard mode
const minify = () => {
  mini.value = !mini.value;
};


const logout=()=> {

  router.push("/"); // re-route to login page
}

onMounted(()=>{
  updateCurrentPage(route.path)
})

</script>
<template>
  <div class="min-h-screen relative">
    <!-- /* ------------------------ Logout confirmation modal ----------------------- */ -->
    <h-confirm v-model="showLogoutConfirmationModal">
      <template #mainIcon>
        <div class="bg-red-200 px-2 py-1 rounded-full">
          <Icon name="ci:triangle-warning" class="w-8 h-8 text-red-600"/>
        </div>
      </template>
      <template #title>
        <p class="text-xl text-white">Log Out</p>
      </template>
      <template #message>
        <p class="font-light">
          Are you sure you want to log out of HaHuJobs Primary?
        </p>
      </template>
      <template #falseButton>
        <button
          @click="showLogoutConfirmationModal = false"
          class="outline-button border rounded-sm !px-5"
        >
          No
        </button>
      </template>
      <template #trueButton>
        <button
          @click="logout()"
          class="outline-button bg-red-700 !border-red-700 px-3 rounded-sm text-white"
        >
          Log Out
        </button>
      </template>
    </h-confirm>

      <!-- /* ------------------------ Profile change modal ----------------------- */ -->

      <HModal
      :modelValue="isModalOpen"
      mainClass="relative px-4 pt-5 pb-6 text-left transition-all transform rounded-lg  overflow-y-auto h-[560px] bg-white w-[100%] md:w-[30rem] shadow-xl sm:my-8 sm:w-full sm:p-9"
      @update:modelValue="isModalOpen = $event"
      title="Sample Modal"
      wrapperClass=""
      :autoClose="true"
      :hasCloseIcon="true"
      :enabledOverflow="false"
    >
      <template #Heading>
           <form @submit.prevent="onSubmit" as="div" class="pt-12 flex flex-col gap-y-5 w-full">
           
            <HTextField  
           :modelValue="currentPassword"
           @update:modelValue="(value) => { currentPassword = value}"
            type="password"
            name="currentPassword"
            rules="required"
            inputClass="block w-[26rem] text-base mt-4  dark:bg-gray-700 dark:text-gray-300 placeholder-gray-300 dark:placeholder-secondary py-3 transition-all duration-300 rounded-md font-body focus:outline-none border-[1px]  border-gray-300 group-hover:border-gray-500 focus:border-gray-600 focus:ring-gray-600 disabled:bg-gray-100 disabled:cursor-not-allowed "
            >
                <template #label>
                    <p class="text-[#7A7A7A] mt-4 md:mt-0">Current Password</p>

                </template>

            </HTextField>
            <HTextField  
            :modelValue="newPassword"
            @update:modelValue="(value) => { newPassword = value}"
            type="password"
            name="newPassword" 
            rules="required"    
            inputClass="block w-[26rem] mt-4 text-base dark:bg-gray-700 dark:text-gray-300 placeholder-gray-300 dark:placeholder-secondary py-3 transition-all duration-300 rounded-md font-body focus:outline-none border-[1px]  border-gray-300 group-hover:border-gray-500 focus:border-gray-600 focus:ring-gray-600 disabled:bg-gray-100 disabled:cursor-not-allowed "
            >
                <template #label>
                    <p class="text-[#7A7A7A]">New Password</p>

                </template>

            </HTextField>

            <HTextField  
            :modelValue="confirmPassword"
            @update:modelValue="(value) => { confirmPassword = value}"
            type="password"
            name="confirmPassword" 
            rules="required"    
            inputClass="block w-[26rem] mt-4 text-base dark:bg-gray-700 dark:text-gray-300 placeholder-gray-300 dark:placeholder-secondary py-3 transition-all duration-300 rounded-md font-body focus:outline-none border-[1px]  border-gray-300 group-hover:border-gray-500 focus:border-gray-600 focus:ring-gray-600 disabled:bg-gray-100 disabled:cursor-not-allowed "
            >
                <template #label>
                    <p class="text-[#7A7A7A]">Confirm Password</p>

                </template>

            </HTextField>
            
                <button type="submit" class="text-white bg-primary self-center mt-2  rounded-3xl py-2 w-60  text-center">Submit</button>

            

        </form>
         
      </template>

      <template #content>
        
            <h2 class=" font-semibold text-2xl">Change Password</h2>
            
          <div class=" flex items-center  mt-5 pb-4">
            <hr class="w-full border-t-2 border-gray-300">
        </div>
        
      </template>
    </HModal>


    <!-- /* ------------------------ Add user modal ----------------------- */ -->

    <HModal
      :modelValue="showNotificationList"
      mainClass="absolute top-6 right-56 px-4  pb-6 text-left transition-all   transform rounded-lg  overflow-y-auto h-[800px] bg-white  md:w-[35rem] shadow-xl sm:my-8 sm:w-full sm:p-9"
      @update:modelValue="showNotificationList = $event"
      title="Sample Modal"
      wrapperClass=""
      :autoClose="true"
      :hasCloseIcon="true"
      :enabledOverflow="false"
    >
      <template #Heading>
        <div class="mt-8" v-for="data in notification" :key="data.id"> 
          <h-notification :notification="data" />
          <div class="flex items-center mt-2 pb-4">
            <hr class="w-full border-b-1 border-gray-300">
        </div>
        
        </div>
      </template>

      <template #content>
        
            <h2 class=" font-semibold text-xl  text-[#222324]">Notifications</h2>
            
       <div class="flex items-center  mt-5 pb-4">
            <hr class="w-full border-t-2 border-gray-300">
        </div>
        
      </template>
    </HModal>
      
   
    <!-- /*                                Main Content                                */ -->
    <TransitionRoot as="template"  :show="sidebarOpen">
      <Dialog
        as="div"
        class="relative z-40 lg:hidden"
        @close="sidebarOpen = false"
      >
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div
            class="fixed inset-0 bg-gray-600 dark:bg-secondary-dark-2 bg-opacity-75"
          >
        
          </div>
        </TransitionChild>

        <div class="fixed  inset-0 z-50 flex max-w-[300px] ">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel
              class="relative flex w-full flex-1 flex-col bg-[#444f60] pt-5 md:pb-4"
            >
              <TransitionChild
                as="template"
                enter="ease-in-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in-out duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div class="absolute top-2 left-2 pt-2">
                  <button
                    type="button"
                    class="ml-1 flex h-10 w-10 items-center justify-center"
                    @click="sidebarOpen = false"
                  >
                    <span class="sr-only">Close sidebar</span>
                    <Icon name="material-symbols:close" class="text-white w-10 h-6"/>
                  </button>
                </div>
              </TransitionChild>
              <!-- /* ----------------------- Static sidebar for mobile ----------------------- */ -->
              <nuxt-link
                to="/app/"
                class="flex-shrink-0 my-8 z-50 flex-col mx-auto space-y-1"
              >
              <Icon name="ph:fediverse-logo-light" class="w-12 h-12 text-primary"/>

                <!-- <p class="text-secondary-6 text-sm">Primary</p> -->
              </nuxt-link>
              <div
                class="mt-2 w-full h-full flex flex-col justify-between   overflow-y-auto"
              >
                <nav class="flex flex-col space-y-6 px-5">
                 <nuxt-link
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              @click="handleclick(item.href)"
              :class="[
                currentPage === item.name
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'rounded-md px-3 py-2 text-sm font-bold',
              ]"
              :aria-current="currentPage === item.name ? 'page' : undefined"
            >
              {{ item.name }}
            </nuxt-link>
                </nav>
                <button
                  @click="showLogoutConfirmationModal = true"
                  class="w-full bg-neutral-950 dark:bg-hahu-gray text-white dark:text-secondary-7 flex items-center px-8 py-4 text-lg font-medium"
                >
                 
                  <nuxt-icon name="logout" filled class="h-6 w-6 mr-4" />

                  Log Out
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- /*                         Static sidebar for DESKTOP                         */ -->
    <div
      class="hidden lg:fixed mt-16 lg:inset-y-0 lg:flex lg:flex-col "
      :class="mini ? 'w-20' : 'md:w-60'"
    >
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div
        class="relative flex min-h-0 flex-1 flex-col items-center  bg-[#444f60]"
      >
        <!-- HaHu Logo -->
        <nuxt-link
          to="/app/"
          class="h-16 mt-16 flex-shrink-0 flex-cols items-center mx-auto space-y-3"
        >
         
          <div
         
          class=" bg-gray-300 hover:bg-primary-2   flex w-12 aspect-square ml-2 items-center justify-center rounded-full"
        >
                   
             <Icon name="material-symbols-light:person-check-rounded" size="30" class="text-primary"/>
            
        </div>
          
          <p
            class="text-white dark:text-secondary-6 font-medium"
            :class="mini ? 'text-xs' : 'text-sm'"
          >
            Administrator
          </p>
        </nuxt-link>
        <!-- Toggle mini mode -->
        <div
          @click="minify"
          class="group bg-primary hover:bg-primary-2 absolute  border z-10 top-[240PX] -right-[14px] flex  aspect-square items-center justify-center rounded-full cursor-pointer"
        >
          <button class="shadow-none border-none ">
            <Icon name="ic:sharp-keyboard-arrow-left" class="w-8 h-5 mt-1 text-white" :class="mini ? 'rotate-180' : ''"/>
             
             
            
          </button>
        </div>

        <!-- Divide line -->
        <div
          class="w-[80%] h-0.5 mx-auto mt-4"
        >
        </div>

        <div class="flex flex-col justify-between items-center h-full mt-12 pb-14">
          <nav class="flex-1 space-y-5 px-2 py-4">
            <nuxt-link
                v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              @click="handleclick(item.name)"
              
              class="text-gray-300  hover:text-white rounded-md px-3 py-2 text-sm lg:text-lg font-bold"
           
            >
              <!-- Mini version -->
              <span
                title="item.name"
                v-if="mini"
                class="flex items-center justify-center h-8 w-8"
             
                aria-hidden="true"
              >
              <Icon :name="item.iconName"/>
              </span>

             
              <span v-else class="flex items-center gap-x-3   hover:border-primary   px-6"  :class="[
                currentPage === item.name
                  ? 'text-white  border-l-[4px] border-primary pl-1'
                  : 'text-white pl-1 hover:bg-[#697280] bg-transparent border-transparent  border-l-[4px]',
              ]">
               <Icon :name="item.iconName"/> {{ item.name }}
              </span>
            </nuxt-link>
          </nav>
          <div class="flex justify-center w-full">
            <button
            title="Log out"
            @click="showLogoutConfirmationModal = true"
            class="dark:bg-hahu-gray flex items-center px-16 py-2 rounded-lg   text-base text-white bg-[#697280] "
            :class="mini ? 'justify-center px-7' : ''"
          >
            <Icon v-if="mini" name="si:sign-out-alt-fill" 
              class="w-5"
              aria-hidden="true"
            />
            <p v-if="!mini">Logout</p>
          </button>
          </div>
        
        </div>
      </div>
    </div>
    <div
      class="flex w-full flex-col h-screen overflow-hidden navAnimation"
     
    >
      <div
        class="fixed top-0 z-10 w-full flex h-20 flex-shrink-0 
       bg-white dark:bg-primary-dark shadow-lg"
      >
        <button
          type="button"
          class="pl-4 pr-2 text-gray-50 dark:text-secondary-11  focus:outline-none lg:hidden"
          @click="sidebarOpen = true"
        >
          <span class="sr-only">Open sidebar</span>
          <Icon name="uim:bars" class="text-black h-5 "/>
             
        </button>
        <div
          class="flex flex-1 justify-between px-4 items-center text-center dark:text-secondary-11 "
        >
          <!-- <div
            class="md:text-xl lg:ml-3 3xl:ml-5 flex flex-row items-center py-2"
          >
          <Icon name="ph:fediverse-logo-light" class="w-12 h-12 text-primary"/>
          <div class="flex flex-col -space-y-2">
            <p class="font-bold">THE BRIDGES</p>
            <p class="text-secondary ">PROGRAMME</p></div>
            
          </div> -->
          <img src="/steep_logo.jpg" class="h-12 w-36" alt="no" />
          <div class="ml-4 flex items-center md:ml-6">
          
            <div class="flex items-center space-x-4 md:mr-5">
           
              <button
                id="notification-button"
                type="button"
                title="Notifications"
                @click="showNotificationList = true"
                class="relative rounded-full dark:bg-primary-dark dark:text-secondary-11 p-1 text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <span class="sr-only">View notifications</span>
              
                <Icon name="material-symbols:notifications-outline-sharp" class="w-8 h-8 bg-primary"/>

                <div
                  v-if="notificationsCount > 0"
                  class="absolute index-50 w-6 text-[11px] md:h-6 h-5 -top-2 -right-2 bg-red-600 flex items-center justify-center text-white text-center rounded-full"
                >
                  {{ notificationsCount }}
                </div>
              </button>

              <!-- Profile dropdown -->
              <Menu as="div" class="relative ml-3">
                <div>
                  <MenuButton
                    class="flex max-w-xs items-center rounded-full border border-primary-2 text-sm focus:outline-none"
                  >
                    <span class="sr-only">Open user menu</span>
                   <div class="border border-primary flex flex-row gap-1 items-center rounded-2xl px-2 py-1">
                   <p class="text-sm">admin role bridges</p>
                    <div
         
                 class=" bg-primary border z-10  flex w-5 h-5 aspect-square items-center rounded-full py-1"
                 >
                 <Icon name="material-symbols:person" class="px-2"/>

                </div>
                <Icon name="ic:baseline-keyboard-arrow-down" class="w-5 h-5"/>



                   </div>
                  </MenuButton>
                </div>
                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <MenuItems
                    class="absolute right-0 z-10 mt-2  w-48 overflow-clip origin-top-right rounded-md bg-secondary-8 dark:bg-secondary shadow-lg ring-1 ring-secondary ring-opacity-5 focus:outline-none divide divide-y-[1px] divide-secondary-7 dark:divide-secondary-3/10"
                  >
                    <MenuItem
                      v-for="item in userNavigation"
                      @click="navigate(item)"
                      :key="item.name"
                      class="menuItem"
                      :title="item.title"
                    >
                      <div class="menuItemButton flex py-2 px-2 cursor-pointer hover:bg-[#b3e0db]  gap-x-3 group">
                        <div class="w-5 h-5">
                          <Icon class="w-5 h-5" :class="item.textColor"  :name="item.icon"/>
                        </div>
                        
                        <div>{{ item.name }}</div>
                      </div>
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>
        </div>
      </div>

  
       <main :class="mini ? 'lg:ml-24 ' : 'ml-4 md:ml-8 lg:ml-64'"
                class="h-screen overflow-y-auto pt-4 mt-24  dark:bg-primary-dark 5xl:max-w-[1920px] ">
                <slot />
            </main>
    </div>
  </div>
</template>

