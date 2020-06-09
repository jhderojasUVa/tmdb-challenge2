import {Lightning, Utils} from 'wpe-lightning-sdk';
import {List} from "../components"

export default class Main extends Lightning.Component{
    static _template() {
        return {
            Background: {
                alpha: 0.5,
                transition: {
                    alpha: {
                        duration: 0.2,
                        timingFunction: 'ease'
                    }
                }
            },
            scale: 0.5,
            Lists: {
                x: 100, y: 560, zIndex: 3,
                type: List
            },
            // @todo: add logo
            Logo: {
                x: 20,
                y: 20,
                src: Utils.asset('images/logo.png')
            }
        };
    }

    _init() {
        
        this._index = 0; 
        this._list = this.tag('Lists');
    }

    _focus() {
        this.fireAncestors('$hideSplashScreen', true);
    }

    /**
     * @todo: add set movies() that will be called by the data-provider
     * inside set movies create new List child and call it's movies setter
     * and hand over the movies
     */

    set movies(values) {

        // Because we don't know what the label must contain and,
        // as far we guess it's a text about what kind of label is
        // let's populate hardcoded
        // TODO: TO BE DEFINED WHAT IS LABEL
        this._list.label = 'Popular';

        this._list.patch({
            movies: values.results
        })


        // And set one background color
        // TODO: TO BE DEFINED
        this.tag('Background').patch({
            src: 'https://image.tmdb.org/t/p/w220_and_h330_face' + values.results[this._index].poster_path,
            w: 1920 * 2,
            h: 1080 * 5,
            y: -1080,
            shader: {
                type: Lightning.shaders.BoxBlur,
            }
        });
    }

    _unfocus() {
        // @todo
    }

    _getFocused() {
        // @todo: delegate focus to List child
        return this._list;
    }

}