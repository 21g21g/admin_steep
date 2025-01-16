<script setup>
import {useRouteStore} from "~/stores/RouteStore" 
const props=defineProps({
    iconname:{
        type:String
    },
    title:{
        type:String,
        default:"dashboard"
    },
    classes:{
        type:String,
        
    }
})

const store=useRouteStore()
const handleRouteController=(value)=>{
    store.updatePage(value)

}
</script>

<template>
    <NuxtLink  :class="classes" :to="`/app/admin/${title.charAt(0).toLowerCase()}${title.substring(1)}`" @click="handleRouteController(props.title)" class="flex flex-col   ring ring-[#D1D5DB] hover:ring-primary ring-inset py-8 lg:mt-10 shadow-2xl shadow-[]#7A7A7A  px-10  rounded-lg group">
    <div class="flex flex-row items-center gap-x-2">
    <Icon  class="lg:w-12 h-12" :name="iconname"/>
    <h1 class="font-medium lg:text-4xl text-[#161344]">{{title}}</h1>
    </div>

    <div class="pt-12 ">
    <slot name="content" class="">

    </slot>
    </div>

    <div class="sticky flex justify-end pt-12">
    <Icon class="group-hover:text-primary" name="cil:arrow-right"/>
    
    </div>

   
    </NuxtLink>
</template>