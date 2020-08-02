import axios from 'axios'

export const storeLog = async (item: Object[]): Promise<void> => {
  try {
    const result = await axios.post('http://elasticsearch:9200/user/log', item)
    console.log(result)
  } catch (error) {
    console.error(error)
  }
}
