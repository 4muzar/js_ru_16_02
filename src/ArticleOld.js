import React, { Component } from 'react'
import CommentList from './CommentList'
import toggleOpen from './mixins/toggleOpen'
import hinted from './mixins/hinted'
require('./style.css')

const Article = React.createClass({
    mixins: [toggleOpen, hinted],

    componentDidMount() {
        
    },

    render() {
        return (
            <div className = {"hinted-block-wrap"}>
                <div ref="container">
                    <a href = "#" onClick = {this.select} >select</a>
                    {this.getTitle()}
                    {this.getBody()}
                </div>
                {this.getTooltip()}
            </div>
        )
    },

    getTitle() {
        const { title } = this.props.article
        const selectedStyle = this.props.selected ? {color: 'red'} : null;
        return  (
            <h3 style = {selectedStyle} onClick={this.toggleOpen} onMouseOver={this.onTitleMouseOver} onMouseOut={this.onTitleMouseOut}>
                {title}
            </h3>
        )
    },

    getBody() {
        if (!this.state.isOpen) return null
        const {article} = this.props
        return (
            <div>
                <p>{article.body}</p>
                <CommentList comments = {article.comments || []} />
            </div>
        )
    },

    getTooltip() {
        if (!this.state.isTooltipShown) return null;
        return <span className = {"hint"}>{this.text}</span>
    },

    onTitleMouseOver() {
        this.toggleTooltip(true, this.props.article.body);
    },

    onTitleMouseOut() {
        this.toggleTooltip(false, this.props.article.body);
    },

    select(ev) {
        ev.preventDefault()
        this.props.select()
    }
})

export default Article