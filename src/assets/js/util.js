// 随机洗牌算法
export function shuffle (source) {
  // console.log(source)
  const arr = source.slice() // 拷贝
  for (let i = 0; i < arr.length; i++) {
    const j = getRandomInt(i)
    swap(arr, i, j)
  }
  return arr
}

function getRandomInt (max) {
  return Math.floor(Math.random() * (max + 1))
}

function swap (arr, i, j) {
  const t = arr[i]
  arr[i] = arr[j]
  arr[j] = t
}

// 格式化时间
export function formatTime (interval) {
  interval = (interval / 1000) | 0 // 向下取整
  const minute = ((interval / 60 | 0) + '').padStart(2, '0') // 保持2位，不足2位填充0
  const second = (interval % 60 + '').padStart(2, '0')
  return `${minute}:${second}`
}

// 防抖
export function debounceFun (func, delay) {
  let timer

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

// 节流
export function throttlefun (func, delay) {
  let timer = null

  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(this, args)
        timer = null
      }, delay)
    }
  }
}
