import axios from 'axios'

export const storeLog = async (item: Object[]): Promise<void> => {
  try {
    return await axios.post('http://elasticsearch:9200/user/log', item)
  } catch (error) {
    console.error(error)
  }
}
