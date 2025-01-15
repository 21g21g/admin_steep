<script setup>
import { watch } from 'vue'
import { useField } from 'vee-validate'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: undefined,
    },
    name: {
        type: String,
        default: undefined,
        required: true,
    },
    id: {
        type: String,
        default: undefined,
        required: false,
    },
    type: {
        type: String,
        default: 'text',
        required: false,
    },
    maxlength: {
        type: Number,
        default: 400,
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
        default: () => '',
        required: false,
    },
    trailingIcon: {
        type: Function,
        default: undefined,
        required: false,
    },
    rows: {
        type: Number,
        default: 6,
    },
    rules: {
        type: String,
        default: '',
        required: false,
    },
})
const { errorMessage, value: inputValue, meta } = useField(
    props.name,
    props.rules,
    {
        initialValue: props.modelValue,
    },
)

const set = (event) => {
    emit('update:modelValue', event.target.value)
}
watch(
    () => props.modelValue,
    (newVal) => {
        inputValue.value = newVal
    },
)
</script>
<template>
    <div>
        <label :for="id" :class="labelClass" class="block">{{ label }}</label>
        <div class="mt-1 relative rounded-md shadow-sm">
            <textarea v-model="inputValue" @input="set($event)" :type="type" :name="name" :rows="rows"
                class="block border-2  w-full pr-10 text-hahu-gray dark:text-white : placeholder-gray-400 p-2 dark:bg-hahu-gray focus:outline-none text-base rounded-md"
                :placeholder="placeholder" aria-invalid="true" aria-describedby="email-error" />
            <p class="absolute right-0 mt-2 text-sm text-black/50 dark:text-white/50" id="email-error">
                {{ (inputValue?.length || 0) + '/' + maxlength }} &nbsp;
            </p>
        </div>
        <p :visible="errorMessage" class="mt-2 text-sm text-red-600" id="email-error">
            {{ errorMessage }} &nbsp;
        </p>
    </div>
</template>