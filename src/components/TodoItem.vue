<template>
  <li>
    <input
      type="checkbox"
      v-model="task.status"
    >
    <span
      v-if="!editTask"
      @click="editTask = !editTask"
    >{{task.label}}</span>
    <input
      v-else
      type="text"
      v-model="task.label"
      @blur="editTask = !editTask"
      @keyup.enter="editTask = !editTask"
      style="width: 100%;"
    >
    <button style="color: red" @click="$emit('delete')">
      🗙
    </button>
  </li>
</template>
<script>
export default {
  props: {
    task: Object
  },
  data () {
    return {
      editTask: false
    }
  },
}
</script>
