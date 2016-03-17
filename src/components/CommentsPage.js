import React, { Component, PropTypes } from 'react'
import { commentStore } from '../stores'
import { loadComments } from '../actions/comment'
import Comment from './Comment'
import { Link } from 'react-router'
const style = {
    'marginRight': '5px'
}

class CommentsPage extends Component {
	static LIMIT = 10;

	constructor(props) {
        super()

        this.loadComments(props);
        this.state = {
            comments: [],
            total: 0
        }
    }

    componentDidMount() {
        commentStore.addChangeListener(this.commentsLoaded)
    }

    componentWillUnmount() {
        commentStore.removeChangeListener(this.commentsLoaded)
    }

    componentWillReceiveProps(props) {
    	this.loadComments(props);
    }

    render() {
    	const comments = this.state.comments.map(comment => <li key={comment.id}><Comment comment = {comment}/></li>)
        return (
            <div>
                <h1>Comments page {this.props.params.page}</h1>
                <ul>
                	{comments}
                </ul>
                {this.getPaginator()}
            </div>
        )
    }

    getPaginator() {    	
    	return new Array(Math.ceil(this.state.total / CommentsPage.LIMIT) + 1).join('1').split('').map(
    		(el, index) => {    			
    			return <Link key={index} style={style} activeStyle = {{color: 'red'}} to={`/comments/${index+1}` }>
                    {index + 1}
                </Link>
    		});
    }

    loadComments(props) {
    	const data = {
        	limit: CommentsPage.LIMIT,
        	offset: (props.params.page - 1) * CommentsPage.LIMIT
        }
        setTimeout(() => loadComments(data), 0)    	
    }

    commentsLoaded = () => {
    	this.setState({
    		comments: commentStore.getAll(),
    		total: commentStore.getTotal()
    	})
    }
}

export default CommentsPage