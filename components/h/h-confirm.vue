<script setup>
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  hasCloseIcon: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["change", "update:modelValue"]);

const changeTrue = () => {
  emit("change", true);
  emit("update:modelValue", false);
};
const changeFalse = () => {
  emit("change", false);
  emit("update:modelValue", false);
};
</script>

<template>
  <TransitionRoot as="template" :show="modelValue">
    <Dialog as="div" class="fixed z-50 inset-0 overflow-y-auto">
      <div
        class="relative flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
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
          <DialogOverlay
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          />
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
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
          <div
            class=" inline-block align-bottom bg-white dark:bg-secondary rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          >
          <button v-if="hasCloseIcon" @click="changeFalse" class="absolute top-4 right-4">
         geb
          </button>
            <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div
                  class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10"
                >
                  <slot name="mainIcon"></slot>
                </div>
                <div class="mt-1 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle
                    as="h3"
                    class="text-lg leading-6 font-medium text-gray-900 dark:text-secondary-7"
                  >
                    <slot name="title"></slot>
                  </DialogTitle>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500 dark:text-secondary-4 font-body">
                      <slot name="message"></slot>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="px-4 py-3 flex flex-row-reverse gap-4">
              <slot :changeTrue="changeTrue" name="trueButton"></slot>
              <slot :changeFalse="changeFalse" name="falseButton"></slot>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
