import { createContext, useEffect, useState } from "react"
import Navbar from "./components/navbar"
import TodoComponent from "./components/todo"
import CreateTodo from "./components/create"
import AddTodo from "./components/addTodo"
import Details from "./components/details"

export type Todo = {
  title: string
  body: string
  done: boolean
  id: number
}

const TodoContext = createContext<Todo[]>([])
export const AddTodoContext = createContext<boolean>(false)
export const DetailsContext = createContext<boolean>(false)

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [doneTodos, setDoneTodos] = useState<number>(
    todos.filter(todo => todo.done).length
  )
  const [modalAdd, setModalAdd] = useState(false)
  const [details, setDetails] = useState(false)
  const [current, setCurrent] = useState<Todo | null>(null)

  useEffect(() => {
    setDoneTodos(todos.filter(todo => todo.done).length)
  }, [todos])

  const close = () => setModalAdd(false)
  const open = () => setModalAdd(true)

  const closeDetails = () => setDetails(false)
  const openDetails = (todo: Todo) => {
    setCurrent(todo)
    setDetails(true)
  }

  return (
    <TodoContext.Provider value={todos}>
      <Navbar />

      <div className="flex items-center justify-center gap-2 text-stone-200 ml-10 text-lg">
        <span>{doneTodos}</span>/<span>{todos.length}</span> done
      </div>

      <div className="flex flex-col gap-2 items-center mt-10">
        {todos.map(todo => (
          <TodoComponent
            key={todo.id}
            todo={todo}
            changeTodos={setTodos}
            openDetails={openDetails}
          />
        ))}
        <CreateTodo open={open} />
      </div>

      <AddTodoContext.Provider value={modalAdd}>
        <AddTodo close={close} changeTodos={setTodos} />
      </AddTodoContext.Provider>

      <DetailsContext.Provider value={details}>
        <Details
          changeTodos={setTodos}
          close={closeDetails}
          todo={current || todos[0]}
        />
      </DetailsContext.Provider>
    </TodoContext.Provider>
  )
}

export default App
