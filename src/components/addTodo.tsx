import React, { useContext, useEffect, useState } from "react"
import { AddTodoContext, Todo } from "../App"
import { IoClose } from "react-icons/io5"
import { AnimatePresence, motion } from "framer-motion"
import Input from "./input"
import Modal from "./modal"

interface Props {
  close: () => void
  changeTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

function AddTodo({ close, changeTodos }: Props) {
  const show = useContext(AddTodoContext)
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  return (
    <Modal close={close} show={show} title="Add New Todo">
      <form
        onSubmit={e => {
          e.preventDefault()
          changeTodos(prev => [
            ...prev,
            {
              title,
              body,
              id: prev.length > 0 ? prev[prev.length - 1].id + 1 : 0,
              done: false,
            },
          ])
          close()
        }}
        className="flex flex-col gap-4"
      >
        <Input name="title" changeInput={setTitle} />
        <Input name="body" changeInput={setBody} />

        <button
          type="submit"
          className="px-2 py-1 text-stone-400 t3 hover:text-stone-200 rounded border-[1px] border-stone-400 hover:border-stone-200"
        >
          Add
        </button>
      </form>
    </Modal>
  )
}

export default AddTodo
