import { globSync } from 'glob'
import { dependenciesDirectory } from '../core/cz/denpendencyRules/dependcyDiretory'
import { posixGetBasename } from './pathUtils'
function getDependencies(arr: string[]) {
  const dependencies: string[] = []

  dependenciesDirectory.forEach((rule) => {
    globSync(rule).forEach((path) => {
      dependencies.push(posixGetBasename(path))
    })
  })
  if (dependencies.length == 0) {
    return arr
  } else {
    const filterDependencies = arr.filter((depend) => {
      let flag: boolean = true
      dependencies.forEach((item) => {
        if (item === depend) {
          flag = false
        }
      })
      return flag
    })
    return filterDependencies
  }
}
export { getDependencies }
