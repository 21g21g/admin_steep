<script setup>
definePageMeta({
    layout:"admin"
})
</script>

<template>
    <div class=" flex flex-col  lg:px-10">
    <div class="flex flex-row gap-x-10 ">
     <AdminCard iconname="bi:printer-fill" title="Interventions" classes="w-[35%]">
    <template  #content>
    <div class="flex flex-row gap-x-14">
     <div class="flex flex-col gap-y-10 ">
    <h1 class="font-bold lg:text-5xl text-[#161344]">14
    </h1>
    <h2 class="text-[#161344] lg:text-lg">Intervention Types</h2>
    </div>
    <div class="border border-r-2 h-24 border-[#D1D5DB]">
    </div>
     <div class="flex flex-col gap-y-10">
     <h1 class="font-bold lg:text-5xl text-[#161344]">20
    </h1>
    <h2 class="text-[#161344] lg:text-lg">Intervention Categories</h2>
    </div>
    </div>
   
    
     

    </template>
    
    </AdminCard>

     <AdminCard iconname="gridicons:location" title="Address" classes="w-[54%]">
    <template  #content>
    <div class="flex flex-row gap-x-16">
     <div class="flex flex-col gap-y-10 ">
    <h1 class="font-bold lg:text-5xl text-[#161344]">14
    </h1>
    <h2 class="text-[#161344] lg:text-lg">Region/City</h2>
    </div>
    <div class="border border-r-2 h-24 border-[#D1D5DB]">
    </div>
     <div class="flex flex-col gap-y-10 lg:ml-10">
     <h1 class="font-bold lg:text-5xl text-[#161344]">7
    </h1>
    <h2 class="text-[#161344] lg:text-lg">Zone/SubCity</h2>
    </div>
    <div class="border border-r-2 h-24 border-[#D1D5DB]">
    </div>
     <div class="flex flex-col gap-y-10 lg:ml-8">
     <h1 class="font-bold lg:text-5xl text-[#161344]">11
    </h1>
    <h2 class="text-[#161344] lg:text-lg">Woreda/Town</h2>
    </div>
    </div>
   
    
     

    </template>
    
    </AdminCard>
   
    </div>
    <div class="flex flex-row gap-x-28 ">

     <AdminCard iconname="arcticons:rakuten-link-supporter" title="Support" classes="w-[60%]">
    <template  #content>
    <div class="flex flex-row gap-x-14">
     <div class="flex flex-col gap-y-10 ">
    <h1 class="font-bold lg:text-5xl text-[#161344]">14
    </h1>
    <h2 class="text-[#161344] lg:text-lg">Training</h2>
    </div>
    <div class="border border-r-2 h-24 border-[#D1D5DB]">
    </div>
     <div class="flex flex-col gap-y-10">
     <h1 class="font-bold lg:text-5xl text-[#161344]">7
    </h1>
    <h2 class="text-[#161344] lg:text-lg">Access to Finance</h2>
    </div>
    <div class="border border-r-2 h-24 border-[#D1D5DB]">
    </div>
     <div class="flex flex-col gap-y-10">
     <h1 class="font-bold lg:text-5xl text-[#161344]">11
    </h1>
    <h2 class="text-[#161344] lg:text-lg">BDS</h2>
    </div>
      <div class="border border-r-2 h-24 border-[#D1D5DB]">
    </div>
      <div class="flex flex-col gap-y-10">
     <h1 class="font-bold lg:text-5xl text-[#161344]">4
    </h1>
    <h2 class="text-[#161344] lg:text-lg">Job Placement</h2>
    </div>
    </div>
   
    
     

    </template>
    
    </AdminCard>
    
    <AdminCard iconname="flowbite:users-solid" title="Users" classes="w-[25%]">
    <template  #content>
    <div class="flex flex-row gap-x-14 ">
     <div class="flex flex-col gap-y-10 items-center justify-center w-full">
    <h1 class="font-bold lg:text-5xl text-[#161344]">4
    </h1>
    <h2 class="text-[#161344] lg:text-lg">Users</h2>
    </div>
  
    </div>
   
    
     

    </template>
    
    </AdminCard>

    </div>
   


    </div>
</template>
