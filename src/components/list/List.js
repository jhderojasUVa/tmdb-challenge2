import {Lightning} from "wpe-lightning-sdk";
import Item from '../item/Item'

export default class List extends Lightning.Component {
    static _template() {
        return {
            Label: {
                // text: {text: '', fontFace: 'Magra'}
                y: -10,
                text: {text: '', fontFace: 'SourceSansPro-Bold', fontSize: 60}
            },
            Movies: {
                y: 75,
                // Here will be all the items
                transitions: {
                    x: { duration: 0.5, timingFunction: 'ease' }
                } 
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
            this._index--;
            this.setIndex(this._index);
        }
    }

    _handleRight() {
        // @todo: update index and call setIndex

        if (this._index < this._moviesContent.length - 1) {
            this._index++;
            this.setIndex(this._index);
        }
    }

    setIndex(index) {
        /**
         * @todo:
         * Implement working setIndex method
         * that stores index and position movie component to focus
         * on selected item
         */
        // We move the list
        this._movies.patch({
            x: - (((1920 * 2) * index)/ this._moviesContent.length)
        });

        // Maybe is so up...
        this.fireAncestors('$changeBackground', this._moviesContent[index]);
    }

    set label(v) {
        // @todo: update list title
        this._label.text = v;
    }

    set movies(v) {
        // we add an array of object with type: Item

        this._moviesContent = v;

        this._movies.children = v.map((element, index) => {
            return {
                // ...element,
                item: element,
                index,
                type: Item,
                x: index * 250 //250 pixels separation? who knows 
            }
        });
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
