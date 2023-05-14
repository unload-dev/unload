<script setup>
defineProps({
  value: {
    type: Object,
    required: true,
  },
});

const { $client } = useNuxtApp();

async function deleteRegistry(name) {
  await $client.registry.delete.mutate({ name });
}
</script>

<template>
  <tr>
    <td>{{ value.name }}</td>
    <td>{{ value.type }}</td>
    <td>{{ value.repositories }}</td>
    <td class="flex justify-end">
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="cursor-pointer">
          <IconDots />
        </label>
        <ul
          tabindex="0"
          class="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52"
        >
          <li><a>Edit</a></li>
          <li class="text-error" @click="deleteRegistry(value.name)">
            <a>Delete</a>
          </li>
        </ul>
      </div>
    </td>
  </tr>
</template>
