<script setup>
definePageMeta({
  layout: "admin",
});

const searchText = ref("");
const isModalOpen = ref(false);
const region = ref("");
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
</script>

<template>
   
        <AdminAddressLayout>
    <!-- Add Button -->
    <template #button>
      <h-button
        @click="isModalOpen = true"
        iconName="material-symbols:add"
        buttonLabel="Add Region/City"
      />
    </template>

    <!-- Modal -->
    <template #contents>
      <HModal
        :modelValue="isModalOpen"
        mainClass="relative px-4 pt-5 pb-6 text-left transition-all transform rounded-lg overflow-y-auto h-[350px] bg-white w-full md:w-[40rem] shadow-xl sm:my-8 sm:p-9"
        @update:modelValue="isModalOpen = $event"
        title="Sample Modal"
        :autoClose="true"
        :hasCloseIcon="true"
        :enabledOverflow="false"
      >
        <template #Heading>
          <form
            @submit.prevent="onSubmit"
            class="pt-12 flex flex-col gap-y-5 w-full"
          >
            <h-textfield
              :modelValue="region"
              @update:modelValue="(value) => { region = value }"
              type="text"
              name="fullName"
              rules="required"
              inputClass="block w-full text-base mt-4 dark:bg-gray-700 dark:text-gray-300 placeholder-gray-300 dark:placeholder-secondary py-3 transition-all duration-300 rounded-md font-body focus:outline-none border-[1px] border-gray-300 focus:border-gray-600 focus:ring-gray-600 disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <template #label>
                <p class="text-[#7A7A7A] mt-4 md:mt-0">Region/City</p>
              </template>
            </h-textfield>
            <div class="w-full justify-end mt-8 md:ml-[18rem]">
                <button type="submit" class="text-white bg-primary rounded-3xl py-2 w-44 text-center">Create</button>

             </div>
          </form>
        </template>
        <template #content>
          <h2 class="font-semibold text-2xl text-center md:text-left">
            Create Region/City
          </h2>
          <div class="relative flex items-center mt-5 pb-4">
            <span
              class="absolute left-3 bg-gray-300 h-2 w-2 rounded-full"
            ></span>
            <hr class="w-full border-t-2 border-gray-300" />
          </div>
        </template>
      </HModal>

      <!-- Search Field -->
        <h-textfield
          :modelValue="searchText"
          inputClass="block w-full md:w-96 text-base mt-3 text-gray-800 dark:bg-gray-700 dark:text-gray-300 placeholder-gray-300 dark:placeholder-secondary py-3 transition-all duration-300 rounded-md font-body focus:outline-none border-[1px] border-gray-300 focus:border-gray-600 focus:ring-gray-600 disabled:bg-gray-100 disabled:cursor-not-allowed"
          name="searchField"
          label="Search"
          :maxlength="100"
          placeholder="Search"
          trailingIcon="uil:search-alt"
          trailingIconClass="absolute inset-y-0 right-0 md:left-[22rem] text-[#161344] 3xl:right-[55rem] flex items-center pr-3 hover:cursor-pointer"
          id="searchInput"
          labelClass="text-sm lg:text-base font-medium"
        />

      <!-- Table -->
      <div class="mt-3 overflow-x-auto">
        <h-table
          :headers="headers"
          :hasCheckBox="false"
          :sort="sort"
          :items="DummyData"
          rowStyle="border-table-border border-b"
          rowHeadStyle="bg-secondary-lite-3 dark:bg-secondary-9/30 py-4 text-secondary-2 dark:text-secondary-7"
          supporterClass="overflow-x-auto max-h-[70vh]"
        />
      </div>
    </template>
  </AdminAddressLayout>


</template>
