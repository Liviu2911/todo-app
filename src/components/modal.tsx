import { AnimatePresence, motion } from "framer-motion"
import React from "react"
import { IoClose } from "react-icons/io5"

interface Props {
  close: () => void
  show: boolean
  children: React.ReactNode
  title: string
}

function Modal({ close, show, children, title }: Props) {
  const animation = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: { duration: 0.75, ease: "linear" },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.75, ease: "linear" },
    },
  }
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          variants={animation}
          initial="initial"
          animate="animate"
          exit="exit"
          className={`flex items-center justify-center flex-col gap-10 z-20 w-full h-full bg-black bg-opacity-60 absolute top-0 t3`}
        >
          <h1 className="text-center absolute top-72 text-stone-200 text-xl">
            {title}
          </h1>

          <button
            onClick={close}
            className="text-stone-200 hover:text-red-500 t3 text-2xl top-20 right-20 absolute"
          >
            <IoClose />
          </button>

          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Modal
