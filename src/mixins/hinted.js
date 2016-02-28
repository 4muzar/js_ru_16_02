export default {
    getInitialState() {
        return {
            isTooltipShown: false
        }
    },

    toggleTooltip: function(show, text) {
        this.text = text;
        this.setState({
            isTooltipShown: show
        })
    }
}
