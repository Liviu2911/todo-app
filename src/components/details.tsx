import React, { useContext, useEffect, useState } from "react"
import { DetailsContext, Todo } from "../App"
import Modal from "./modal"
import Input from "./input"

interface Props {
  todo: Todo
  close: () => void
  changeTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

function Details({ close, changeTodos, todo }: Props) {
  const show = useContext(DetailsContext)
  const [editMode, setEditMode] = useState(false)
  const [newTitle, setNewTitle] = useState(todo?.title || "none here")
  const [newBody, setNewBody] = useState(todo?.body || "")

  useEffect(() => {
    setNewTitle(todo?.title || "")
    setNewBody(todo?.body || "")
  }, [todo])

  return (
    <Modal
      close={close}
      show={show}
      title={!editMode ? todo?.title || "e" : "Edit Your Todo"}
    >
      {editMode ? (
        <form
          className="flex flex-col gap-4"
          onSubmit={e => {
            e.preventDefault()

            changeTodos(prev =>
              prev.map(item =>
                item.id === todo?.id
                  ? { ...item, title: newTitle, body: newBody }
                  : item
              )
            )

            setEditMode(false)
            close()
          }}
        >
          <Input name="title" changeInput={setNewTitle} value={newTitle} />
          <Input name="body" changeInput={setNewBody} value={newBody} />

          <button
            type="submit"
            className="rounded text-stone-400 border border-stone-400 hover:text-stone-200 hover:border-stone-200 t3 py-1"
          >
            Save
          </button>
          <button
            onClick={() => setEditMode(false)}
            className="rounded text-stone-400 border border-stone-400 hover:text-red-500 hover:border-stone-200 t3 py-1"
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <p className="text-stone-200 max-w-[600px]">{todo?.body}</p>
          <button
            onClick={() => setEditMode(!editMode)}
            className="text-stone-400 border border-stone-400 rounded t3 hover:text-stone-200 hover:border-stone-200 px-4 py-1"
          >
            Edit Your Todo
          </button>
        </>
      )}
    </Modal>
  )
}

export default Details
