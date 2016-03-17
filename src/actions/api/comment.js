import $ from 'jquery'

export function loadForArticle({ articleId }) {
    return $.get(`/api/comment?article=${articleId}`)
}

export function getComments({limit, offset}) {
    return $.get(`/api/comment?limit=${limit}&offset=${offset}`)
}