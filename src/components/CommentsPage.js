import React, { Component, PropTypes } from 'react'
import { commentStore } from '../stores'
import { loadComments } from '../actions/comment'
import Comment from './Comment'

class CommentsPage extends Component {
	constructor(props) {
        super()
        const { params: { id }} = props
        setTimeout(() => loadComments(), 0)
        this.state = {
            comments: commentStore.getAll()
        }
    }

    componentDidMount() {
        commentStore.addChangeListener(this.commentsLoaded)
    }

    componentWillUnmount() {
        commentStore.removeChangeListener(this.commentsLoaded)
    }

    render() {
    	const comments = this.state.comments.map(comment => <li key={comment.id}><Comment comment = {comment}/></li>)    	
        return (
            <div>
                <h1>All comments page for articles</h1>
                <ul>
                	{comments}
                </ul>
            </div>
        )
    }

    commentsLoaded = () => {
    	this.setState({
    		comments: commentStore.getAll()
    	})
    }
}

export default CommentsPage