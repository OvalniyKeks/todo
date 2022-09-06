<template>
  <div class="action form">
    <div class="history-btn">
      <button @click="undo"><img src="@/assets/icons/icon_arrow_left.svg"></button>
      <button @click="redo"><img src="@/assets/icons/icon_arrow_right.svg"></button>
    </div>

    <div class="form-item">
      <label
        for="title"
        class="title"
      >
        Название заметки
        <button
          v-if="$route.params.id"
          @click="deleteTodo"
        >
          <img src="@/assets/icons/icon_delete.svg">
        </button>
      </label>
      <input
        id="title"
        type="text"
        v-model="todo.label"
        required
      >
    </div>
    <div class="form-add">
      <div v-if="todo.tasks.length > 0">
        <ul class="list">
          <todo-item
            v-for="(task , i) of todo.tasks"
            :key="`tasks-${i}`"
            :task="task"
            @delete="deleteTask(task)"
          />
        </ul>
      </div>
      <div class="form-item">
        <label for="title">Название задачи</label>
        <input
          id="title"
          type="text"
          v-model="taskName"
          required
        >
        <button
          @click="addTask"
          class="form-add__btn"
        >
          <img src="@/assets/icons/icon_add.svg">
          Добавить задачу
        </button>
      </div>
    </div>
    <button
      class="form-submit"
      @click="saveTodo"
    >
      <img src="@/assets/icons/icon_save.svg">
      Сохранить заметку
    </button>
    <DialogWrapper />
  </div>
</template>
<script>
import TodoItem from '@/components/TodoItem.vue'
import { confirm } from '@/services/DialogService'
import { todoService } from '../services/TodoService'
import { DialogWrapper } from 'vue3-promise-dialog';

export default {
  components: { TodoItem, DialogWrapper },
  data () {
    return {
      todo: {
        label: '',
        tasks: []
      },
      todoHistory: [],
      historyIndex: 0,
      watching: true,
      taskName: '',
    }
  },
  mounted () {
    const id = this.$route.params.id
    if (id) {
      this.todo = todoService.getItemById(id)
    }
  },
  methods: {

    // Add new task
    addTask () {
      if (!this.taskName) return

      this.todo.tasks.push({
        id: Date.now(),
        label: this.taskName,
        status: false
      })

      this.taskName = ''

    },

    // handle remove task 
    async deleteTask (task) {
      if (await confirm('Вы точно хотите удалить задачу?')) {
        const idx = this.todo.tasks.findIndex(item => item === task)
        this.todo.tasks.splice(idx, 1)
      }
    },

    // handle remove todo 
    async deleteTodo () {
      if (await confirm('Вы точно хотите удалить заметку?')) {
        todoService.removeItem(this.todo)
        this.$router.push({ name: 'Main' })
      }
    },

    // saving Todo
    saveTodo () {
      this.watching = false
      todoService.setItem({ id: this.todo?.id ?? Date.now(), ...this.todo })
      this.$router.push({ name: 'Main' })
    },

    // saving history actions
    saveHistory (val) {
      if (this.watching) {
        this.todoHistory.push(JSON.parse(JSON.stringify(val)));
        this.histotyIndex = this.todoHistory.length - 1;
      } else {
        this.watching = true;
      }
    },

    // undoing action
    undo () {
      this.watching = false;
      if (this.histotyIndex > 0) {
        this.histotyIndex -= 1;
        this.todo = this.todoHistory[this.histotyIndex];
      }
    },

    // redoing action
    redo () {
      this.watching = false;
      if (this.histotyIndex < (this.todoHistory.length - 1)) {
        this.histotyIndex += 1;
        this.todo = this.todoHistory[this.histotyIndex];
      }
    },
  },
  watch: {
    // watching and saving history actions
    todo: {
      handler: function (val) {
        this.saveHistory(val)
      },
      deep: true,
    },
  },
  // save data unsaved
  async beforeRouteLeave (to, from, next) {
    if (this.todoHistory.length < 2 || this.watching === false) {
      next()
      return
    }
    if (await confirm('Вы точно хотите покинуть страницу? Несохраненные изменения будут потеряны.')) {
      next()
    } else {
      next(from)
    }
  }
}
</script>
<style lang="sass">
.form
  position: relative
  &-submit
    width: 100%
    cursor: pointer
    margin-top: 10px
    box-shadow: none
    border: 1px solid #262626
    background: #3eaf7c
    border-radius: 5px
    padding: 10px
    font-weight: bold
    display: flex
    align-items: center
    justify-content: center
    & img
      width: 25px
      margin-right: 10px
  &-item
    display: flex
    flex-direction: column
    margin-bottom: 10px
    & .title
      display: flex
      justify-content: space-between
    & label
      font-size: 14px
      margin-bottom: 5px
    & input
      border-radius: 5px
      border: 1px solid #999999
      padding: 5px
      &:focus-visible
        border: 1px solid #e5c584
        outline: none
  &-add
    padding-left: 10px
    & .list
      margin-block-start: 0
      padding-inline-start: 0
      list-style-type: none
      & li
        font-size: 14px
        display: flex
        align-items: center
        & input
          margin-right: 10px
          border-radius: 5px
          border: 1px solid #999999
          // padding: 5px
    &__btn
      cursor: pointer
      margin-top: 10px
      box-shadow: none
      border: 1px solid #262626
      background: #e5c584
      border-radius: 5px
      padding: 5px
      font-weight: bold
      display: flex
      align-items: center
      justify-content: center
      & img
        width: 20px
        margin-right: 10px

.history
  &-btn
    display: flex
    justify-content: center
    position: absolute
    top: -25px
    left: 50%
    transform: translate(-50%, -50%)
    margin: 0 auto
    // width: 100%
    & button
      color: #e5c584
</style>
