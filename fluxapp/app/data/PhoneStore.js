import {List} from "immutable";
import {ReduceStore} from "flux/utils";
import ActionTypes from "./ActionTypes.js";
import PhonesDispatcher from "./PhonesDispatcher.js";

class PhonesStore extends ReduceStore{
    constructor()
    {
        super(PhonesDispatcher);
    }
    getInitialState() {
        return List(JSON.parse(localStorage.getItem("items"))) || List.of("Apple iPhone 12 Pro", "Google Pixel 5");
    }

    reduce(state, action) {
        let index;
        switch (action.type) {
            case ActionTypes.ADD_ITEM:
                if (action.text) {
                    state = state.push(action.text)
                    localStorage.setItem("items", JSON.stringify(state))
                    return state;
                }
                return state;
            case ActionTypes.REMOVE_ITEM:
                index = state.indexOf(action.text);
                if (index > -1) {
                    state = state.delete(index)
                    localStorage.setItem("items", JSON.stringify(state))
                    return state;
                }
                return state;
            case ActionTypes.UPDATE_ITEM:
                index = state.indexOf(action.oldText);
                if (index > -1) {
                    state.delete(index);
                    localStorage.setItem("items", JSON.stringify(state))
                    return state.set(index, action.newText);
                }
                return state;
            default:
                return state;
        }
    }
}
export default new PhonesStore();