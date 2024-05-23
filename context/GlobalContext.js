import { createContext, useContext, useState, useEffect } from "react"
import { getCurrentUser } from "../lib/appwrite"


const GlobalContext = createContext()

export const useGlobalContext = () => useContext(GlobalContext)

const GlobalContextProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [isConnected, setIsConnected] = useState(false)
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {

        getCurrentUser()
            .then(response => {
                if (response) {
                    setIsConnected(true)
                    setUser(response)
                }else{
                    setIsConnected(false)
                    setUser(null)
                }
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    return (
        <GlobalContext.Provider value={{
            user,
            setUser,
            isConnected,
            setIsConnected,
            isLoading,
            setIsLoading
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContextProvider