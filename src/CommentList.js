import React, { Component, PropTypes } from 'react'
import toggleOpen from './HOC/toggleOpen'
import Comment from './Comment'

class CommentList extends Component {
    static propTypes = {
        comments: PropTypes.array,

        isOpen: PropTypes.bool,
        toggleOpen: PropTypes.func
    };

    render() {
        const { isOpen } = this.props
        const actionText = isOpen ? 'hide comments' : 'show comments'

        const comments = this.props.comments.map((comment) => <li key={comment.id}><Comment comment = {comment}/></li>)
        return (
            <div>
                <a href = "#" onClick = {this.props.toggleOpen}>{actionText}</a>
                <ol>
                    {isOpen ? comments : null}
                </ol>
            </div>
        )
    }
}

export default toggleOpen(CommentList)