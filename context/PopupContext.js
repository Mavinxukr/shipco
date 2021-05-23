import { createContext } from "react";

const noop = () => {}

const initialValue = {
    isOpen: false, 
    setIsOpen: noop, 
    content: null, 
    setContent: noop
}

export const PopupContext = createContext(initialValue);