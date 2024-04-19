import React from "react"

interface Props {
  name: string
  changeInput: React.Dispatch<React.SetStateAction<string>>
  value?: string
}

function Input({ name, changeInput, value }: Props) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="capitalize text-stone-200">
        {name}
      </label>
      <input
        onChange={e => changeInput(e.target.value)}
        type="text"
        name={name}
        className="focus:outline-none outline-none border-[1px] border-stone-400 focus:border-stone-200 bg-stone-900 rounded px-4 py-1 text-stone-200 t3 w-56 text-center"
        maxLength={name === "title" ? 20 : 100}
        value={value}
      />
    </div>
  )
}

export default Input
