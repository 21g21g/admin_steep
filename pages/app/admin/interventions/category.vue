<script setup>
import { useForm } from 'vee-validate';

definePageMeta({
    layout: "admin",
  });

  const { handleSubmit } = useForm();

  
  const searchText = ref("");
  const isModalOpen = ref(false);
  const category = ref("");
  const description=ref("")
  const currentPage = ref(1); 
  const currentOffset = ref(0); 
const isDataLoading = ref(false); 
const itemsPerPage = ref(5);
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
    { id: 8, region: "Addis Ababa" },
    { id: 9, region: "Afar" },
    { id: 10, region: "Amhara", actions: "icon" },
    { id: 11, region: "Dire Dawa", actions: "icon" },
    { id: 12, region: "Gambela", actions: "icon" },
    { id: 13, region: "Oromia", actions: "icon" },
    { id: 14, region: "Tigray", actions: "icon" },
    { id: 15, region: "Addis Ababa" },
    { id: 16, region: "Afar" },
    { id: 17, region: "Amhara", actions: "icon" },
    { id: 18, region: "Dire Dawa", actions: "icon" },
    { id: 19, region: "Gambela", actions: "icon" },
    { id: 20, region: "Oromia", actions: "icon" },
    { id: 21, region: "Tigray", actions: "icon" },
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

  const onSubmit = handleSubmit(() => {
  console.log('Form submitted');
  const output = {
    category: category.value,
    description:description.value
   
  };
  console.log(output);
  isModalOpen.value=false
});



const totalData = computed(() => DummyData.value.length); 
// Calculated total pages (used for `length`)
const calculatedLength = computed(() =>
  Math.ceil(totalData.value / itemsPerPage.value)
);

const paginatedData = computed(() => {
  const start = currentOffset.value;
  const end = start + itemsPerPage.value;
  return DummyData.value.slice(start, end);
});

// Watch currentPage to update offset dynamically
watch(currentPage, (newPage) => {
  currentOffset.value = (newPage - 1) * itemsPerPage.value;
});

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
    buttonLabel="Add Intervention Category"
  />
</template>

<!-- Modal -->
<template #contents>
    <HModal
    :modelValue="isModalOpen"
    mainClass="absolute md:top-28 md:top:0 md:relative px-4 pt-5 pb-6 text-left transition-all transform rounded-lg overflow-y-auto h-[580px] bg-white w-[90%] md:w-[40rem] shadow-xl sm:my-8 sm:p-9"
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
          :modelValue="category"
          @update:modelValue="(value) => { category = value }"
          type="text"
          name="type"
          placeholder="Pick a descriptive name"
          rules="required"
          inputClass="block w-full text-base mt-4 dark:bg-gray-700 dark:text-gray-300 placeholder-gray-300 dark:placeholder-secondary py-3 transition-all duration-300 rounded-md font-body focus:outline-none border-[1px] border-gray-300 focus:border-gray-600 focus:ring-gray-600 disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          <template #label>
            <p class="text-[#7A7A7A] mt-4 md:mt-0">Category Name</p>
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
        
        <div class="w-full justify-end mt-8 pb-5 md:ml-[18rem]">
            <button type="submit" class="text-white bg-primary rounded-3xl py-2 w-44 text-center">Create</button>

         </div>
      </form>
    </template>
    <template #content>
      <h2 class="font-semibold text-2xl md:text-left">
        Create Intervention Category
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