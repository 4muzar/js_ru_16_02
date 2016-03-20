import AppDispatcher from '../dispatcher'
import { DELETE_ARTICLE, LOAD_ALL_ARICLES, LOAD_ARTICLE_BY_ID } from './constants'
import { loadAll, loadArticleById as loadById} from './api/article'
import { asyncAC } from './api/utils'
import { appStore } from '../stores'
import history from '../history'

export function deleteArticle(id) {
    AppDispatcher.dispatch({
        type: DELETE_ARTICLE,
        data: { id }
    })
    history.push('/' + appStore.getLang() + '/new')
}

export function createNewArticle() {
    history.replace('/' + appStore.getLang() + '/new')
}

export const loadAllArticles = asyncAC(LOAD_ALL_ARICLES, loadAll)
export const loadArticleById = asyncAC(LOAD_ARTICLE_BY_ID, loadById)