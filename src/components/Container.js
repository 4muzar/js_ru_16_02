import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { articlesStore, usersStore, appStore } from '../stores'
import ArticleList from './ArticleList'
import { loadAllArticles, createNewArticle } from './../actions/articles'
import { login } from '../actions/user'
import { changeLang } from '../actions/app'

class Container extends Component {
    state = {
        articles: articlesStore.getOrLoadAll(),
        loading: articlesStore.loading,
        currentUser: usersStore.currentUser,
        lang: appStore.getLang()
    }

    componentDidMount() {
        articlesStore.addChangeListener(this.change)
        usersStore.addChangeListener(this.changeUser)
    }

    componentWillUnmount() {
        articlesStore.removeChangeListener(this.change)
        usersStore.removeChangeListener(this.changeUser)
    }

    static childContextTypes = {
        user: PropTypes.string
    }

    getChildContext() {
        return {
            user: this.state.currentUser
        }
    }

    render() {
        const { loading } = this.state
        if (loading) return <h3>Loading...</h3>
        return (
            <div>
                <a href = "#" onClick = {this.login}>Login</a><br/>
                Change lang: <a href = "#" onClick = {this.changeLang.bind(this, 'ru')}>ru</a> <a href = "#" onClick = {this.changeLang.bind(this, 'en')}>en</a>
                {this.getMenu()}
                {this.props.children}
            </div>
        )
    }

    login = (ev) => {
        ev.preventDefault()
        login()
    }

    changeLang (lang) {
        changeLang({lang})
    }

    getMenu() {
        const links = this.state.articles.map((article) =>
            <li key={article.id}>
                <Link to={`/${this.state.lang}/articles/${article.id}`}
                    activeClassName = "active"
                    activeStyle = {{color: 'red'}}
                >
                    {article.title}
                </Link>
            </li>)
        return <div>
            <ul>{links}</ul>
            <a href="#" onClick={this.handleNewClick}>create new article</a>
        </div>
    }
    handleNewClick = (ev) => {
        ev.preventDefault()
        createNewArticle()
    }

    changeUser = () => {
        this.setState({
            currentUser: usersStore.currentUser
        })
    }

    change = () => {
        this.setState({
            loading: articlesStore.loading,
            articles: articlesStore.getAll()
        })
    };
}


export default Container