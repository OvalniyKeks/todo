export const todoService = {

  // STORAGE KEY
  store_key: 'todo',


  getAllTodo () {
    try {
      return JSON.parse(window.localStorage.getItem(this.store_key)) ?? []
    } catch (error) {
      console.log(error)
      return []
    }
  },

  setAllTodo (todos) {
    window.localStorage.setItem(this.store_key, JSON.stringify(todos))
  },

  getItemById (id) {
    const items = this.getAllTodo()
    const item = items.find(todo => todo.id == id)
    if (!item) return null
    return item
  },

  setItem (todo) {
    const items = this.getAllTodo()
    const idx = items.findIndex(item => item.id == todo.id)
    if (idx !== -1) {
      items.splice(idx, 1, todo)
    } else {
      items.push(todo)
    }
    this.setAllTodo(items)
  },

  removeItem (todo) {
    const items = this.getAllTodo()
    const idx = items.findIndex(item => item.id == todo.id)
    items.splice(idx, 1)
    this.setAllTodo(items)
  }
}
