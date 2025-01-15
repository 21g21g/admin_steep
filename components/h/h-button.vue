<script setup>
const props = defineProps({
  iconName: {
    type: String,
    required: false,
  },
  buttonLabel: {
    type: String,
    required: true,
  },
  buttonClass: {
    type: String,
    required: false,
    default: "",
  },
});
</script>

<template>
  <button
    :class="`flex items-center gap-x-2 sm:gap-x-3  rounded-3xl bg-primary px-4 sm:px-5 py-2 sm:py-3 text-white font-medium  transition-all duration-300 ${buttonClass}`"
  >
    <Icon
      v-if="iconName"
      :name="iconName"
      class="text-white text-sm sm:text-base lg:text-lg"
    />
    <span
      class="text-xs  md:text-sm lg:text-base  font-medium"
    >
      {{ buttonLabel }}
    </span>
  </button>
</template>
