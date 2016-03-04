import SimpleStore from './SimpleStore'
import { DELETE_ARTICLE, ADD_COMMENT, LOAD_ALL_ARICLES, LOAD_ARTICLE_BY_ID,_START, _FAIL, _SUCCESS } from '../actions/constants'
import AppDispatcher from '../dispatcher'

class ArticleStore extends SimpleStore {
    constructor(...args) {
        super(...args)
        this.dispatchToken = AppDispatcher.register((action) => {
            const { type, data, response, error } = action

            switch (type) {
                case DELETE_ARTICLE:
                    this.delete(data.id)
                    break;

                case ADD_COMMENT:
                    AppDispatcher.waitFor([this.__stores.comments.dispatchToken])
                    const article = this.getById(data.articleId)
                    article.comments = (article.comments || []).concat(data.id)
                    break

                case LOAD_ALL_ARICLES + _START:
                    this.loading = true
                    this.loaded = false
                    break;

                case LOAD_ALL_ARICLES + _FAIL:
                    this.loaded = false
                    this.loading = false
                    this.error = error
                    break

                case LOAD_ALL_ARICLES + _SUCCESS:
                    this.loaded = true
                    this.loading = false
                    response.forEach(this.add)
                    break;

                case LOAD_ARTICLE_BY_ID + _START:
                    break;

                case LOAD_ARTICLE_BY_ID + _SUCCESS:
                    break;

                default: return
            }

            this.emitChange()
        })
    }
}

export default ArticleStore