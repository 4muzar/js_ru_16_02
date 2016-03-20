import SimpleStore from './SimpleStore'
import { CHANGE_LANG } from '../actions/constants'
import AppDispatcher from '../dispatcher'

class AppStore extends SimpleStore {
    constructor(...args) {
        super(...args)

        this.__lang = 'ru'

        this.dispatchToken = AppDispatcher.register((action) => {
            const { type, data, response, error } = action

            switch (type) {
                case CHANGE_LANG:
                    if (this.__lang !== data.lang) {
                        this.__lang = data.lang
                        this.emitChange()
                    }
                    break;
            }
        })
    }

    getLang() {
        return this.__lang
    }
}

export default AppStore