import {Lightning, Utils} from "wpe-lightning-sdk";

// LEVEL? ITEM?
// We need to have an example of an Item in order to create the correct layout!
export default class Level extends Lightning.Component {
    static _template(){
        return {
            Image: {
                src: ''
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

     _focus() {
         this.patch({
             smooth: {
                 alpha: [0.5, { duration: 0.2, timingFunction: 'ease-in'}]
             }
         })
     }

     _unfocus() {
        this.patch({
            smooth: {
                alpha: [1, { duration: 0.2, timingFunction: 'ease-out'}]
            }
        })
     }

    set item(v){
        // @todo: patch the correct image and title
        
        // Because we don't know the correct URL we use that (that must be wrong)
        const url = 'https://image.tmdb.org/t/p/w220_and_h330_face';

        // Patch the image
        this.tag('Image').patch({
            src: url + v.poster_path
        });
        // Patch the title 
        this.tag('Title').patch({
            text: {
                text: v.title
            }
        });

        // this.x = this.index
    }
}