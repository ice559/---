// 封装本地存储操作模块
export const setItem = (name, value) => {
  if (typeof value === 'object') {
    // 数组或者对象的类型为object
    // 将这些object的数据转为JSON形式的字符串
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}
// 获取本地数据
export const getItem = name => {
  const data = window.localStorage.getItem(name)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}
// 删除数据
export const removeItem = name => {
  window.localStorage.removeItem(name)
}
