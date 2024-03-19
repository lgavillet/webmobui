const setItem = (id, value) => localStorage.setItem(id, JSON.stringify(value))

const getItem = (id) => JSON.parse(localStorage.getItem(id))

const getItems = () => Object.keys(localStorage).map(getItem)

const removeItem = (id) => localStorage.removeItem(id)

export {setItem, getItem, getItems, removeItem}
