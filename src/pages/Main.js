import {Lightning, Utils} from 'wpe-lightning-sdk';
import {List} from "../components"

export default class Main extends Lightning.Component{
    static _template() {
        return {
            Background: {
                alpha: 0.5,
                w: 750,
                h: 1080,
                y: 0,
                x: 1200,
                transition: {
                    alpha: {
                        duration: 0.2,
                        timingFunction: 'ease'
                    }
                },
                shader: {
                    type: Lightning.shaders.RadialGradient,
                    x: 10,
                    y: 540,
                    color: 0x00ffffff,
                    radiusY: 6000,
                    radiusX: 700,
                }
            },
            // scale: 0.5,
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
        this._background = this.tag('Background');
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

        // And set one background screen (first screen)
        // TODO: TO BE DEFINED
        this._background.patch({
            src: 'https://image.tmdb.org/t/p/w220_and_h330_face' + values.results[0].poster_path,
            w: 750,
            h: 1080,
            y: 0,
            x: 1200
        });
    }

    _unfocus() {
        // @todo
    }

    _getFocused() {
        // @todo: delegate focus to List child
        return this._list;
    }

   $changeBackground(movie) {
    // Responsible for changing the background
    this._background.patch({
        src: 'https://image.tmdb.org/t/p/w220_and_h330_face' + movie.poster_path,
    });
   }
}