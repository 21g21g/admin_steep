<script setup>
import { ref, watch, toRefs, onMounted } from "vue";
import { useField } from "vee-validate";

import { useDebounceFn } from "@vueuse/core";

const props = defineProps({
  id: String,
  leadingIcon: Function,
  trailingIcon: String,
  query: Object,
  items: {
    type: Array,
    default: () => [],
  },
  placeholder: String,
  label: String,
  labelClass: String,
  clearable: Boolean,
  returnObject: Boolean,
  modelValue: {
    type: [String, Number, Object, Boolean],
    default: undefined,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
    required: false,
  },
  labelClass: {
    type: String,
    default: "",
    required: false,
  },
  rules: {
    type: [String, Object],
    default: "",
    required: false,
  },
  class: {
    type: String,
    default: "",
    required: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  showStar: {
    type: Boolean,
    default: false,
  },
  listHeight: String,
  placeholderStyle: String,
  hideDetail: {
    type: Boolean,
    default: true,
    required: false,
  },
});

const emit = defineEmits(["update:modelValue", "returnedObject"]);
const selected = ref("");
const { items } = toRefs(props) || [];
const show = ref(false);
const placeholder = ref("");
const input = ref(null);
const {
  errorMessage,
  value: inputValue,
  meta,
} = useField(props.name, props.rules, {
  initialValue: props.modelValue,
});

const outside = useDebounceFn(() => {
  show.value = false;
}, 300);

const set = (item) => {
  inputValue.value = item["id"];
  show.value = false;
  placeholder.value=item.name
  
  if (props.returnObject) {
    emit("update:modelValue", item);
  } else {
    emit("update:modelValue", item.id);
    emit("returnedObject", item);
    selected.value = item.id;
  }
};
const clear = () => {
  placeholder.value = undefined;
  inputValue.value = "";
  show.value = false;
  input.value.focus();
  emit("update:modelValue", undefined);
};

// watch(
//   () => props.modelValue,
//   (newVal) => {
//     inputValue.value = newVal;
//     selected.value = newVal;
//     let selectedItem = props.items.find((item) => item.id == newVal);
//     if (selectedItem) {
//       placeholder.value = selectedItem.name;
//     }
//   }
// );

onMounted(() => {
  let selectedItem = props.items.find((item) => item.id == props.modelValue);
  if (selectedItem) {
    inputValue.value = selectedItem.id;
    selected.value = props.modelValue;
    placeholder.value = selectedItem.name;
  }
});
</script>
<template>
  <div class="relative">
    <div class="relative flex gap-x-2 w-fit">
      <slot name="label"> </slot>
      <span v-if="props.showStar" class="absolute text-red-600 -right-3 top-2"
        >*</span
      >
    </div>
    <div class="relative rounded-md font-body">
      <div
        v-if="leadingIcon && !disabled"
        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
      >
        <Icon class="text-gray-300 h-7 w-7" :name="leadingIcon"></Icon>
      </div>
      <input
        ref="input"
        v-model="placeholder"
        @click="show = true"
        @focus="show = true"
        @blur="outside"
        autocomplete="off"
        :type="type"
        :placeholder="props.placeholder || 'Select'"
        :name="props.name"
        :id="id"
        class="block w-full pr-10 text-sm transition-all duration-300 border py-3 mt-3 rounded-md dark:bg-slate-300 focus:outline-none md:text-base dark:text-gray-900 dark:placeholder:text-gray-900"
        :class="[
          errorMessage
            ? 'focus:ring-red-500 focus:border-red-500 hover:border-red-500 border-red-500 '
            : 'focus:ring-gray-400 focus:border-gray-600 hover:border-gray-600 border-gray-300 border-1 ',
          disabled ? ' bg-gray-100 cursor-not-allowed' : '',
          props.class ? props.class : '',
          props.placeholderStyle
            ? props.placeholderStyle
            : ' placeholder-gray-200',
        ]"
        :disabled="disabled"
        aria-invalid="true"
        aria-describedby="email-error"
      />
      <!-- icon -->
      <div
        class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
      >
        <Icon
          name="tabler:chevron-down"
          class="w-[25px] h-[25px] text-gray-500 cursor-pointer"
          :class="trailingIcon"
        />
      </div>
      <div
        v-if="clearable && !disabled"
        @click="clear"
        class="absolute inset-y-0 right-0 flex items-center pr-3"
      >
        <Icon
          name="gg:close"
          class="w-[25px] h-[25px] text-gray-500 cursor-pointer"
          :class="trailingIcon"
        />
      </div>
    </div>
    <ul
      v-show="show"
      class="absolute z-50 overflow-y-scroll overflow-x-hidden w-full bg-white border border-gray-300 shadow max-h-56 min-w-[150px] h-auto rounded-md text-base"
      :class="listHeight ? listHeight : ''"
    >
      <li
        v-for="item in items"
        :key="item.id"
        @click="set(item)"
        :class="{ 'bg-blue-50 ': selected == item.id }"
        class="relative px-3 py-3 overflow-auto border-b border-gray-200 cursor-pointer select-none hover:bg-gray-100 text-secondary"
      >
        <div
          class="flex items-center justify-between"
          :class="[
            labelClass
              ? labelClass
              : 'text-secondary font-normal block font-body',
          ]"
        >
          <span class="block capitalize break-words">{{ item.name }}</span>
          <div class="flex space-x-1">
            <p class="text-sm font-light text-secondary" v-if="item.identifier">
              {{ item.identifier }}
            </p>
            <Icon
              v-if="placeholder == item.name"
              name="ic:round-check"
              width="25"
              height="25"
              color="#535576"
              class="cursor-pointer"
            />
          </div>
        </div>
      </li>
    </ul>
    <p
      class="col-span-5 mt-1 text-sm text-red-600 transition-all duration-300 font-body"
      :visible="errorMessage"
      :class="errorMessage ? 'h-5' : 'h-0'"
      id="email-error"
    >
      {{ errorMessage }} &nbsp;
    </p>
  </div>
</template>
<style scoped>
.zz {
  z-index: 99;
}

::-webkit-scrollbar {
  width: 4px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px white;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #d6d6e1;
  border-radius: 3px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #d6d6e1;
}
</style>
