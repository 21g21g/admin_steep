<script setup>
import { useForm } from 'vee-validate';

definePageMeta({
    layout:"admin"
})

const searchText=ref("")
const subcity=ref("")
const sort = ref([
    { label: 'Ascending', value: 'asc' },
    { label: 'Descending', value: 'desc' },
]);
const isModalOpen=ref(false)
const { handleSubmit } = useForm();

//dummy for list select
const regions = [
  { id: 1, name: "Amhara", identifier: "am" },
  { id: 2, name: "Oromia", identifier: "or" },
  { id: 3, name: "Tigray", identifier: "tg" },
  { id: 3, name: "Afar", identifier: "af" },
  { id: 3, name: "Somaliya", identifier: "sm" }
];

const selectedValue = ref(null);

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
const DummyData = ref([
    {
        id: 1,
        region: "Addis Ababa",
         subcity: "Afar"
       
    },
    {
        id: 2,
        region: "Gambela",
        subcity: "Afar",
       
    },
    {
        id: 3,
        region: "Amhara",
         subcity: "Afar",
        actions: "icon",
    },
    {
        id: 4,
        region: "Gambela",
        subcity: "Dire Dawa",
        actions: "icon",
    },
    
    {
        id: 5,
        region: "Gambela",
         subcity: "Afar",
        actions: "icon",
    },
    
    {
        id: 6,
        region: "Oromia",
         subcity: "Afar",
        actions: "icon",
    },
    {
        id: 7,
        region: "Tigray",
         subcity: "Afar",
        actions: "icon",
    },
    {
        id: 8,
        region: "Gambela",
        subcity: "Tigray",
        actions: "icon",
    },
    {
        id: 9,
        region: "Tigray",
         subcity: "Afar",
        actions: "icon",
    },
    {
        id: 10,
        region: "Tigray",
         subcity: "Afar",
        actions: "icon",
    },
    
    

]);
// headers for the region 
const headers = ref([
  
    {
        text: "Subcity/Zone",
        value: "subcity",
        sorter: "subcity",
        sortable: true,

    },
    {
        text: "Region/Subcity",
        value: "region",
        sorter: "region",
        sortable: true,

    },
    
  
    {
        text: "Actions",
        value: "actions",
        sorter: "actions",
        sortable: false,
    },
]);

</script>

<template>
    <div class="w-full ">
        <AdminAddressLayout>
   <template #button>
    <AdminButton @click="isModalOpen = true" iconName="material-symbols:add" buttonLabel="Add Subcity/Zone" />
</template>
<template #contents>
    <HModal
      :modelValue="isModalOpen"
      mainClass="relative px-4 pt-5 pb-6 text-left transition-all transform rounded-lg  overflow-y-auto h-[470px] bg-white w-[100%] md:w-[40rem] shadow-xl sm:my-8 sm:w-full sm:p-9"
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
           :modelValue="subcity"
           @update:modelValue="(value) => { subcity = value}"
            type="text"
            name="subcity"
            rules="required"
            inputClass="block w-full text-base mt-4  dark:bg-gray-700 dark:text-gray-300 placeholder-gray-300 dark:placeholder-secondary py-3 transition-all duration-300 rounded-md font-body focus:outline-none border-[1px]  border-gray-300 group-hover:border-gray-500 focus:border-gray-600 focus:ring-gray-600 disabled:bg-gray-100 disabled:cursor-not-allowed "
            >
                <template #label>
                    <p class="text-[#7A7A7A] mt-4 md:mt-0">Subcity/Zone Name</p>

                </template>

            </HTextField>
          

            <HListSelect 
            id="dropdown-id"
             name="region"
             
            :items="regions"
            label="Select an Item"
             placeholder="Addis Abeba"
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
                    <p class="text-[#7A7A7A]">Region/City</p>

                </template>
                
            </HListSelect>

             <div class="w-full justify-end mt-8 md:ml-[18rem]">
                <button type="submit" class="text-white bg-primary rounded-3xl py-2 w-44 text-center">Create</button>

             </div>

        </form>
         
      </template>

      <template #content>
        
            <h2 class=" font-semibold text-2xl">Create Subcity/Zone</h2>
            
       <div class="relative flex items-center px-4 mt-5 pb-4">
            <span class="absolute left-3 -translate-x-1/2 bg-gray-300 h-2  w-2 rounded-full"></span>
            <hr class="w-full border-t-2 border-gray-300">
        </div>
        
      </template>
    </HModal>
    <div class="flex lg:flex-col gap-3">
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
    <div class="flex lg:flex-row gap-x-3 w-[80rem]  overflow-x-auto mt-6">
  <button class="border border-gray-500 rounded-3xl px-6 py-2 w-auto whitespace-nowrap">
    All
  </button>
  <button class="border border-gray-500 rounded-3xl px-6 py-2 w-auto whitespace-nowrap">
    Addis Ababa
  </button>
  <button class="border border-gray-500 rounded-3xl px-6 py-2 w-auto whitespace-nowrap">
    Afar
  </button>
  <button class="border border-gray-500 rounded-3xl px-6 py-2 w-auto whitespace-nowrap">
    Amhara
  </button>
  <button class="border border-gray-500 rounded-3xl px-6 py-2 w-auto whitespace-nowrap">
    Dire Dawa
  </button>
  <button class="border border-gray-500 rounded-3xl px-6 py-2 w-auto whitespace-nowrap">
    Gambela
  </button>
  <button class="border border-gray-500 rounded-3xl px-6 py-2 w-auto whitespace-nowrap">
    Harari
  </button>
  <button class="border border-gray-500 rounded-3xl px-6 py-2 w-auto whitespace-nowrap">
    Oromia
  </button>
  <button class="border border-gray-500 rounded-3xl px-6 py-2 w-auto whitespace-nowrap">
    Sidama
  </button>
   <button class="border border-gray-500 rounded-3xl px-6 py-2 w-auto whitespace-nowrap">
    South West Region People's Regional State
  </button> 
  <button class="border border-gray-500 rounded-3xl px-6 py-2 w-auto whitespace-nowrap">
    Southern Nations, Nationalities, and Peoples
  </button>
  <button class="border border-gray-500 rounded-3xl px-6 py-2 w-auto whitespace-nowrap">
    Tigray
  </button> 
</div>
<div class="lg:pr-4 mt-3 overflow-x-auto">
      <h-table
        :headers="headers"
        :hasCheckBox="false"
        :sort="sort"
        :items="DummyData"
        rowStyle="border-table-border border-b w-auto"
        rowHeadStyle="border-table-border w-auto bg-secondary-lite-3 dark:bg-secondary-9/30 !py-4 !text-secondary-2 dark:!text-secondary-7 dark:!border-red-500"
        supporterClass="overflow-x-auto dark:!border-hahu-gray lg:w-[70rem] max-h-[70vh] overflow-y-auto"
      />
    </div>

</template>
    
</AdminAddressLayout>
    </div>
 
</template>