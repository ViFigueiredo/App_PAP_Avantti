<template>
  <div class="flex flex-col">
    <label for="checked-checkbox" class="text-left text-sm font-medium text-gray-900 dark:text-gray-300 mb-3 underline">{{ props.title }}</label>
    <div class="overflow-y-scroll max-h-[110px] w-[110px]">
      <div v-for="value in values" :key="value" class="flex items-center pb-2">
        <input id="checked-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
        <label for="checked-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"> {{ value }} </label>
      </div>
    </div>
  </div>
</template>

<script setup>

// eslint-disable-next-line vue/require-prop-types
const props = defineProps(['title', 'values'])

</script>
