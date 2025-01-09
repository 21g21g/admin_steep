<script setup>
import { useField } from "vee-validate";
const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: undefined,
  },
  name: {
    type: String,
    default: undefined,
    required: false,
  },
  id: {
    type: String,
    default: undefined,
    required: false,
  },

  type: {
    type: String,
    default: "text",
    required: false,
  },
  placeholder: {
    type: String,
    default: undefined,
    required: false,
  },
  label: {
    type: String,
    default: undefined,
    required: false,
  },
  labelClass: {
    type: String,
    default: () => "",
    required: false,
  },
  hideDetail: {
    type: Boolean,
    default: false,
    required: false,
  },
  trailingIcon: {
    type: String,
    default: "",
    required: false,
  },
  leadingIcon: {
    type: [String],
    default: undefined,
    required: false,
  },
  leadingIconClass: {
    type: [String],
  },
  min: String,
  max: String,
  rules: {
    type: [String, Object],
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
  class: String,
  iconLeadingClass: String,
  placeholderStyle: String,
  iconBackground: Boolean,
  mainDiv: String,
  overflow: String,
});
const emit = defineEmits(["update:modelValue"]);

const {
  errorMessage,
  value: inputValue,
  meta,
} = useField(props.name, props.rules, {
  initialValue: props.modelValue,
});

const type = ref(props.type);

const set = (event) => {
  if (props.type == "number") {
    emit("update:modelValue", Number(event.target.value));
    return;
  }
  emit("update:modelValue", event.target.value);
};

const togglePassword = (enabled) => {
  if (type.value === "password") {
    type.value = "text";
    return;
  }
  if (type.value === "text") {
    type.value = "password";
  }
};

// watch(
//   () => props.modelValue,
//   (newVal) => {
//     inputValue.value = props.type == "number" ? Number(newVal) : newVal;
//   }
// );

watch(
  () => props.modelValue,
  (newVal) => {
    inputValue.value = newVal;
  }
);

const clear = () => {
  inputValue.value = "";
  emit("update:modelValue", undefined);
};
</script>
<template>
  <div :class="mainDiv">
    <div class="relative flex gap-x-1 w-fit">
      <slot name="label" class=""></slot>
      <span v-show="props.showStar" class="absolute text-red-500 -right-3 top-2"
        >*</span
      >
    </div>
    <div
      class="relative flex items-center rounded-md overflow-clip font-body group"
      :class="props.overflow"
    >
      <slot name="leading" />
      <h1
        v-if="iconBackground"
        class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500"
      >
        {{ leadingIcon }}
      </h1>
      <div v-else>
        <Icon
          :name="leadingIcon"
          class="absolute px-3 text-gray-300"
          size="45"
          v-if="leadingIcon"
          :class="leadingIconClass"
        />
      </div>

      <input
        v-model="inputValue"
        @input="set($event)"
        @change="set($event)"
        :min="min"
        :max="max"
        :type="type"
        :name="props.name"
        step="any"
        :id="id"
        :class="[
          errorMessage
            ? 'border-red-500 border hover:border-red-500 focus:border-red-500 focus:ring-red-500'
            : 'border-[1px]  border-gray-300 group-hover:border-gray-500 focus:border-gray-600 focus:ring-gray-600 disabled:bg-gray-100 disabled:cursor-not-allowed',
          props.iconLeadingClass ? props.iconLeadingClass : '',
          props.leadingIcon ? 'pl-10' : '',
          props.class ? props.class : '',
          props.placeholderStyle
            ? props.placeholderStyle
            : ' placeholder:text-gray-300 dark:placeholder:text-gray-300',
          props.trailingIcon ? 'pr-7' : '',
          props.type == 'password' ? 'pr-7' : '',
        ]"
        class="block w-80 text-base text-gray-800 dark:bg-gray-700 dark:text-gray-300 placeholder-gray-300 dark:placeholder-secondary p-1 transition-all duration-300 rounded-md font-body focus:outline-none"
        :placeholder="props.placeholder"
        aria-invalid="true"
        aria-describedby="email-error"
        :disabled="props.disabled"
      />
      <div
        v-if="inputValue"
        class="absolute inset-y-0 right-0 flex items-center pr-3 hover:cursor-pointer"
        @click="clear()"
      >
        <Icon class="w-5 h-5 text-gray-300" name="mdi:close" size="25"></Icon>
      </div>

      <div
        v-if="props.type == 'password'"
        class="absolute inset-y-0 right-0 flex items-center pr-3 hover:cursor-pointer"
        @click="togglePassword()"
      >
        <Icon
          v-if="type === 'password'"
          class="w-5 h-5 text-gray-300"
          name="mdi:eye"
          size="25"
        ></Icon>
        <Icon
          v-else
          class="w-5 h-5 text-gray-300"
          name="mdi:eye-off"
          size="25"
        ></Icon>
      </div>
      <div
        v-else-if="props.trailingIcon"
        class="absolute inset-y-0 md:right-[62rem] flex items-center pr-3 hover:cursor-pointer"
      >
        <Icon
          class="text-black dark:text-black"
          :name="props.trailingIcon"
          size="20"
        ></Icon>
      </div>
      <div
        class="absolute inset-y-0 right-0  flex items-center p-2 pr-3 hover:cursor-pointer"
      >
        <slot name="trailing" />
      </div>
    </div>
    <p
      class="col-span-5 mt-1 text-sm text-red-600 transition-all duration-300 font-body"
      :class="errorMessage ? 'h-5' : 'h-0'"
      id="email-error"
      :visible="errorMessage"
    >
      {{ errorMessage }} &nbsp;
    </p>
  </div>
</template>