<script setup>

definePageMeta({
    layout:"admin"
})
</script>

<template>
<div class="flex flex-col pb-4 px-4 md:pb-0 md:pl-24 md:pr-3 space-y-8">
  <div class="flex flex-wrap gap-6">
    <AdminCard iconname="heroicons:rectangle-stack-solid" title="Interventions" classes="lg:w-[35%] w-full md:w-[48%]">
      <template #content>
        <div class="flex flex-col ml-8 lg:flex-row gap-6 2xl:gap-x-10">
          <div class="flex flex-col gap-y-2 2xl:gap-y-16">
            <h1 class="font-bold text-3xl lg:text-5xl text-[#161344]">14</h1>
            <h2 class="text-[#161344] text-base lg:text-lg">Intervention Types</h2>
          </div>
          <div class="border border-r-2  lg:h-24 border-[#D1D5DB]"></div>
          <div class="flex flex-col gap-y-2 2xl:gap-y-16">
            <h1 class="font-bold text-3xl lg:text-5xl text-[#161344]">20</h1>
            <h2 class="text-[#161344] text-base lg:text-lg">Intervention Categories</h2>
          </div>
        </div>
      </template>
    </AdminCard>

    <AdminCard iconname="gridicons:location" title="Address" classes="lg:w-[54%] w-full md:w-[48%]">
      <template #content>
        <div class="flex flex-col  ml-8 lg:flex-row gap-6 2xl:gap-x-12 3xl:gap-x-16 4xl:gap-x-24">
          <div class="flex flex-col gap-y-2 2xl:gap-y-16">
            <h1 class="font-bold text-3xl 2xl:text-5xl text-[#161344]">14</h1>
            <h2 class="text-[#161344] text-base lg:text-lg">Region/City</h2>
          </div>
          <div class="border border-r-2  lg:h-24 border-[#D1D5DB]"></div>
          <div class="flex flex-col gap-y-2 2xl:gap-y-16">
            <h1 class="font-bold text-3xl xl:text-5xl text-[#161344]">7</h1>
            <h2 class="text-[#161344] text-base lg:text-lg">Zone/SubCity</h2>
          </div>
          <div class="border border-r-2  lg:h-24 border-[#D1D5DB]"></div>
          <div class="flex flex-col gap-y-2 2xl:gap-y-16">
            <h1 class="font-bold text-3xl xl:text-5xl text-[#161344]">11</h1>
            <h2 class="text-[#161344] text-base lg:text-lg">Woreda/Town</h2>
          </div>
        </div>
      </template>
    </AdminCard>
  </div>

  <div class="flex flex-wrap gap-24">
    <AdminCard iconname="arcticons:rakuten-link-supporter" title="Support" classes="w-full lg:w-[60%]">
      <template #content>
        <div class="flex flex-col  ml-8 lg:flex-row gap-6 2xl:gap-x-12 3xl:gap-x-12 4xl:gap-x-16">
          <div class="flex flex-col gap-y-2 2xl:gap-y-16">
            <h1 class="font-bold text-3xl xl:text-5xl text-[#161344]">14</h1>
            <h2 class="text-[#161344] text-base lg:text-lg">Training</h2>
          </div>
          <div class="border border-r-2  lg:h-24 border-[#D1D5DB]"></div>
          <div class="flex flex-col gap-y-2 2xl:gap-y-16">
            <h1 class="font-bold text-3xl xl:text-5xl text-[#161344]">7</h1>
            <h2 class="text-[#161344] text-base lg:text-lg">Access to Finance</h2>
          </div>
          <div class="border border-r-2  lg:h-24 border-[#D1D5DB]"></div>
          <div class="flex flex-col gap-y-2 2xl:gap-y-16">
            <h1 class="font-bold text-3xl xl:text-5xl text-[#161344]">11</h1>
            <h2 class="text-[#161344] text-base lg:text-lg">BDS</h2>
          </div>
          <div class="border border-r-2  lg:h-24 border-[#D1D5DB]"></div>
          <div class="flex flex-col gap-y-2 2xl:gap-y-16">
            <h1 class="font-bold text-3xl xl:text-5xl text-[#161344]">4</h1>
            <h2 class="text-[#161344] text-base lg:text-lg">Job Placement</h2>
          </div>
        </div>
      </template>
    </AdminCard>

    
    <AdminCard iconname="flowbite:users-solid" title="Users" classes="w-full lg:w-[25%]">
      <template #content>
        <div class="flex items-center justify-center w-full">
          <div class="flex flex-col items-center gap-y-2 2xl:gap-y-16">
            <h1 class="font-bold text-3xl lg:text-5xl text-[#161344]">4</h1>
            <h2 class="text-[#161344] text-base lg:text-lg">Users</h2>
          </div>
        </div>
      </template>
    </AdminCard>
  </div>
</div>
</template>
