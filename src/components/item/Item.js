import {Lightning, Utils} from "wpe-lightning-sdk";

export default class Level extends Lightning.Component{
    static _template(){
        return {
            Image: {

            },
            Title: {
                y: 310, x: 20,
                text: {fontFace: "Magra", fontSize: 24}
            }
        }
    }

    _init() {
        this._image = this.tag('Image');
        this._title = this.tag('Title');
    }

    /**
     * @todo:
     * - toggle alpha on focus / unfocus (transition)
     */

    // set item(v){
    //     // @todo: patch the correct image and title
    // }

    set poster_path(v) {
        this._image.src = 'https://image.tmdb.org/t/p/w220_and_h330_face' + v;
    }

    set title(v) {
        this._title.text = v;
    }
}