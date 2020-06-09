import {Lightning, Utils} from 'wpe-lightning-sdk';
import {List} from "../components"

export default class Main extends Lightning.Component{
    static _template() {
        return {
            scale:0.5,
            Lists: {
                x: 100, y: 560, zIndex: 3,
                type: List
            },
            // @todo: add logo
            Logo: {
                x: 0,
                y: 0,
                src: Utils.asset('images/logo.png')
            }
        };
    }

    _init() {
        this._index = 0; 
        this._list = this.tag('Lists');
    }

    _focus() {
        this.signal('hideSplash', true);
    }

    /**
     * @todo: add set movies() that will be called by the data-provider
     * inside set movies create new List child and call it's movies setter
     * and hand over the movies
     */

    set movies(values) {

        this._list.label = 'Popular';
        this._list.movies = values.results;
    }

    _unfocus() {
        // @todo
    }

    _getFocused() {
        // @todo: delegate focus to List child
        return this._list;
    }

}