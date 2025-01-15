> Muller Class:
<script setup>
import { ref } from "vue";
const isDeleteConfirmationVisible = ref(false);
const itemToDelete = ref(null);
const _sort = ref({});
// Define props for the table
const props = defineProps({
    headers: {
        type: Array,
        required: true,
    },
    items: {
        type: Array,
        required: true,
    },
    sort: {
        type: Array,
    },
    supporterClass: {
        type: String,
        default: "",
    },
    rowHeadStyle: {
        type: String,
        default: "",
    },
});





// Function to toggle delete button visibility
const toggleDelete = (item) => {
    // Close other delete buttons and open the clicked one
    props.items.forEach(i => {
        if (i !== item) i.showDelete = false;
    });
    item.showDelete = !item.showDelete;
};

// Add a showDelete field to each item in the data for toggling visibility
props.items.forEach(item => {
    item.showDelete = false; // Initialize showDelete to false
});

// State for delete confirmation modal


function sort_by(header) {
    if (header.sortable === false) return;

    let direction = _sort.value[header.value];
    if (direction && direction === "asc") {
        console.log("if one", _sort.value);
        _sort.value[header.value] = "desc";
    } else if (direction && direction === "desc") {
        console.log("if else", _sort.value);
        delete _sort.value[header.value];
    } else {
        console.log("else", _sort.value, header.value);
        _sort.value[header.value] = "asc";
    }

    let sort = [];
    console.log("before loop", _sort.value);
    Object.keys(_sort.value).forEach((key) => {
        let obj = {};
        console.log("sortloop", key, "and", _sort.value[key]);
        _set(obj, key, _sort.value[key]);
        console.log("obj", obj);
        sort.push(obj);
    });
    console.log("final ", sort);

}
// // Show the delete confirmation modal
const showDeleteConfirmation = (item) => {
    itemToDelete.value = item;
    isDeleteConfirmationVisible.value = true;
};

// Delete the item after confirmation
const deleteItem = () => {
    // Remove the item from the array
    const index = props.items.indexOf(itemToDelete.value);
    if (index > -1) {
        props.items.splice(index, 1);
    }
    isDeleteConfirmationVisible.value = false;
    itemToDelete.value = null;
};

// Cancel the delete action
const cancelDelete = () => {
    isDeleteConfirmationVisible.value = false;
    itemToDelete.value = null;
};
onMounted(() => {
    console.log("kkkk");

    props.sort.forEach((item) => {
        _sort.value = { ..._sort.value, ...item };
    });
    console.log("kkkk", _sort);

});
</script>

<template>
    <!-- Table component -->
    <div>
        <div :class="supporterClass" class="rounded-lg relative border mt-3">
            <table class="w-full divide-y divide-secondary-4 dark:divide-hahu-gray font-body">
                <thead class="bg-white dark:bg-secondary-dark-2 top-0">
                    <tr>
                        <!-- Table headers -->
                        <th v-for="(header, i) in headers" :key="i" :class="rowHeadStyle"
                            class="text-xs 2xl:text-[1rem] xl:text-sm lg:text-xs sm:text-xs align-middle font-light text-black px-2 2xl:px-6 py-2 text-left border-2 border-gray-200 bg-white whitespace-nowrap">
                            <div class="flex items-center ">
                                <span>{{ header.text }}</span>
                                <span v-if="header.sortable !== false" class="cursor-pointer flex items-center ml-2"
                                    @click="sort_by(header)">
                                    <Icon name="bi:sort-up" v-if="_sort[header.value] === 'asc'"
                                        class="text-primary w-3 h-3 " />
                                    <Icon name="bi:sort-down" v-else class="text-primary w-3 h-3  " />
                                </span>
                            </div>
                        </th>

                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, idx) in items" :key="item.id || idx"
                        :class="['singleTableRow border-gray-200 rounded border-b-4 lg:border-0 last:border-0 cursor-pointer']"
                        class="">
                        <!-- Table body -->
                        <td v-for="header in headers" :key="header.text"
                            class="w-full lg:w-auto  lg:table-cell opacity-  relative lg:static text-gray-800 rounded py-4 px-2 2xl:text-lg xl:text-base lg:text-sm sm:text-xs border-2 border-gray-200">
                            <span v-if="header.value !== 'actions'"
                                class="text-sm 2xl:text-[1rem] align-middle 2xl:px-6  overflow-hidden text-gray-800 p-2">
                                {{ item[header.value] }}
                            </span>
                            <span v-else class="align-middle  px-3 2xl:px-12 relative ">
                                <!-- Show a three-dot icon for the Actions column -->
                                <Icon :name="'fa-ellipsis-v'" @click="toggleDelete(item)" />
                                <!-- Conditionally show the delete button if showDelete is true -->
                                <div v-if="item.showDelete" class="absolute z-50 right-2 bottom-6 ">
                                    <button @click="showDeleteConfirmation(item)"
                                        class="absolute -top-2 shadow-xl left-8 transform -translate-x-1/2 px-6 py-2 flex items-center text-red-600 border-2 border-gray-200 rounded-lg translate-y-2 hover:bg-secondary transition-all w-auto">
                                        <Icon name="material-symbols:delete" />
                                        <span class="px-2">Delete</span>
                                    </button>
                                </div>
                            </span>

                        </td>
                    </tr>
                </tbody>
            </table>
         </div>

           <!-- Delete confirmation modal -->
            <h-confirm v-model="isDeleteConfirmationVisible">
             <template #mainIcon>
                <div class=" flex  ">
                    <Icon name="line-md:account-delete" class="w-12 h-12 text-red-600 " />
                </div>
            </template>
            <template #title>
                <p class="text-xl text-white">Delete user</p>
            </template>
            <template #message>
                <p class="font-light  2xl:text-lg">
                    Are you sure you want to delete this user? After confirming this the user will no longer be able to
                    login and access services offered to them before.
                </p>
            </template>
            <template #falseButton>
                <button @click="cancelDelete" class="outline-button !px-8">
                    Cancel
                </button>
            </template>
            <template #trueButton>
                <button @click="deleteItem"
                    class="outline-button rounded-md px-4 bg-red-700 !border-red-700 text-white">
                    Delete
                </button>
            </template>
        </h-confirm>


    </div>
</template>
