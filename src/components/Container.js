import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { articlesStore, usersStore, appStore } from '../stores'
import { i18n } from '../i18n'
import ArticleList from './ArticleList'
import { loadAllArticles, createNewArticle } from './../actions/articles'
import { login } from '../actions/user'
import { changeLang } from '../actions/app'
import history from '../history'

class Container extends Component {
    state = {
        articles: articlesStore.getOrLoadAll(),
        loading: articlesStore.loading,
        currentUser: usersStore.currentUser,
        lang: appStore.getLang(),
        dictionary: i18n[appStore.getLang()]
    }

    componentDidMount() {
        articlesStore.addChangeListener(this.change)
        usersStore.addChangeListener(this.changeUser)
        appStore.addChangeListener(this.changeLang)
    }

    componentWillUnmount() {
        articlesStore.removeChangeListener(this.change)
        usersStore.removeChangeListener(this.changeUser)
        appStore.removeChangeListener(this.changeLang)
    }

    static childContextTypes = {
        user: PropTypes.string,
        dictionary: PropTypes.object
    }

    getChildContext() {
        return {
            user: this.state.currentUser,
            dictionary: this.state.dictionary
        }
    }

    render() {
        const { loading } = this.state
        if (loading) return <h3>{this.state.dictionary.loading}...</h3>
        return (
            <div>
                <a href = "#" onClick = {this.login}>{this.state.dictionary.login}</a><br/>
                {this.state.dictionary.changeLang}: <a href = "#" onClick = {this.changeLangHandler.bind(this, 'ru')}>ru</a> <a href = "#" onClick = {this.changeLangHandler.bind(this, 'en')}>en</a>
                {this.getMenu()}
                {this.props.children}
            </div>
        )
    }

    login = (ev) => {
        ev.preventDefault()
        login()
    }

    changeLangHandler (lang, ev) {
        ev.preventDefault()
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
            <a href="#" onClick={this.handleNewClick}>{this.state.dictionary.createNewArticle}</a>
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

    changeLang = () => {
        this.setState({
            lang: appStore.getLang(),
            dictionary: i18n[appStore.getLang()]
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