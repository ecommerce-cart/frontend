export const getAndParseStorageItem = <T>(itemName: string): T | null => {
  try {
    return JSON.parse(localStorage.getItem(itemName) as string) as T
  } catch (e) {
    return null
  }
}
