import { EventEmitter } from 'events'
import Model from './Model'
const CHANGE_EVENT = 'CHANGE_EVENT'


class SimpleStore extends EventEmitter {
    constructor(stores, initialState) {
        super()
        this.__stores = stores
        this.__items = []
        if (initialState) initialState.forEach(this.add)
    }

    emitChange() {
        this.emit(CHANGE_EVENT)
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback)
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback)
    }

    getTotal(value) {
        return this.__total || 0;
    }

    setTotal(value) {
        this.__total = value;
    }

    getAll() {
        return this.__items.slice().sort((a,b) => a.id - b.id)
    }

    getById = (id) => {
        return this.__items.filter((item) => item.id == id)[0]
    }

    add = (item) => {
        this.delete(item.id)
        this.__items.push(new Model(item, this.__stores))
    }

    deleteAll() {
        this.__items = []
    }

    delete(id) {
        this.__items = this.__items.filter(item => item.id != id)
    }


}

export default SimpleStore