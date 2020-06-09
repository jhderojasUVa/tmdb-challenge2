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

    _build() {
        this._maxItems = 0;
    }

    _init() {
        this._index = 0;
        this._label = this.tag('Label');
        this._movies = this.tag('Movies');
        this._levels = this.tag('Levels');
    }

    _handleLeft() {
        // @todo: update index and call setIndex
        if (this._index > 0) {
            this._index++;
            this.setIndex(this._index);
        }
    }

    _handleRight() {
        // @todo: update index and call setIndex

        // Why _maxItems = 0?
        if (this._index < this._maxItems) {
            this._index--;
            this.setIndex(this.index);
        }
    }

    setIndex(index) {
        /**
         * @todo:
         * Implement working setIndex method
         * that stores index and position movie component to focus
         * on selected item
         */
        this._movies.patch({
            x: 250 * index
        });

    }

    set maxItems(c) {
        // Why this setter is not working?
        this._maxItems = c;
    }

    set label(v) {
        // @todo: update list title
        this._label.text = v;
    }

    set movies(v) {
        // we add an array of object with type: Item
        this._movies.children = v.map((element, index) => {
            return {
                // ...element,
                item: element,
                index,
                type: Item,
                x: index * 250 //250 pixels separation? who knows 
            }
        });

        this.maxItems = this._movies.children.length; // Why after setting here is not available for other methods of the object?
                                                       // it's because the data from an async?
        console.log(this._maxItems) // Why here _maxItems = 20?
    }

    get items() {
        // return this.tag("Levels").children;
        return this.tag('Movies').children;
    }

    get activeItem() {
        // @todo: return selected item
        return this._movies.children[this._index];
    }

    _getFocused() {
        // @todo:
        // return activeItem
        return this.activeItem;
    }
}
