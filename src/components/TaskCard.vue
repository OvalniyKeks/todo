<template>
  <div
    class="task-card"
    v-if="todo"
  >
    <div class="task-content">
      <div class="title">{{todo.label}}</div>
      <ul class="list">
        <li
          class="task"
          v-for="(task, i) of tasks"
          :key="`${i}`"
        >
          <input
            type="checkbox"
            class="task-status"
            :id="`task-${todo.id}-cards-${i}`"
            :checked="task.status"
            disabled
          >
          <label
            class="task-label"
            :for="`task-${todo.id}-cards-${i}`"
          >{{task.label}}</label>
        </li>
      </ul>
    </div>
    <div class="task-actions">
      <router-link :to="{name: 'ActionTask', params: {type: 'edit', id: todo.id}}">
        <img src="@/assets/icons/icon_edit.svg">
      </router-link>
      <button @click="$emit('delete')">
        <img src="@/assets/icons/icon_delete.svg">
      </button>
    </div>
  </div>
</template>
<script>

export default {
  props: {
    todo: Object
  },
  computed: {
    tasks () {
      const maxLengthItems = 2
      const arr = []
      for (let i = 0; i < this.todo.tasks.length; i++) {
        if (i > maxLengthItems) break
        arr.push(this.todo.tasks[i])
      }
      return arr
    }
  }
}
</script>
<style lang="sass" scoped>
.task-card
  box-sizing: border-box
  border: 1px solid #262626
  border-radius: 7px
  padding: 10px
  margin-bottom: 10px
  display: flex
  justify-content: space-between
  flex-wrap: wrap
  &:last-child
    margin-bottom: 0
  & .list
    list-style: none
    padding-inline-start: 10px
  & .task
    display: flex
    align-items: center
    margin-bottom: 10px
    & input:checked + label
      text-decoration: line-through
    &-status
      margin: 0
    &-label
      cursor: pointer
      margin-left: 5px
    &-actions
      display: flex
      justify-content: space-between
      align-items: flex-start
      & img
        width: 30px
    &-content
      max-width: 80%

.title
  font-weight: bold
  font-size: 1em
</style>
