import { Lightning, Utils, Router } from 'wpe-lightning-sdk';
import provider from "./lib/data-provider";
import routes from "./lib/routes";
import {init as initApi} from "./lib/Api"
import {Splash, Main} from "./pages";


export default class App extends Lightning.Component {

    static getFonts() {
        return [
            {family: 'SourceSansPro-Regular', url: Utils.asset('fonts/SourceSansPro-Regular.ttf'), descriptors: {}},
            {family: 'SourceSansPro-Black', url: Utils.asset('fonts/SourceSansPro-Black.ttf'), descriptors: {}},
            {family: 'SourceSansPro-Bold', url: Utils.asset('fonts/SourceSansPro-Bold.ttf'), descriptors: {}}
        ];
    }

    // when App instance is initialized we call the routes
    // this will setup all pages and attach them to there route
    _setup() {
        initApi(this.stage);
        Router.startRouter({
            appInstance: this, provider, routes
        });
    }

    static _template() {
        return {
            Pages: {
                forceZIndexContext: true, w: 1000
            },
            Splash:{
               type: Splash,
            },
            Main: {
                visible: false,
                type: Main,
                signals: {
                    hideSplash: '_hideSplash'
                }
            },
            Widgets: {
                Menu:{
                    // @todo; this is an extra assignment,
                    // add Menu
                }
            },
            Loading: {

            },
            Wrapper:{
                Label:{
                    text:{}
                }
            }
        };
    }

    _handleEnter(){
        // call
    }

    _getFocused(){
        return this.tag("Splash");
    }

    _handleLeft(){
        this.setIndex(this.index - 1);
    }

    _hideSplash(v) {
        console.log('THE METHOG MAN THE METHOD')
        if (!!v === true) {
            this._setState()
        }
    }

     static _states() {
        return [
            class Loading extends this {
                $enter() {
                    this.tag("Loading").visible = true;
                }

                $exit() {
                    this.tag("Loading").visible = false;
                }
            },
            class Widgets extends this {
                $enter(args, widget) {
                    // store widget reference
                    this._widget = widget;

                    // since it's possible that this behaviour
                    // is non-remote driven we force a recalculation
                    // of the focuspath
                    this._refocus();
                }

                _getFocused() {
                    // we delegate focus to selected widget
                    // so it can consume remotecontrol presses
                    return this._widget;
                }
            },
            class MainMenuIsHere extends this {
                $enter(event) {
                    console.log('FIRE ENTER HERE MAN STUYPID')
                    this.tag('Menu').visible = true;
                }
                $exit(event) {
                    this.tag('Menu').visible = false;
                }
                _getFocused() {
                    return this.tag('Main');
                }
            }
        ];
    }

    // tell page router where to store the pages
    get pages() {
        return this.tag("Pages");
    }

    get widgets(){
        return this.tag("Widgets")
    }

    _getFocused() {
        return Router.getActivePage();
    }

}