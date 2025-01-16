<script setup>
import { ref, computed } from "vue";
import { usePagination } from "vue-composable";

const props = defineProps({
  modelValue: {
    type: Number,
    default: () => 1,
  },
  length: {
    type: Number,
    default: undefined,
    required: false,
  },
  disabled: {
    type: Boolean,
    default: false,
    required: false,
  },
  itemsPerPage: {
    type: Number,
    default: undefined,
    required: false,
  },
  totalData: {
    type: Number,
    default: undefined,
    required: false,
  },
  offset: {
    type: Number,
    default: undefined,
    required: false,
  },
});

const emit = defineEmits(["update:modelValue", "update:offset", "paginate"]);

const setEvents = () => {
  emit("paginate");
  emit("update:modelValue", pageTracker.value);
  emit("update:offset", offset.value);
};

const totalPages = computed(() => {
  if (props.length !== undefined) {
    return props.length / 1;
  } else if (
    props.totalData !== undefined &&
    props.itemsPerPage !== undefined
  ) {
    return Math.ceil(props.totalData / props.itemsPerPage);
  }
  return 0;
});

let pageTracker = ref(0);
if (props.offset === 0) {
  pageTracker.value = 1;
} else if (props.offset !== undefined) {
  pageTracker.value = Math.floor(props.offset / props.itemsPerPage);
} else {
  pageTracker.value = props.modelValue / 1;
}

// Functions two calculate direction of the dots
const offset = computed(() => {
  return (pageTracker.value - 1) * props.itemsPerPage;
});

const pageL1 = computed(() => {
  return pageTracker.value === 1;
});

const page3OR4 = computed(() => {
  return pageTracker.value === 3 || pageTracker.value === 4;
});

const pageBTN = computed(() => {
  return pageTracker.value >= 5 && pageTracker.value < totalPages.value - 2;
});

const pageLASTS = computed(() => {
  return pageTracker.value >= totalPages.value - 2;
});

const firsThree = computed(() => {
  return `${
    pageL1.value
      ? 3
      : page3OR4.value
      ? 5
      : pageBTN.value || pageLASTS.value
      ? 1
      : 3
  }`;
});

const lasThree = computed(() => {
  return pageL1.value
    ? totalPages.value - 2
    : page3OR4.value || pageBTN.value
    ? totalPages.value
    : pageLASTS.value
    ? totalPages.value - 4
    : totalPages.value - 2;
});

const middleStart = computed(() => {
  return pageBTN.value ? pageTracker.value - 1 : 0;
});

const middleEnd = computed(() => {
  return pageBTN.value ? pageTracker.value + 1 : 0;
});

const middleChecker = computed(() => {
  return pageBTN.value ? true : false;
});

const toggle = (n) => {
  pageTracker.value = n;
  setEvents();
};

const backward = () => {
  if (pageTracker.value > 1) {
    pageTracker.value--;
    setEvents();
  }
};

const forward = () => {
  if (pageTracker.value < totalPages.value) {
    pageTracker.value++;
    setEvents();
  }
};

const { prev, next } = usePagination({
  currentPage: pageTracker.value,
  pageSize: totalPages.value,
});

const range = (start, end) => {
  return Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);
};
</script>

<template>
  <div>
    <div
      v-if="totalPages > 0"
      class="flex flex-wrap justify-between w-full pb-2 border-t-2"
    >
      <div>
        <div
          href="#"
          class="relative inline-flex items-center py-2 text-sm font-medium text-gray-500 cursor-pointer sm:px-2 hover:text-Primary-400"
          :class="
            pageTracker === 1 || props.disabled
              ? 'text-gray-300 pointer-events-none'
              : ''
          "
          @click="
            prev();
            backward();
          "
        >
          <Icon class="w-6 h-5" name="material-symbols:arrow-back-ios" />
          <!-- <span class="hidden ml-5 sm:block">Previous</span> -->
        </div>
      </div>

      <div
        class="relative z-0 inline-flex -space-x-px -top-0.5"
        aria-label="Pagination"
      >
        <div
          v-for="n in totalPages"
          v-show="totalPages <= 7"
          :key="n"
          href="#"
          aria-current="page"
          class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 cursor-pointer dark:text-Primary-600 hover:text-Primary-400"
          :class="{
            ' border-t-2 px-2 z-10 text-Primary-600 border-Primary-600 ':
              n === pageTracker,
            'text-gray-300  pointer-events-none': props.disabled,
          }"
          :disabled="props.disabled ? 'pointer-events-none' : ''"
          @click="toggle(n)"
        >
          {{ n }}
        </div>

        <div
          v-for="n in range(1, firsThree)"
          v-show="totalPages > 7"
          :key="n"
          href="#"
          aria-current="page"
          class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500"
          :class="{
            ' border-t-2 px-2 z-10 text-Primary-600 border-Primary-600':
              n === pageTracker,
            'text-gray-300 pointer-events-none': props.disabled,
          }"
          @click="toggle(n)"
        >
          {{ n }}
        </div>
        <div
          v-show="totalPages > 7"
          v-if="middleChecker"
          href="#"
          aria-current="page"
          class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500"
          :class="{
            'text-gray-300 pointer-events-none': props.disabled,
          }"
        >
          ...
        </div>
        <!-- <div > -->
        <div
          v-for="n in range(middleStart, middleEnd)"
          v-show="pageTracker > 4 && pageTracker < totalPages - 2"
          :key="n"
          href="#"
          aria-current="page"
          class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500"
          :class="{
            'border-t-2 px-2 z-10 text-Primary-600 border-Primary-600':
              n === pageTracker,
            'text-gray-300 pointer-events-none': props.disabled,
          }"
          @click="toggle(n)"
        >
          {{ n }}
        </div>
        <!-- </div> -->
        <div
          v-show="totalPages > 7"
          href="#"
          aria-current="page"
          class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500"
          :class="{
            'text-gray-300 pointer-events-none': props.disabled,
          }"
        >
          ...
        </div>
        <div
          v-for="n in range(lasThree, totalPages)"
          v-show="totalPages > 7"
          :key="n"
          href="#"
          aria-current="page"
          class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500"
          :class="{
            'border-t-2 px-2 z-10 text-Primary-600 border-Primary-600':
              n === pageTracker,
            'text-gray-300 pointer-events-none': props.disabled,
          }"
          @click="toggle(n)"
        >
          {{ n }}
        </div>
      </div>
      <div>
        <div
          href="#"
          class="relative inline-flex items-center py-2 text-sm font-medium text-gray-500 cursor-pointer sm:px-2 hover:text-secondary-9 hover:text-Primary-400"
          :class="
            pageTracker === totalPages || props.disabled
              ? 'text-gray-300 pointer-events-none'
              : ''
          "
          @click="
            next();
            forward();
          "
          
        >
          <!-- <span class="hidden mr-5 sm:block">Next</span> -->
           <span class="hidden mr-5  sm:block">         
             <Icon class="w-6 h-5" name="mdi:dots-horizontal" />
           </span>
          <Icon class="w-6 h-5" name="solar:alt-arrow-right-outline" />
        </div>
      </div>
    </div>
    <div v-else class="flex flex-wrap justify-between mx-10">
      <div>
        <div
          href="#"
          class="relative inline-flex items-center px-2 py-2 mr-2 text-sm font-medium text-gray-300 cursor-pointer pointer-events-none hover:text-Primary-400"
        >
          <Icon class="w-5 h-5" name="material-symbols:arrow-back-ios" />
          <!-- <span class="hidden ml-5 sm:block">Previous</span> -->
        </div>
      </div>
      <div>
        <div
          href="#"
          class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-300 cursor-pointer pointer-events-none hover:text-Primary-400"
        >
          <span class="hidden mr-5 sm:block">Next</span>
          <Icon class="w-5 h-5" name="solar:alt-arrow-right-outline" />
        </div>
      </div>
    </div>
  </div>
</template>