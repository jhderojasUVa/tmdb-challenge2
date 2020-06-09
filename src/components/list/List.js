import {Lightning} from "wpe-lightning-sdk";
import Item from '../item/Item'

export default class List extends Lightning.Component {
    static _template() {
        return {
            Label: {
                text: {text: '', fontFace: 'Magra'}
            },
            Movies: {
                y: 75
                // Here will be all the items
            },
            Levels: {

            }
        }
    }

    _init() {
        this._index = 0;
        this._label = this.tag('Label');
        this._movies = this.tag('Movies');
        this._levels = this.tag('Levels');
    }

    _handleLeft() {
        // @todo: update index and call setIndex
        this._index = (this._index-- < 0) ? 0 : this._index--;
    }

    _handleRight() {
        // @todo: update index and call setIndex
        this._index = (this._index++ > this._movies.children.lenght - 1) ? (this._movies.children.lenght - 1) : this._index++; 
    }

    setIndex(index) {
        /**
         * @todo:
         * Implement working setIndex method
         * that stores index and position movie component to focus
         * on selected item
         */

    }

    set label(v) {
        // @todo: update list title
        this._label.text = v;
    }

    set movies(v) {
        // we add an array of object with type: Item
        this._movies.children = v.map((element, index) => {
            return {
                ...element,
                index,
                type: Item
            }
        });

        this._levels.children = v.map((element, index) => {
            return {
                ...element,
                index,
            }
        });
    }

    get items() {
        return this.tag("Levels").children;
    }

    get activeItem() {
        // @todo: return selected item
        return this._movies.children[this._index];
    }

    _getFocused() {
        // @todo:
        // return activeItem
        return this._movies.children[this._index];
    }
}
