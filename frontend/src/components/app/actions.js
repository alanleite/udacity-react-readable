import { createAction } from 'redux-actions'
import { normalize } from 'normalizr'
import { entityUpdated } from '../../module/contants'
import { CategorySchema } from '../../module/schemas'
import { getCategories } from '../../module/api'

export const onLoadStart = createAction('app/onLoadStart')
export const onLoadDone = createAction('app/onLoadDone')

export function loadCategories () {
  return async dispatch => {
    dispatch(onLoadStart)
    const categories = await getCategories()
    const normalized = normalize(categories.data.categories, [CategorySchema])
    dispatch(entityUpdated(normalized.entities))
    dispatch(onLoadDone({
      categories: normalized.result
    }))
  }
}
