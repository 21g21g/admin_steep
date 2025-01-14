<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const emits = defineEmits(["refetchCount", "closeNotificationList"]);
const props = defineProps({
    notification: {
        type: Object,
        required: true,
    },
    notificationIcon: {
        type: Function,
        required: true,
    },
    notificationRoute: {
        type: String,
        required: false,
    },
});

console.log("Notification Object:", props.notification);
</script>

<template>
    <!-- Check if notification exists -->
    <div>
        <div class="flex gap-x-8  items-center">
            <div class="bg-primary-4 rounded-full px-2 py-1">
                <Icon class="w-4 h-4" :name="notification.leadingIcon" />
            </div>
            <div class="flex  flex-col gap-y-2">
                <div class="flex justify-between">
                    <div>
                        <h1 class="text-lg text-[#222324] ">{{ notification.title }}</h1>
                    </div>
                    <p class="text-[#7A7A7A] text-xs">
                        {{ notification.created_at }}
                    </p>
                </div>
                <div class="flex space-x-1">
                    <!-- Notification Remark -->
                    <div v-html="notification.remark" class="text-[#7A7A7A] text-sm">

                    </div>
                    <div class="ml-auto w-fit group-hover:hidden">
                        {{ notification.status }}
                    </div>

                </div>
                <div>
                    <button class="text-primary">View Now</button>
                </div>
            </div>

        </div>
     
    </div>
</template>
