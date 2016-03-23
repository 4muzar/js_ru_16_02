import {comments as defaultComents} from '../fixtures'
import { ADD_COMMENT } from '../actions/constants'

export default (comments = defaultComents, action) => {
    const { type, data } = action

    switch (type) {
		case ADD_COMMENT: return comments.concat({text: data.text, id: data.id})
    }

    return comments
}