<script setup>
import { ref, computed, onMounted, watch, inject } from "vue";
import hahu from "../assets/hahu.png"
import { useDark, useToggle } from "@vueuse/core";
import { useClipboard, useWindowSize } from "@vueuse/core";
import { useRoute, useRouter } from "vue-router";

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


const isDark = useDark();

const toggleDark = useToggle(isDark);

const route = useRoute();
const router = useRouter();

const currentPage = ref("/app/dashboard");



const navigation = [
  {
    id:1,
    name: "Dashboard",
    href: "/app/dashboard",
    title: "Dashboard",
    current: true,
  },
  {
    id:2,
    name: "Address",
    href: "/app/address",
    title: "Address",
  },
  {
    id:3,
    name: "Intervantion",
    href: "/app/intervantions",
    title: "Intervantion",
  },
  {
    id:4,
    name: "Support",
    href: "/app/support",
    title: "Support",
  },
  {
    id:5,
    name: "Users",
    href: "/app/users",
    title: "Users",
  },
];
const userNavigation = [
  {
    name: "Your Profile",
    href: "#",
    // icon: UserIcon,
    title: "Check Out Your Profile.",
  },
  // { name: "Settings", href: "#" },
  {
    name: "Log Out",
    href: "",
    // icon: ArrowRightOnRectangleIcon,
    title: "Log Out of this browser.",
  },
];
const handleclick = (value) => {
  currentPage.value = value;
};



const isFocused = ref(false);

watch(
  () => isFocused.value,
  () => {}
);

const handleFocus = () => {
  isFocused.value = true;
};

const handleBlur = () => {
  isFocused.value = false;
};

// document.addEventListener("focus", handleFocus);
// document.addEventListener("blur", handleBlur);


/* ----------------------------- Dashboard Mode ----------------------------- */
const sidebarOpen = ref(false);

const mini = ref(false); //set from session
if (true) {
  mini.value = true;
} else if (false) {
  mini.value = false;
} else {
  mini.value = width.value < 1536;
}

// controls dashboard mode
const minify = () => {
  mini.value = !mini.value;
};


function logout() {

  router.push("/"); // re-route to login page
}


const showNotificationList = ref(false);
const showLogoutConfirmationModal = ref(false);
</script>
<template>
  <div class="min-h-screen relative">
    <!-- /* ------------------------ Logout confirmation modal ----------------------- */ -->
    <h-confirm v-model="showLogoutConfirmationModal">
      <template #mainIcon>
        <div class="bg-red-200 p-2 rounded-full">
        <h1>geb</h1>
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
          class="outline-button !px-8"
        >
          No
        </button>
      </template>
      <template #trueButton>
        <button
          @click="logout()"
          class="outline-button bg-red-700 !border-red-700 text-white"
        >
          Log Out
        </button>
      </template>
    </h-confirm>
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
          hhhh
          </div>
        </TransitionChild>

        <div class="fixed inset-0 z-50 flex max-w-[300px] ">
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
              class="relative flex w-full flex-1 flex-col bg-secondary-dark-2 pt-5 md:pb-4"
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
                    <!-- <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" /> -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="text-white" viewBox="0 0 512 512"><path fill="currentColor" fill-rule="evenodd" d="M420.48 121.813L390.187 91.52L256 225.92L121.813 91.52L91.52 121.813L225.92 256L91.52 390.187l30.293 30.293L256 286.08l134.187 134.4l30.293-30.293L286.08 256z"/></svg>
                  </button>
                </div>
              </TransitionChild>
              <!-- /* ----------------------- Static sidebar for mobile ----------------------- */ -->
              <nuxt-link
                to="/app/"
                class="flex-shrink-0 my-8 z-50 flex-cols mx-auto space-y-1"
              >
                <img
                  class="h-8 w-auto mx-auto"
                  :src="hahu"
                  alt="HaHuJobs Logo"
                />
                <p class="text-secondary-6 text-sm">Primary</p>
              </nuxt-link>
              <div
                class="mt-2 w-full h-full flex flex-col justify-between  overflow-y-auto"
              >
                <nav class="space-y-6 px-5">
                 <nuxt-link
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              @click="handleclick(item.name)"
              :class="[
                currentPage === item.name
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'rounded-md px-3 py-2 text-sm font-medium',
              ]"
              :aria-current="currentPage === item.name ? 'page' : undefined"
            >
              {{ item.name }}
            </nuxt-link>
                </nav>
                <button
                  @click="showLogoutConfirmationModal = true"
                  class="w-full bg-secondary-6 dark:bg-hahu-gray text-white dark:text-secondary-7 flex items-center px-8 py-4 text-lg font-medium"
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

    <!-- /* -------------------------------------------------------------------------- */ -->
    <!-- /*                         Static sidebar for DESKTOP                         */ -->
    <!-- /* -------------------------------------------------------------------------- */ -->
    <div
      class="hidden lg:fixed mt-16 lg:inset-y-0 lg:flex lg:flex-col navAnimation"
      :class="mini ? 'w-20' : 'md:w-48'"
    >
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div
        class="relative flex min-h-0 flex-1 flex-col items-center  bg-neutral-950"
      >
        <!-- HaHu Logo -->
        <nuxt-link
          to="/app/"
          class="h-16 mt-8 flex-shrink-0 flex-cols items-center mx-auto space-y-3"
        >
         
          <div
         
          class=" bg-gray-500 hover:bg-primary-2  border flex w-12 aspect-square items-center justify-center rounded-full"
        >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"   
       viewBox="0 0 24 24"><path fill="currentColor" d="M12 12.75c3.942 0 7.987 2.563 8.249 7.712a.75.75 0 0 1-.71.787c-2.08.106-11.713.171-15.077 0a.75.75 0 0 1-.711-.787C4.013 15.314 8.058 12.75 12 12.75m0-9a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5"/></svg>             
             
            
        </div>
          
          <p
            class="text-primary -3 dark:text-secondary-6"
            :class="mini ? 'text-xs' : 'text-sm'"
          >
            Administrator
          </p>
        </nuxt-link>
        <!-- Toggle mini mode -->
        <div
          @click="minify"
          class="group bg-primary hover:bg-primary-2 absolute border z-10 top-[200PX] -right-[14px] flex w-7 aspect-square items-center justify-center rounded-full cursor-pointer"
        >
          <button class="shadow-none border-none">
            <svg xmlns="http://www.w3.org/2000/svg" :class="mini ? 'rotate-180' : ''" width="12" height="24" viewBox="0 0 12 24"><path fill="currentColor" fill-rule="evenodd" d="m3.343 12l7.071 7.071L9 20.485l-7.778-7.778a1 1 0 0 1 0-1.414L9 3.515l1.414 1.414z"/></svg>
             
             
            
          </button>
        </div>

        <!-- Divide line -->
        <div
          class="w-[80%] h-0.5 mx-auto mt-4"
        >
        </div>

        <div class="flex flex-col justify-between h-full mt-10 pb-14">
          <nav class="flex-1 space-y-5 px-2 py-4">
            <nuxt-link
                v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              @click="handleclick(item.name)"
              
              class="text-gray-300  hover:text-white rounded-md px-3 py-2 text-sm font-medium"
           
            >
              <!-- Mini version -->
              <span
                :title="item.name"
                v-if="mini"
                class="flex items-center justify-center h-8 w-8"
             
                aria-hidden="true"
              >
              </span>

              <!-- Full Version -->
              <!-- :class="[
                item.pageName == currentPage
                  ? 'text-white dark:text-secondary-11'
                  : 'text-white dark:text-secondary-11 group-hover:text-white dark:group-hover:text-secondary-11',
                'mr-6 flex-shrink-0 h-7 w-7 ',
              ]" -->
              <span v-else class="flex items-center gap-x-3"  :class="[
                currentPage === item.name
                  ? 'text-white  border-l-[4px] border-primary pl-1'
                  : 'text-white',
              ]">
                {{ item.name }}
              </span>
            </nuxt-link>
          </nav>
          <div class="flex justify-center">
            <button
            title="Log out"
            @click="showLogoutConfirmationModal = true"
            class=" bg-secondary-6 dark:bg-hahu-gray text-secondary-8 flex items-center gap-x-3 px-6 py-2 rounded-xl   text-base text-white bg-slate-700 "
            :class="mini ? 'justify-center' : ''"
          >
            <nuxt-icon name="logout" 
              :class="mini ? 'w-5' : 'w-7'"
              aria-hidden="true"
            />
            <p v-if="!mini">Log Out</p>
          </button>
          </div>
        
        </div>
      </div>
    </div>
    <div
      class="flex w-full flex-col h-screen overflow-hidden navAnimation"
     
    >
      <div
        class="fixed top-0 z-10 w-full flex h-16 flex-shrink-0 bg-amber-100 dark:bg-primary-dark shadow-lg"
      >
        <button
          type="button"
          class="pl-4 pr-2 text-gray-50 dark:text-secondary-11  focus:outline-none lg:hidden"
          @click="sidebarOpen = true"
        >
          <span class="sr-only">Open sidebar</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="text-black" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="square" stroke-linejoin="round" stroke-width="44" d="M102 256h308m-308-80h308M102 336h308"/></svg>      
             
        </button>
        <div
          class="flex flex-1 justify-between px-4 items-center text-center dark:text-secondary-11"
        >
          <div
            class="text-lg md:text-2xl lg:ml-3 3xl:ml-5 flex items-center gap-x-3"
          >
            <!-- <component :is="pageIcon" class="w-6"></component> -->
            <p>Geb</p>
          </div>
          <div class="ml-4 flex items-center md:ml-6">
          
            <div class="flex items-center space-x-4 md:mr-5">
              <div class="flex items-center">
                <button
                
                  title="Toggle dark and light mode"
                >
                <!-- <nuxt-link name="notification"/> -->
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M13 3a1 1 0 1 0-2 0v.75h-.557A4.214 4.214 0 0 0 6.237 7.7l-.221 3.534a7.4 7.4 0 0 1-1.308 3.754a1.617 1.617 0 0 0 1.135 2.529l3.407.408V19a2.75 2.75 0 1 0 5.5 0v-1.075l3.407-.409a1.617 1.617 0 0 0 1.135-2.528a7.4 7.4 0 0 1-1.308-3.754l-.221-3.533a4.214 4.214 0 0 0-4.206-3.951H13zm-2.557 2.25a2.714 2.714 0 0 0-2.709 2.544l-.22 3.534a8.9 8.9 0 0 1-1.574 4.516a.117.117 0 0 0 .082.183l3.737.449c1.489.178 2.993.178 4.482 0l3.737-.449a.117.117 0 0 0 .082-.183a8.9 8.9 0 0 1-1.573-4.516l-.221-3.534a2.714 2.714 0 0 0-2.709-2.544zm1.557 15c-.69 0-1.25-.56-1.25-1.25v-.75h2.5V19c0 .69-.56 1.25-1.25 1.25" clip-rule="evenodd"/></svg>
                 
                </button>
               
              </div>
              <!-- <div class="flex items-center text-primary"> -->
                <!-- <button @click="showTour()" title="Show Tour">
                  <InformationCircleIcon class="w-5 lg:w-6 stroke-2" />
                </button> -->
                <!-- <h3>hds</h3> -->
              <!-- </div> -->
              <!-- <button
                id="notification-button"
                type="button"
                title="Notifications"
                @click="showNotificationList = true"
                class="relative rounded-full bg-white dark:bg-primary-dark dark:text-secondary-11 p-1 text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <span class="sr-only">View notifications</span>
                <BellIcon
                  class="w-5 lg:w-6 text-primary stroke-2"
                  aria-hidden="true"
                />
                <div
                  v-if="notificationsCount > 0"
                  class="absolute index-50 w-6 text-[11px] md:h-6 h-5 -top-2 -right-2 bg-red-600 flex items-center justify-center text-white text-center rounded-full"
                >
                  {{ roundNumber(notificationsCount) }}
                </div>
              </button> -->

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
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12.75c3.942 0 7.987 2.563 8.249 7.712a.75.75 0 0 1-.71.787c-2.08.106-11.713.171-15.077 0a.75.75 0 0 1-.711-.787C4.013 15.314 8.058 12.75 12 12.75m0-9a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5"/></svg>

                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 9l6 6l6-6"/></svg>



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
                    class="absolute right-0 z-10 mt-2 w-48 overflow-clip origin-top-right rounded-md bg-secondary-8 dark:bg-secondary shadow-lg ring-1 ring-secondary ring-opacity-5 focus:outline-none divide divide-y-[1px] divide-secondary-7 dark:divide-secondary-3/10"
                  >
                    <MenuItem
                      v-for="item in userNavigation"
                      @click="navigate(item)"
                      :key="item.name"
                      class="menuItem"
                      :title="item.title"
                    >
                      <div class="menuItemButton group">
                        <div class="w-5 h-5">
                          
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

      <main
        class="h-screen overflow-y-auto pt-4 dark:bg-primary-dark 5xl:max-w-[1920px] !ml-0"
      >
      <NuxtPage/>
      </main>
    </div>
  </div>
</template>

