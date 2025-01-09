<script setup>


definePageMeta({
    layout:"admin"
})
const sort = ref([
    { label: 'Ascending', value: 'asc' },
    { label: 'Descending', value: 'desc' },
]);
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
const isModalOpen = ref(false);
const textValue = ref('') 
const fullName=ref("")
const Email=ref("")
const Partner=ref("First Consult")
</script>
<template>
   <div class="flex flex-row lg:pl-4 w-full lg:pr-10">
    <HModal
      :modelValue="isModalOpen"
      @update:modelValue="isModalOpen = $event"
      title="Sample Modal"
      wrapperClass=""
      :autoClose="true"
      :hasCloseIcon="true"
      :enabledOverflow="false"
    >
      <template #Heading>
        <div class="pt-10">
            <HTextField></HTextField>
            <HTextField></HTextField>

        </div>
      </template>

      <template #content>
        
            <h2 class="text-xl font-semibold">Create User</h2>
            <div class="border border-b-0 lg:mt-5 border-[#161344]"></div>
        
      </template>
    </HModal>
    <div class="flex flex-row -space-x-4 lg:mt-14">
        <div class="flex items-center gap-x-3  h-6   hover:border-primary px-6 text-white  border-l-[6px] border-primary pl-1">
        </div>
        <div class=" flex flex-row gap-x-16 w-64">
        
        <h1>User Management</h1>
        <div  class="border border-r-0 h-screen -mt-28"></div>
       
   </div>
    </div>
   
    <div class="flex flex-col lg:pl-2 lg:gap-y-8 w-full">
        <div class="flex gap-x-1 ">
        <button>Users  /</button>
        <p> User Management</p>
        

    </div>
    <div class="flex justify-between items-center  lg:pr-8">
        <h1 class="lg:text-3xl text-[Canada] font-light">Users</h1>
        <AdminButton  @click="isModalOpen = true" iconName="material-symbols:add"  buttonLabel="Add User"/>

    </div>
    <div>
     <HTextField
       :modelValue="searchText"
      name="searchField"
      label="Search"
      :maxlength="100"
      placeholder="Search"
      trailingIcon="ic:baseline-search"
      :rules="'required|min:3'"
      id="searchInput"
      labelClass="text-lg font-medium"
    />
    </div>
    <div class="p-4 mt-3">
            <h-table :headers="headers" :hasCheckBox="false" :sort="sort" :items="DummyData"
                rowStyle="border-table-border border-b w-auto"
                rowHeadStyle="border-table-border w-auto bg-secondary-lite-3 dark:bg-secondary-9/30 !py-4 !text-secondary-2 dark:!text-secondary-7 dark:!border-red-500"
                supporterClass="overflow-x-auto overflow-y-hidden dark:!border-hahu-gray md:max-h-[70vh] overflow-y-scroll" />
        </div>

   
   

    </div>
   
 
  </div>
</template>