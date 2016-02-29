import React, { Component } from 'react'
require('./../style.css')

export default function (CustomComponent) {
    return class extends Component {
        state = {
            isTooltipShown: false
        }

        render() {
            //плохо менять структуру в HOC
            return (
                <div className = {"hinted-block-wrap"}>
                    <CustomComponent
                        {...this.state}
                        {...{toggleTooltip: this.toggleTooltip}}
                        {...this.props}
                    />
                    {this.getTooltip()}
                </div>            
            )
        }

        getTooltip() {
            if (!this.state.isTooltipShown) return null;
            return <span className = {"hint"}>{this.text}</span>
        }

        // Ром, почему объявлять функцию необходимо именно в таком виде?
        // а не toggleTooltip() { ... }
        toggleTooltip = (show, text) => {
            this.text = text;
            this.setState({
                isTooltipShown: show
            })
        }
    }
}
