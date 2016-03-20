import { CHANGE_LANG } from './constants'
import AppDispatcher from '../dispatcher'

export function changeLang({lang}) {
    AppDispatcher.dispatch({
        type: CHANGE_LANG,
        data: {
            lang: lang
        }
    })
}