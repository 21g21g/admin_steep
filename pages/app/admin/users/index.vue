<script setup>

import { useForm } from 'vee-validate';


definePageMeta({
    layout:"admin"
})
const sort = ref([
    { label: 'Ascending', value: 'asc' },
    { label: 'Descending', value: 'desc' },
]);

const { handleSubmit } = useForm();



// dummy data for users table row

const DummyData = ref([
    {
        id: 1,
        name: "Abebe Kebede",
        email: "admin.@firstconsultet.com",
        partner: "First Consult",
        createdAt: "2025-01-01",
        actions: "icon",
    },
    {
        id: 2,
        name: "Kebede Beki",
        email: "admin.@minabtech.com",
        partner: "Minab Tech",
        createdAt: "2025-01-05",
        actions: "icon",
    },
    {
        id: 3,
        name: "Leul Welday",
        email: "leul.welday@hahiu.jobs",
        partner: "HahuJobs",
        createdAt: "2025-01-10",
        actions: "icon",
    },
    

]);
//dummy data for select dropdown
const dropdownItems = [
  { id: 1, name: "partner 1", identifier: "part1" },
  { id: 2, name: "partner 2", identifier: "part2" },
  { id: 3, name: "partner 3", identifier: "part3" },
];

const selectedValue = ref(null);

const isModalOpen = ref(false);
const textValue = ref('') 
const fullName=ref("")
const Email=ref("")
const Partner=ref("First Consult")
// Define headers and dummy data
const headers = ref([
    {
        text: "Name",
        value: "name",
        sorter: "name",
    },
    {
        text: "Email",
        value: "email",
        sorter: "email",
        sortable: false,

    },
    {
        text: "Partner",
        value: "partner",
        sorter: "partner",
        sortable: false,

    },
    {
        text: "Created at",
        value: "createdAt",
        sorter: "createdAt",
    },
    {
        text: "Actions",
        value: "actions",
        sorter: "actions",
        sortable: false,
    },
]);
const onSubmit = handleSubmit(() => {
  console.log('Form submitted');
  const output = {
    name: fullName.value,
    email: Email.value,
    partner: selectedValue.value,
  };
  console.log(output);
  isModalOpen.value=false
});
</script>
<template>
<div class="flex flex-col lg:flex-row px-2 lg:pl-4 w-full lg:pr-10">   
     <HModal
      :modelValue="isModalOpen"
      mainClass="relative px-4 pt-5 pb-6 text-left transition-all transform rounded-lg  overflow-y-auto h-[560px] bg-white w-[100%] md:w-[40rem] shadow-xl sm:my-8 sm:w-full sm:p-9"
      @update:modelValue="isModalOpen = $event"
      title="Sample Modal"
      wrapperClass=""
      :autoClose="true"
      :hasCloseIcon="true"
      :enabledOverflow="false"
    >
      <template #Heading>
           <form @submit.prevent="onSubmit" as="div" class="pt-12 flex flex-col gap-y-5 w-full">
           
            <HTextField  
           :modelValue="fullName"
           @update:modelValue="(value) => { fullName = value}"
            type="text"
            name="fullName"
            rules="required"
            inputClass="block w-full text-base mt-4  dark:bg-gray-700 dark:text-gray-300 placeholder-gray-300 dark:placeholder-secondary py-3 transition-all duration-300 rounded-md font-body focus:outline-none border-[1px]  border-gray-300 group-hover:border-gray-500 focus:border-gray-600 focus:ring-gray-600 disabled:bg-gray-100 disabled:cursor-not-allowed "
            >
                <template #label>
                    <p class="text-[#7A7A7A] mt-4 md:mt-0">Full Name</p>

                </template>

            </HTextField>
            <HTextField  
            :modelValue="Email"
            @update:modelValue="(value) => { Email = value}"
            type="email"
            name="Email" 
            rules="required"    
            inputClass="block w-full mt-4 text-base dark:bg-gray-700 dark:text-gray-300 placeholder-gray-300 dark:placeholder-secondary py-3 transition-all duration-300 rounded-md font-body focus:outline-none border-[1px]  border-gray-300 group-hover:border-gray-500 focus:border-gray-600 focus:ring-gray-600 disabled:bg-gray-100 disabled:cursor-not-allowed "
            >
                <template #label>
                    <p class="text-[#7A7A7A]">Email</p>

                </template>

            </HTextField>

            <HListSelect 
            id="dropdown-id"
             name="dropdownName"
             
            :items="dropdownItems"
            label="Select an Item"
             placeholder="First Consult"
             label-class="font-semibold text-gray-700"
            :return-object="true"
      
            :modelValue="selectedValue"
            @update:modelValue="(value) => { selectedValue = value.name}"
              :rules="'required'"
             :disabled="false"
      
             list-height="max-h-40"
             placeholder-style="text-[#7A7A7A] pl-2 text-base"
     
            >
            <template #label>
                    <p class="text-[#7A7A7A]">Partner</p>

                </template>
                
            </HListSelect>

             <div class="w-full justify-end mt-8 md:ml-[22rem]">
                <button type="submit" class="text-white bg-primary rounded-2xl py-2 w-36 text-center">Invite</button>

             </div>

        </form>
         
      </template>

      <template #content>
        
            <h2 class=" font-semibold text-2xl">Create User</h2>
            
       <div class="relative flex items-center px-4 mt-5 pb-4">
            <span class="absolute left-3 -translate-x-1/2 bg-gray-300 h-2  w-2 rounded-full"></span>
            <hr class="w-full border-t-2 border-gray-300">
        </div>
        
      </template>
    </HModal>
    <div class="flex flex-row -space-x-4 lg:mt-14 lg:w-1/4">
    <div class="flex items-center gap-x-3 h-6 hover:border-primary px-6 text-white border-l-[6px] border-primary pl-1"></div>
    <div class="flex flex-row gap-x-4 lg:gap-x-16 w-full lg:w-auto">
      <h1 class="text-[#161344] text-sm 3xl:text-lg">User Management</h1>
      <div class="hidden -mt-24 lg:block border-r h-screen"></div>
    </div>
  </div>
  

  <!-- Main Content Section -->
  <div class="flex flex-col lg:pl-2 lg:gap-y-8 w-full">
    <!-- Breadcrumb Section -->
    <div class="flex gap-x-1 text-sm lg:text-base">
      <button class="text-[#161344]">Users /</button>
      <p class="text-[#161344]">User Management</p>
    </div>

    <!-- Header Section -->
    <div class="flex justify-between items-center lg:pr-8 mt-4 lg:mt-0">
      <h1 class="text-lg lg:text-2xl 3xl:text-3xl font-light text-[#161344]">Users</h1>
      <AdminButton @click="isModalOpen = true" iconName="material-symbols:add" buttonLabel="Add User" />
    </div>

    <!-- Search Section -->
    <div class="mt-4">
      <HTextField
        :modelValue="searchText"
        inputClass="block w-full md:w-96 text-base text-gray-800 dark:bg-gray-700 dark:text-gray-300 placeholder-gray-300 dark:placeholder-secondary py-3 transition-all duration-300 rounded-md font-body focus:outline-none border-[1px] border-gray-300 group-hover:border-gray-500 focus:border-gray-600 focus:ring-gray-600 disabled:bg-gray-100 disabled:cursor-not-allowed"
        name="searchField"
        label="Search"
        :maxlength="100"
        placeholder="Search"
        trailingIcon="uil:search-alt"
        trailingIconClass="absolute inset-y-0 right-0  md:left-[22rem] text-[#161344]  3xl:right-[55rem] flex items-center pr-3 hover:cursor-pointer"
       
        id="searchInput"
        labelClass="text-sm lg:text-base font-medium"
      />
    </div>

    <!-- Table Section -->
    <div class="lg:pr-4 mt-3 overflow-x-auto">
      <h-table
        :headers="headers"
        :hasCheckBox="false"
        :sort="sort"
        :items="DummyData"
        rowStyle="border-table-border border-b w-auto"
        rowHeadStyle="border-table-border w-auto bg-secondary-lite-3 dark:bg-secondary-9/30 !py-4 !text-secondary-2 dark:!text-secondary-7 dark:!border-red-500"
        supporterClass="overflow-x-auto dark:!border-hahu-gray max-h-[70vh] overflow-y-auto"
      />
    </div>
  </div>
</div>
</template>