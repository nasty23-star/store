// T extends unknown[] это generic-параметр, который означает:
// T - это тип-параметр (можно назвать как угодно, обычно T, U, V и т.д.)
// extends unknown[] - означает, что T должен быть массивом любых элементов
// T будет автоматически определяться как тип аргументов функции

export const debounce = <T extends unknown[]>(cb: (...args: T) => void, timeoutMs: number) => {
  let timeoutId: number | null = null

  return (...args: T) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => cb(...args), timeoutMs)
  }
}
