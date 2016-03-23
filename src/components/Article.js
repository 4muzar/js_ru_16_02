import React, { Component, PropTypes } from 'react'
import CommentList from './CommentList'
// import { deleteArticle } from './../actions/articles'
// import translate from '../HOC/Translate'
// require('./../style.css')

class Article extends Component {
    static propTypes = {
        article: PropTypes.object
    };

/*
    shouldComponentUpdate(nextProps, nextState) {
        console.log('---', arguments);
        return this.props.article != nextProps.article
    }
*/

    render() {
        return (
            <div>
                {this.getTitle()}
                {this.getBody()}
            </div>
        )
    }

    getTitle() {
        const { article: { title } } = this.props
        return  (
            <h3>
                {title}
            </h3>
        )
    }

    getBody() {
        const {article} = this.props
        return (
            <div key="article">
                <a href="#" onClick = {this.handleDeleteArticle}>delete this article</a>
                <p>{article.body}</p>
                {<CommentList article = {article}/>}
            </div>
        )
    }

    handleDeleteArticle = (ev) => {
        ev.preventDefault()
        deleteArticle(this.props.article.id)
    };
}

export default Article