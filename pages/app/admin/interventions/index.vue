<script setup>
definePageMeta({
    layout: "admin",
  });
  
  const searchText = ref("");
  const isModalOpen = ref(false);
  const type = ref("");
  const description=ref("")

  // buttons data when the modal open

  const buttons=
  [
  {
    id:1,
    name:"Personal Info"
    
  },
  {
  id:2,
  name:"Checked"
},
{
  id:3,
  name:"Other Category"
},
]

  const sort = ref([
    { label: "Ascending", value: "asc" },
    { label: "Descending", value: "desc" },
  ]);
  const DummyData = ref([
    { id: 1, region: "Addis Ababa" },
    { id: 2, region: "Afar" },
    { id: 3, region: "Amhara", actions: "icon" },
    { id: 4, region: "Dire Dawa", actions: "icon" },
    { id: 5, region: "Gambela", actions: "icon" },
    { id: 6, region: "Oromia", actions: "icon" },
    { id: 7, region: "Tigray", actions: "icon" },
  ]);
  const headers = ref([
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


// Reactive state
const currentPage = ref(1); 
const itemsPerPage = ref(5); 
const totalData = computed(() => DummyData.value.length); 
const currentOffset = ref(0); 
const isDataLoading = ref(false); 

// Calculated total pages (used for `length`)
const calculatedLength = computed(() =>
  Math.ceil(totalData.value / itemsPerPage.value)
);

// Paginated data based on current page
const paginatedData = computed(() => {
  const start = currentOffset.value;
  const end = start + itemsPerPage.value;
  return DummyData.value.slice(start, end);
});

// Watch currentPage to update offset dynamically
watch(currentPage, (newPage) => {
  currentOffset.value = (newPage - 1) * itemsPerPage.value;
});

// Event handlers
const onOffsetChange = (newOffset) => {
  currentOffset.value = newOffset;
  console.log('Offset updated to:', newOffset);
};

const onPageChange = () => {
  console.log('Page changed to:', currentPage.value);
};


</script>
  <template>
   
    <AdminInterventionLayout>
<!-- Add Button -->
<template #button>
  <h-button
    @click="isModalOpen = true"
    iconName="material-symbols:add"
    buttonLabel="Add Intervention Types"
  />
</template>

<!-- Modal -->
<template #contents>
  <HModal
    :modelValue="isModalOpen"
    mainClass="absolute top-28 px-4 pt-5 pb-6 text-left transition-all transform rounded-lg overflow-y-auto h-[720px] bg-white w-[90%] md:w-[40rem] shadow-xl sm:my-8 sm:p-9"
    @update:modelValue="isModalOpen = $event"
    title="Sample Modal"
    :autoClose="true"
    :hasCloseIcon="true"
    :enabledOverflow="false"
  >
    <template #Heading>
      <form
        @submit.prevent="onSubmit"
        class="pt-12 flex  flex-col gap-y-5 w-full"
      >
        <h-textfield
          :modelValue="type"
          @update:modelValue="(value) => { type = value }"
          type="text"
          name="type"
          placeholder="Pick a descriptive name"
          rules="required"
          inputClass="block w-full text-base mt-4 dark:bg-gray-700 dark:text-gray-300 placeholder-gray-300 dark:placeholder-secondary py-3 transition-all duration-300 rounded-md font-body focus:outline-none border-[1px] border-gray-300 focus:border-gray-600 focus:ring-gray-600 disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          <template #label>
            <p class="text-[#7A7A7A] mt-4 md:mt-0">Type Name</p>
          </template>
        </h-textfield>

        <h-text-area
          :modelValue="description"
          @update:modelValue="(value) => { description = value }"
          type="textarea"
          name="description"
          label="Description"
          labelClass="text-[#7A7A7A]"
          placeholder="Description about the intervention type be"
          rules="required"
          inputClass="block w-full text-base mt-4 dark:bg-gray-700 dark:text-gray-300 placeholder-gray-300 dark:placeholder-secondary py-3 transition-all duration-300 rounded-md font-body focus:outline-none border-[1px] border-gray-300 focus:border-gray-600 focus:ring-gray-600 disabled:bg-gray-100 disabled:cursor-not-allowed"
        >

        </h-text-area>
        <div class="flex flex-col">
           <div class="flex  flex-row gap-x-2 items-center">
            <h1 class="text-[#7A7A7A]">Categories </h1>
            <VTooltip  :distance="3"  placement="bottom-start" offset="-10">
                
                <Icon name="mingcute:warning-fill"  class="text-primary rotate-180"/>
                <template  #popper>
                  <div class="w-52 bg-slate-400">
                    <p class="">                
                      To which Categories will this intervention apply to
                  </p>
                  </div>
                  
                </template>
              </VTooltip>
           </div>
            
            <div class="flex flex-row gap-x-2 py-7 mt-3 px-1 md:px-3 border-[1px] rounded-lg border-slate-400  ">
                <button v-for="button in buttons" :key="button.id" class="border border-primary text-[#7A7A7A]  rounded-3xl px-1 md:px-3 py-1 w-auto text-xs  lg:text-sm  whitespace-nowrap">
            {{ button.name }} <span><Icon name="material-symbols:add" class="text-center text-[#7A7A7A]"/></span>
          </button>
                 
            </div>
            
        </div>
        <div class="w-full justify-end mt-8 pb-5 md:ml-[18rem]">
            <button type="submit" class="text-white bg-primary rounded-3xl py-2 w-44 text-center">Create</button>

         </div>
      </form>
    </template>
    <template #content>
      <h2 class="font-semibold text-2xl  md:text-left">
        Create Intervention Type
      </h2>
      <div class="relative flex items-center mt-5 pb-4">
        <span
          class="absolute  bg-gray-300 h-2 w-2 rounded-full"
        ></span>
        <hr class="w-full border-t-2 border-gray-300" />
      </div>
    </template>
  </HModal>


   

  <!-- Table -->
  <div class="mt-3 flex flex-col overflow-x-auto">
    <div>
      <h-table
      :headers="headers"
      :hasCheckBox="false"
      :sort="sort"
      :items="paginatedData"
      rowStyle="border-table-border border-b"
      rowHeadStyle="bg-secondary-lite-3 dark:bg-secondary-9/30 py-4 text-secondary-2 dark:text-secondary-7"
      supporterClass="overflow-x-auto max-h-[70vh]"
    />
    </div>

   
    <div>
       
  <div class="flex justify-end">
    <h-paginate
       v-model="currentPage"
      :length="calculatedLength"
      :itemsPerPage="itemsPerPage"
      :totalData="totalData"
      :offset="currentOffset"
      :disabled="isDataLoading"
      @update:offset="onOffsetChange"
      @paginate="onPageChange"
    />

 

  </div>


    </div>
  </div>
</template>
</AdminInterventionLayout>


</template>