<script setup>
const props=defineProps({
    iconName:{
        type:String
    },
    buttonLabel:{
        type:String
    }
})
</script>

  <template>
    <button class="flex items-center gap-x-3 rounded-2xl bg-primary px-3 py-1 text-white font-medium">
        <Icon :name="iconName" class="text-white"/>
        <span class="text-white font-medium">{{ buttonLabel }}</span>

    </button>
</template>