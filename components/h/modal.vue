<script setup>
import {
  Dialog,
  TransitionRoot,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

const emits = defineEmits(["update:modelValue", "confirm"]);
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  wrapperClass: {
    type: String,
  },
  title: {
    type: String,
    default: "",
  },
  autoClose: {
    type: Boolean,
    default: false,
  },
  hasCloseIcon: {
    type: Boolean,
    default: false,
  },
  enabledOverflow: {
    type: Boolean,
    default: true,
  },
  mainClass: {
    type: String,
    default:
      "",
  },
});

const open = computed({
  get() {
    return props.modelValue;
  },
  set(newVal) {
    emits("update:modelValue", newVal);
  },
});
</script>
<template>
  <TransitionRoot as="template" :show="open">
    <Dialog
      as="div"
      class="relative z-[100] text-gray-900 dark:bg-secondary-dark-2 dark:text-white"
      @close="autoClose ? (open = false) : ''"
    >
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed  inset-0 transition-opacity  bg-white bg-opacity-20"
        />
        
      </TransitionChild>
      <DialogOverlay
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          />

      <div class="fixed  inset-0 z-10 overflow-y-auto">
        <div
          class="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              :class="[
                enabledOverflow ? 'overflow-visible' : 'overflow-hidden',
                props.wrapperClass ? props.wrapperClass : 'sm:max-w-xl',
                props.mainClass,
              ]"
            >
              <div
                class="absolute right-0  justify-between w-full px-5 lg:px-9 lg:pt-9 sm:flex"
              >
                <DialogTitle
                  as="h3"
                  class="flex-1 text-base font-semibold leading-6 text-gray-900"
                  ><slot name="Heading" />
                </DialogTitle>
              </div>
              <button
                v-if="hasCloseIcon"
                type="button"
                class="absolute lg:w-10 lg:h-10 text-gray-400 rounded-md right-6 shrink-0  hover:bg-primary focus:outline-none focus:ring-1 focus:ring-gray-100 hover:border"
                @click="open = false"
              >
                <span class="sr-only">Close</span>
                <Icon
                  name="ion:close-outline"
                  class="text-2xl hover:text-white lg:text text-gray-900 dark:text-white"
                />
              </button>
              <slot name="content" />
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>