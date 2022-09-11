import { createContext, useState } from 'react'

const InputContext = createContext()

const InputProvider = ({ children }) => {

    const [inputValue, setInputValue] = useState('')

    const values = { inputValue, setInputValue }

    return (
        <InputContext.Provider value={values}>
            {children}
        </InputContext.Provider>
    )
}

export {InputContext, InputProvider}
