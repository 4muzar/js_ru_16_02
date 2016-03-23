import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Comment from './Comment'
import toggleOpen from './../HOC/toggleOpen'
import { getRelation } from './../utils'
import { addComment } from './../actions/comments'
// import translate from '../HOC/Translate'

class CommentList extends Component {
    static propTypes = {
        article: PropTypes.object,

        isOpen: PropTypes.bool,
        toggleOpen: PropTypes.func,
        addComment: PropTypes.func
    };

    static contextTypes = {
        router: PropTypes.object,
        user: PropTypes.string
    }

    state = {
        comment: ''
    }

    render() {
        const { isOpen, toggleOpen } = this.props
        const actionText = isOpen ? 'hide comments' : 'show comments'

        return (
            <div>
                <a href = "#" onClick = {toggleOpen}>{actionText}</a>
                {this.getBody()}
            </div>
        )
    }

    getBody() {
        const { article, isOpen } = this.props
        if (!isOpen) return null        
        const commentList = getRelation(article, 'comments').map(comment => <li key={comment.id}><Comment comment = {comment}/></li>)    
        return (
            <div>
                <ul>{isOpen ? commentList : null}</ul>
                <input value = {this.state.comment} onChange = {this.commentChange}/>
                <a href = "#" onClick = {this.submitComment}>add comment</a>
            </div>
        )
    }

    commentChange = (ev) => {
        this.setState({
            comment: ev.target.value
        })
    }

    submitComment = (ev) => {
        ev.preventDefault()
        this.props.addComment(this.state.comment, this.props.article.id)
        this.setState({
            comment: ''
        })
    }

    toggleOpen = (ev) => {
        ev.preventDefault()
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    checkComments(props) {
        props = props || this.props
        return !(props.article.getRelation('comments').includes(undefined))
    }
}

export default connect(null, {
    addComment
})(toggleOpen(CommentList))