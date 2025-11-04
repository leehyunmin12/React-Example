import { useState, useEffect } from 'react';
import { supabase } from "./supabaseClient"

function App() {
  const [todos, setTodos] = useState([])
  const [newTask, setNewTask] = useState('')

  useEffect(() => {
    getTodos()
  }, [])

  async function toggleComplete(id, is_completed) {
    const { error } = await supabase
      .from('todos')
      .update({ is_completed: !is_completed })
      .eq('id', id)

    if (error) {
      console.error('Error updating todo:', error)
    } else {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, is_completed: !is_completed } : todo
        )
      )
    }
  }

  async function getTodos() {
    const { data, error } = await supabase.from('todos').select('*')

    if (error) {
      console.error('Error fetching todos:', error)
    } else {
      setTodos(data)
    }
  }

  async function addTodo(e) {
    e.preventDefault()

    if (newTask.trim().length === 0) return

    const { data, error } = await supabase
      .from('todos')
      .insert([{ task: newTask, user_id: null }])
      .select()

    if (error) {
      console.error('Error adding todo:', error)
    } else {
      setTodos([...todos, ...data])
      setNewTask('')
    }
  }
  async function deleteTodo(id) {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting todo:', error)
    } else {
      setTodos(todos.filter((todo) => todo.id !== id))
    }
  }

  return (
    <div>
      <h1>My Todo List</h1>

      <form onSubmit={addTodo}>
        <input type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task"
        />
        <button type="submit">Add Todo</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}

            style={{ textDecoration: todo.is_completed ? "line-through" : "none" }}>
            <input type="checkbox" checked={todo.is_completed}
              onChange={() => toggleComplete(todo.id, todo.is_completed)}
            />
            {todo.task}
            <button onClick={() => deleteTodo(todo.id)}>X</button>
            </li>
            
        ))}
      </ul>
    </div>
  );
}


export default App