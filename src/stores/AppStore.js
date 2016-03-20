import SimpleStore from './SimpleStore'
import { CHANGE_LANG } from '../actions/constants'
import AppDispatcher from '../dispatcher'
import history from '../history'

class AppStore extends SimpleStore {
    constructor(...args) {
        super(...args)

        this.__lang = location.pathname.replace(/^\/(\w*).*/, '$1')        

        this.dispatchToken = AppDispatcher.register((action) => {
            const { type, data, response, error } = action

            switch (type) {
                case CHANGE_LANG:
                    if (this.__lang !== data.lang) {
                        const newPath = location.pathname.replace(this.__lang, data.lang)
                        this.__lang = data.lang                        
                        history.push(newPath)
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