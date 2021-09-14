import React, { createContext, useState } from "react";

export const NSFWContext = createContext({})

export const NSFWContextProvider = ({ children }) => {
  let [NSFWEnabled, setNSFWEnabled] = useState(() => {
    return window.localStorage.getItem('NSFWEnabled') === 'true'
  })

  const handleToggleNSFW = () => {
    window.localStorage.setItem('NSFWEnabled', NSFWEnabled ? 'false' : 'true');
    setNSFWEnabled(!NSFWEnabled)
  }

  return (
    <NSFWContext.Provider value={{
      NSFWEnabled, setNSFWEnabled, handleToggleNSFW
    }}>
      {children}
    </NSFWContext.Provider>
  )
}