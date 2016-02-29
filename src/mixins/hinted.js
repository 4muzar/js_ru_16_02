export default {
    getInitialState() {
        return {
            isTooltipShown: false
        }
    },

    toggleTooltip: function(show, text) {
        //атата писать в this. правильно text тоже в стейте держать
        this.text = text;
        this.setState({
            isTooltipShown: show
        })
    }
}
