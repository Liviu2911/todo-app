import React, { useState } from "react"
import { Todo } from "../App"
import { MdDelete } from "react-icons/md"
import { FaRegCircle, FaCircle } from "react-icons/fa"

interface Props {
  todo: Todo
  changeTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  openDetails: (todo: Todo) => void
}

function TodoComponent({ todo, changeTodos, openDetails }: Props) {
  const { title, id, done } = todo
  const [animation, setAnimation] = useState(false)

  return (
    <div
      className={`w-96 ${
        done ? "border-green-500" : "border-stone-400 hover:border-stone-200"
      } ${
        animation ? "delete" : ""
      } text-stone-400 hover:text-stone-200 border-[1px] rounded t3 px-4 py-1 flex flex-row justify-between`}
    >
      <button
        onClick={() =>
          changeTodos(prev =>
            prev.map(todo => (todo.id === id ? { ...todo, done: !done } : todo))
          )
        }
        className={
          done
            ? "hover:text-red-500 text-green-500 t3"
            : "hover:text-green-500 t3"
        }
      >
        {done ? <FaCircle /> : <FaRegCircle />}
      </button>
      <button className="f5 text-md" onClick={() => openDetails(todo)}>
        {title}
      </button>

      <button
        className="text-stone-200 hover:text-red-500 t3 z-10 text-lg"
        onClick={() => {
          setAnimation(true)
          setTimeout(() => {
            changeTodos(prev => prev.filter(todo => todo.id !== id))
          }, 1000)
        }}
      >
        <MdDelete />
      </button>
    </div>
  )
}

export default TodoComponent
