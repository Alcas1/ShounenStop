import React, { createContext, useState } from "react";
import { window } from 'browser-monads';

export const NSFWContext = createContext({})

export const NSFWContextProvider = ({ children }) => {
  
  let [NSFWEnabled, setNSFWEnabled] = useState(() => {
    return window.localStorage.getItem('NSFWEnabled') === 'true'
  })

  const handleToggleNSFW = () => {
    window.localStorage.setItem('NSFWEnabled', NSFWEnabled ? 'false' : 'true');
    setNSFWEnabled(!NSFWEnabled)
    return NSFWEnabled
  }

  return (
    <NSFWContext.Provider value={{
      NSFWEnabled, setNSFWEnabled, handleToggleNSFW
    }}>
      {children}
    </NSFWContext.Provider>
  )
}