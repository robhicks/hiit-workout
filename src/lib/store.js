import { browser } from '$app/environment'
import { get, writable } from 'svelte/store'
import { get as getDb, set } from 'idb-keyval'
import { isArray, isEmpty, isNotEmpty } from './is'

export const steps = writable([])
const key = 'steps'

if (browser) {
  getDb(key).then((value) => {
    if (isNotEmpty(value) && isArray(value)) {
      const stps = get(steps)
      if (isEmpty(stps)) {
        steps.set(value)
      } 
    }
  })

  steps.subscribe((value) => {
    if (isNotEmpty(value) && isArray(value)) {
      set(key, value)
    }
  })
}
