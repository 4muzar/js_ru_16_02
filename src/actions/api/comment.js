import $ from 'jquery'

export function loadForArticle({ articleId }) {
    return $.get(`/api/comment?article=${articleId}`)
}

export function getComments() {
    return $.get(`/api/comment`)
}