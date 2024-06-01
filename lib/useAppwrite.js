import { useEffect, useState } from "react"
import { Alert } from "react-native"


const useAppwrite = (fn) => {

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsLoading(true)
    await fn()
    .then(response => {
        setData(response)
    })
    .catch(error => {
      Alert.alert("Error: ",error.message)
    })
    .finally(() => {
      setIsLoading(false)
    });
  }

  const refresh = () => fetchData()

  return {
    data,
    isLoading,
    refresh
  }
}

export default useAppwrite