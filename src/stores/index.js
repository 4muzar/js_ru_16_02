//import {articles, comments} from '../fixtures'
import ArticleStore from './ArticleStore'
import CommentStore from './CommentStore'
import UserStore from './UserStore'
import AppStore from './AppStore'

let stores = {}
Object.assign(stores, {
    articles: new ArticleStore(stores),
    comments: new CommentStore(stores),
    users: new UserStore(stores),
    app: new AppStore(stores)
})

window.stores = stores

export const articlesStore = stores.articles
export const commentStore = stores.comments
export const usersStore = stores.users
export const appStore = stores.app
