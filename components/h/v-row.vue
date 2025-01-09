<script setup>
import { _get } from "~/composables/functions/lodash";

const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
  header: {
    type: Object,
    default: () => ({}),
  },
});
</script>
<template>
  <slot :item="item" :name="header.value">
    {{ _get(item, header.value) || "-" }}
  </slot>
</template>