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
                // y: 310, x: 20,
                y: 200,
                x: 20,
                w: 230,
                h: 100,
                Box: {
                    x: -20, 
                    w: 250, 
                    h: 150, 
                    rect: true,
                    color: 0xCC000000,
                    rect: true,
                },
                Text: {
                    color: 0xFFffffff,
                    y: 10,
                    w: 210,
                    h: 1500,
                    text: {fontFace: "SourceSansPro-Regular", fontSize: 32, maxLines: 3, textOverflow: '...'}
                }
            }
        }
    }

    _build() {
        this._image = this.tag('Image');
        this._title = this.tag('Text');
    }

    _init() {
    }

    /**
     * @todo:
     * - toggle alpha on focus / unfocus (transition)
     */

     _focus() {
         this.patch({
             smooth: {
                 alpha: [0.7, { duration: 0.2, timingFunction: 'ease-in'}],
                 scale: [1.1, { duration: 0.2, timingFunction: 'ease-in' }]
             }
         })
     }

     _unfocus() {
        this.patch({
            smooth: {
                alpha: [1, { duration: 0.2, timingFunction: 'ease-out'}],
                scale: [1, { duration: 0.2, timingFunction: 'ease-out'}]
            }
        })
     }

    set item(v){
        // @todo: patch the correct image and title
        
        // Because we don't know the correct URL we use that (that must be wrong)
        const url = 'https://image.tmdb.org/t/p/w220_and_h330_face';

        // Patch the image
        this._image.patch({
            src: url + v.poster_path
        });

        console.log(v.title)
        // Patch the title 
        this._title.patch({
            text: {
                text: v.title
            }
        });
    }
}