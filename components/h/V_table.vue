<script setup>
  const props = defineProps({
    headers: {
      type: Array,
    },
    hasRecordsPerPage: {
      type: Boolean,
    },
    hasDateFilter: {
      type: Boolean,
    },
    items: {
      type: Array,
    },
    //to store ids of checked items
    checkedItems: {
      type: Array,
      default: [],
    },
    checkedItemsData: {
      type: Array,
      default: [],
    },
    hasCheckBox: {
      type: Boolean,
      default: false,
    },
    rowStyle: {
      type: String,
      default: "",
    },
    rowHeadStyle: {
      type: String,
      default: "",
    },
    sort: {
      type: Array,
    },
    loading: {
      type: Boolean,
      default: true,
    },
    color1: String,
    color2: String,
    color3: String,
    supporterClass: {
      type: String,
    },
    supportHeaderClass: {
      type: String,
    },
  });

  const emits = defineEmits([
    "click:row",
    "update:sort",
    "update:checkedItems",
    "update:checkedItemsData",
  ]);

  const _get = useGet;
  const _set = useSet;
  const _sort = ref({});
  onMounted(() => {
    props.sort.forEach((item) => {
      _sort.value = { ..._sort.value, ...item };
    });
  });

  const checkCheckedAll = computed(() => {
    return (
      props.checkedItems?.length == props.items?.length &&
      props.items?.length > 0
    );
  });

  function sort_by(header) {
    if (header.sortable === false) return;

    let direction = _sort.value[header.value];
    if (direction && direction === "asc") {
      _sort.value[header.value] = "desc";
    } else if (direction && direction === "desc") {
      delete _sort.value[header.value];
    } else {
      _sort.value[header.value] = "asc";
    }

    let sort = [];
    Object.keys(_sort.value).forEach((key) => {
      let obj = {};
      _set(obj, key, _sort.value[key]);
      sort.push(obj);
    });
    emits("update:sort", sort);
  }

  function rowChecked(item, id) {
    emits(
      "update:checkedItems",
      Array.isArray(props.checkedItems)
        ? props.checkedItems.includes(id)
          ? props.checkedItems.filter((_id) => id !== _id)
          : [...props.checkedItems, id]
        : [id]
    );
    emits(
      "update:checkedItemsData",
      Array.isArray(props.checkedItemsData)
        ? props.checkedItemsData?.map((e) => e?.id).includes(id)
          ? props.checkedItemsData.filter((_id) => id !== _id.id)
          : [...props.checkedItemsData, item]
        : [item]
    );
  }

  function rowCheckedAll() {
    emits(
      "update:checkedItems",
      props.checkedItems?.length == props.items?.length
        ? []
        : props.items.map((item) => item.id)
    );
    emits(
      "update:checkedItemsData",
      props.checkedItems?.length == props.items?.length
        ? []
        : props.items.map((item) => item)
    );
  }
</script>

<template>
  <div class="h-[6px]"></div>
  <!-- component -->
  <div
    :class="supporterClass"
    class="sm:rounded-lg relative border border-table-border"
  >
    <HProgress
      v-if="loading"
      height="h-[6px]"
      :color1="color1"
      :color2="color2"
      :color3="color3"
    />
    <table
      class="w-full font-body"
      :class="[items?.length ? 'divide-y divide-secondary-4' : '']"
    >
      <thead class="bg-white dark:bg-gray-700">
        <tr>
          <th
            v-if="hasCheckBox"
            class="text-xs 2xl:px-4 px-2 font-bold text-left items-center text-black 2xl:py-5 hidden py-3 lg:table-cell tracking-wider uppercase"
            :class="rowHeadStyle"
          >
            <input
              v-if="checkCheckedAll"
              type="checkbox"
              @click.prevent="rowCheckedAll()"
              :checked="checkCheckedAll"
              class="accent-teal-800 focus:ring-new-tale h-4 w-4 text-primary border-new-tale/50 rounded text-md cursor-pointer"
            />
            <input
              v-else
              type="checkbox"
              @click.prevent="rowCheckedAll()"
              :checked="checkCheckedAll"
              class="accent-teal-800 focus:ring-new-tale h-4 w-4 text-primary border-new-tale/50 rounded text-md cursor-pointer"
            />
          </th>
          <th
            class="text-xs 2xl:px-4 px-3 font-bold text-left text-black 2xl:py-5 py-3 hidden lg:table-cell tracking-wider uppercase"
            v-for="(header, i) in headers"
            :key="header.value"
            :class="rowHeadStyle"
          >
            <span class="cursor-pointer font-body" @click="sort_by(header)">
              {{ header.text }}
              <Icon
                name="bi:sort-up"
                width="20"
                height="20"
                v-if="
                  _sort[header.value] === 'asc' && header.sortable !== false
                "
                class="inline-block text-primary"
              />
              <Icon
                name="bi:sort-down"
                width="20"
                height="20"
                v-if="
                  _sort[header.value] === 'desc' && header.sortable !== false
                "
                class="inline-block text-primary"
              />
            </span>
          </th>
        </tr>
      </thead>
      <span
        v-if="!loading"
        class="text-base md:text-xl text-gray-500 xl:text-2xl 3xl:text-4xl flex flex-col gap-y-5 items-center font-medium centering"
        :class="[items?.length ? 'hidden' : 'flex']"
      >
        <Icon name="fluent:document-search-24-regular" class="text-7xl" />
        No Result Found
      </span>
      <tbody>
        <tr
          :class="[
            ' border-gray-200 rounded last:border-0 hover:bg-gray-50 cursor-pointer even:bg-gray-100',
          ]"
          v-for="(item, idx) in items"
          :key="item.id"
          @click="
            () => {
              $emit('click:row', item);
            }
          "
          class="lg:hover:bg-blue-50 flex lg:table-row flex-row flex-wrap lg:flex-no-wrap mb-0"
        >
          <slot name="row" :item="item" :headers="headers" :get="_get">
            <td
              v-if="hasCheckBox"
              class="w-full lg:w-auto block lg:table-cell relative lg:static border-b rounded py-4 2xl:px-4 px-2 2xl:text-sm text-xs"
              :class="rowStyle"
            >
              <input
                v-if="checkedItems.includes(item.id)"
                type="checkbox"
                :checked="checkedItems.includes(item.id)"
                @click.stop="rowChecked(item, item.id)"
                class="accent-teal-800 focus:ring-new-tale h-4 w-4 text-primary border-new-tale/50 rounded text-md cursor-pointer"
              />
              <input
                v-else
                type="checkbox"
                :checked="checkedItems.includes(item.id)"
                @click.stop="rowChecked(item, item.id)"
                class="accent-accent-teal-800 focus:ring-new-tale h-4 w-4 text-new-tale border-new-tale/50 rounded text-md cursor-pointer"
              />
            </td>

            <td
              v-for="header in headers"
              :key="header.value"
              :class="rowStyle"
              class="w-full font-body lg:w-auto block lg:table-cell relative lg:static text-left text-gray-900 rounded py-4 2xl:px-4 px-2 2xl:text-sm text-xs"
            >
              <span
                class="lg:hidden text-left w-1/3 align-middle inline-block text-sm font-normal text-secondary-2 font-body"
                >{{ header.text }}
              </span>
              <slot :item="item" :name="header.value">
                <span
                  class="align-middle inline-block whitespace-nowrap font-body lg:w-7/12 xl:w-9/12"
                  v-if="header.value == 'roll_no'"
                >
                  {{ idx + 1 }}
                </span>
                <span
                  class="align-middle inline-block overflow-ellipsis overflow-hidden whitespace-nowrap font-body lg:w-7/12 xl:w-9/12 truncate"
                  v-else-if="header.value == 'full_name'"
                >
                  <!-- <PersonTypeIndicator :type="item.type" /> -->

                  {{ _get(item, header.value) || "-" }}
                </span>
                <span
                  class="lg:w-10/12 xl:w-11/12 align-middle inline-block overflow-ellipsis overflow-hidden whitespace-nowrap font-body truncate"
                  v-else
                >
                  {{ _get(item, header.value) || "-" }}
                </span>
              </slot>
            </td>
          </slot>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped>
  .centering {
    position: absolute;
    bottom: -1%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>