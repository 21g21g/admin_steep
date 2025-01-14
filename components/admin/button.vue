<script setup>
const props=defineProps({
    iconName:{
        type:String,
        required:false
    },
    buttonLabel:{
        type:String
    },
    buttnClass:{
        type:String
    }
})
</script>

  <template>
    <button class="flex items-center gap-x-3 rounded-3xl bg-primary px-5 py-3 text-white font-medium">
        <Icon v-if="iconName" :name="iconName" class="text-white"/>
        <span class="text-white font-medium">{{ buttonLabel }}</span>

    </button>
</template>