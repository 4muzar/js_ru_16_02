import React, { Component, PropTypes } from 'react'
import Article from './Article'
// import Select from 'react-select'
// require('react-select/dist/react-select.css')

class ArticleList extends Component {
    constructor() {
        super()
        this.state = {
            open: null
        }
    }
    render() {
        return (
            <div>
                <ul>
                    {this.getArticles()}
                </ul>
            </div>
        )
    }

    getArticles() {
        return this.props.articles
            .map((article) =>
                <li key={article.id}>
                    {<Article article={article} />}
                </li>
            )
    }

    getFilter() {
        const options = this.props.articles.map(({ title, id }) => {
            return {
                label: title,
                value: id
            }
        })
        return <Select
            value = {this.state.selected}
            options = {options}
            multi = {true}
            onChange = {this.changeFilter}
        />
    }

    changeFilter = (selected) => {
        this.setState({
            selected: selected.split(',')
        })
    }

    open(open) {
        this.setState({ open })
    }
}

export default ArticleList