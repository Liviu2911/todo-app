import React from "react"

interface Props {
  open: () => void
}

function CreateTodo({ open }: Props) {
  return (
    <button
      onClick={open}
      className="w-96 px-4 py-1 rounded bg-stone-400 hover:bg-stone-200 t3 text-stone-900"
    >
      Create New Todo
    </button>
  )
}

export default CreateTodo
