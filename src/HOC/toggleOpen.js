import React, { Component } from 'react'

export default function (CustomComponent) {
    return class extends Component {
        state = {
            isOpen: false
        }

        render() {
            return <CustomComponent
                {...this.state}
                {...{toggleOpen: this.toggleOpen}}
                {...this.props}
            />
        }

        toggleOpen = (ev) => {
            ev.preventDefault();
            this.setState({
                isOpen: !this.state.isOpen
            })
        }
    }
}
