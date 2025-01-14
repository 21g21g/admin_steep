<script setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";

/*-------------------------Globals--------------------*/

const emit = defineEmits(["update:currentTabIndex"]);
const props = defineProps({
  tabs: {
    type: Array,
    default: () => [],
  },

  currentTabIndex: {
    type: Number,
    default: 0,
    required: false,
  },
  tabTextClass: String,
  tabGroupClass: String,
  tabListClass: String,
});

/*............Tab ............*/
const selectedTab = ref(props.currentTabIndex);
const indicator = ref(null);
const indicatorContainer = ref(null);

function tabWidth() {
  const element = document.getElementById(`tab-${selectedTab.value}`);
  return element.offsetWidth;
}
function changeTab(index) {
  selectedTab.value = index;
  moveIndicator();
  emit("update:currentTabIndex", index);
}

const moveIndicator = () => {
  const element = document.getElementById(`tab-${selectedTab.value}`);
  const rect = element.getBoundingClientRect();
  const position = rect.left + window.pageXOffset;
  indicator.value.style.left = `${
    position - indicatorContainer.value.getBoundingClientRect().left
  }px`;
  indicator.value.style.width = `${tabWidth()}px`;
};

watch(
  () => props.currentTabIndex,
  (newValue) => {
    selectedTab.value = props.currentTabIndex;
    moveIndicator();
  }
);

onMounted(() => {
  setTimeout(() => {
    moveIndicator();
  }, 100);
});
</script>

<template>
  <ClientOnly>
    <TabGroup
      :class="tabGroupClass"
      :selectedIndex="selectedTab"
      @change="changeTab"
      as="div"
     
    >
      <TabList
        @scroll="moveIndicator"
        as="div"
        class="flex space-x-4 overflow-hidden iphone5:justify-between lg:justify-start scroll lg:space-x-36"
        :class="tabListClass"
      >
        <Tab
          :id="`tab-${index}`"
          :class="[
            selectedTab === index
              ? '!text-primary underline'
              : 'text-gray-600 dark:text-white',
            'outline-none flex gap-x-4 items-center  focus:outline-none duration-500 ease-in-out leading-none  md:text-base cursor-pointer whitespace-nowrap',
            tabTextClass,
          ]"
          as="div"
          v-for="(tab, index) in tabs"
          :key="tab.value"
        >
          <slot
            name="tab"
            :tabData="{
              tab: tab,
              isActive: selectedTab === index,
            }"
          >
            <Icon v-if="tab.icon" :name="tab.icon" class="text" />
            <span>{{ tab.name }}</span>
          </slot>
        </Tab>
      </TabList>
      <div
        ref="indicatorContainer"
        class="relative w-full py-2 overflow-hidden border-b xl:py-2"
      >
        <div
          ref="indicator"
          class="absolute top-3.5 z-50 left-0 h-[2px] duration-200 bg-Primary-500"
        ></div>
      </div>

      <TabPanels as="div">
        <TabPanel as="div" v-for="tab in tabs" :key="tab.value">
          <slot :name="tab.value"></slot>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </ClientOnly>
</template>
