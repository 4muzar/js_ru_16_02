import React, { Component, PropTypes } from 'react'
import { commentStore } from '../stores'
import { loadComments } from '../actions/comment'
import Comment from './Comment'

class CommentsPage extends Component {
	static LIMIT = 10;

	constructor(props) {
        super()
        const { params: { page }} = props
        const data = {
        	limit: 10,
        	offset: (page - 1) * CommentsPage.LIMIT
        }        
        setTimeout(() => loadComments(data), 0)
        this.state = {
        	page: page,
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
                <h1>Comments page {this.state.page}</h1>
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