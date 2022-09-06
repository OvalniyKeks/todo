<template>
  <div class="main">
    <div v-if="todos && todos.length === 0">Заметок нет</div>
    <task-card
      v-for="(todo,i) of todos"
      :key="`card-todo-${i}`"
      :todo="todo"
      @delete="deleteTodo(i)"
    />
    <DialogWrapper />

  </div>
</template>
<script>
import TaskCard from "@/components/TaskCard.vue"
import { todoService } from '../services/TodoService'
import { confirm } from '@/services/DialogService'
import { DialogWrapper } from 'vue3-promise-dialog';
export default {
  components: { TaskCard, DialogWrapper },
  data () {
    return {
      todos: [],
      isModal: false
    }
  },
  created () {
    this.todos = todoService.getAllTodo()
  },
  methods: {
    async deleteTodo (i) {
      if (await confirm('Вы точно хотите удалить заметку?')) {
        todoService.removeItem(this.todos[i])
        this.isModal = !this.isModal
        this.todos = todoService.getAllTodo()
      }

    }
  }

}
</script>
<style lang="sass">
.main
  padding: 10px
</style>
