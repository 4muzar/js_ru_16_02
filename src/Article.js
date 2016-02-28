import React, { Component, PropTypes } from 'react'
import CommentList from './CommentList'
import toggleOpen from './HOC/toggleOpen'
import showTooltip from './HOC/showTooltip'
import CSSTransition from 'react-addons-css-transition-group'
require('./style.css')

class Article extends Component {
    static propTypes = {
        article: PropTypes.object,

        isOpen: PropTypes.bool,
        toggleOpen: PropTypes.func,
        
        isTooltipShown: PropTypes.bool,
        toggleTooltip: PropTypes.func
    };

    render() {
        return (
            <div ref="container">
                <a href = "#" onClick = {this.select.bind(this)} >select</a>
                {this.getTitle()}
                <CSSTransition transitionName="example" transitionAppear={true} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                    {this.getBody()}
                </CSSTransition>
            </div>
        )
    }

    getTitle() {
        const { title } = this.props.article
        const selectedStyle = this.props.selected ? {color: 'red'} : null;
        return  (
            <h3 style = {selectedStyle} onClick={this.props.toggleOpen} onMouseOver={this.onTitleMouseOver.bind(this)} onMouseOut={this.onTitleMouseOut.bind(this)}>
                {title}
            </h3>
        )
    }

    getBody() {
        if (!this.props.isOpen) return null
        const {article} = this.props
        return (
            <div key="article">
                <p>{article.body}</p>
                <CommentList comments = {article.comments || []} />
            </div>
        )
    }

    onTitleMouseOver() {
        this.props.toggleTooltip(true, this.props.article.body);
    }

    onTitleMouseOut() {
        this.props.toggleTooltip(false, this.props.article.body);
    }

    select(ev) {
        ev.preventDefault()
        this.props.select()
    }
}

export default toggleOpen(showTooltip(Article))