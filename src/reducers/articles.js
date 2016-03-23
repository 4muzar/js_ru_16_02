import { DELETE_ARTICLE, ADD_COMMENT } from '../actions/constants'
import { articles as defaultArticles} from '../fixtures'

export default (articles = defaultArticles, action) => {
    const { type, data } = action

    switch (type) {
        case DELETE_ARTICLE: return articles.filter((article) => article.id != data.id)
        case ADD_COMMENT: 
        	const article = articles.filter((article) => article.id == data.articleId)[0]
            article.comments = (article.comments || []).concat(data.id)
        	return articles
    }

    return articles
}