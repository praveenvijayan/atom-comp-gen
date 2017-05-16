'use babel';

import CompgenView from './compgen-view';
import {
    CompositeDisposable
} from 'atom';
import shell from 'shelljs'
const homedir = (process.platform === 'win32') ? process.env.HOMEPATH : process.env.HOME

export default {

    compgenView: null,
    modalPanel: null,
    subscriptions: null,

    activate(state) {
        this.compgenView = new CompgenView(state.compgenViewState);
        this.modalPanel = atom.workspace.addModalPanel({
            item: this.compgenView.getElement(),
            visible: false
        });

        // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
        this.subscriptions = new CompositeDisposable();

        // Register command that toggles this view
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'compgen:toggle': () => this.toggle()
        }));

        this.compgenView.getElement().querySelector('input').addEventListener('keyup', (e)=> {
            // console.log(e.keyCode)
            if ((e.keyCode || e.which) == 13) {
                this.createModule()
            }

            if ((e.keyCode || e.which) == 27) {
                this.modalPanel.hide()
            }
        }, true);

    },

    deactivate() {
        this.modalPanel.destroy();
        this.subscriptions.dispose();
        this.compgenView.destroy();
    },

    serialize() {
        return {
            compgenViewState: this.compgenView.serialize()
        };
    },

    toggle() {
        console.log('Compgen was toggled!');
        this.compgenView.getElement().querySelector('input').focus()
        return (
            this.modalPanel.isVisible() ?
            this.modalPanel.hide() :
            this.modalPanel.show()
        );
    },

    createModule(){
      let name = this.modalPanel.item.querySelector('input').value
      shell.config.execPath = shell.which('node').stdout
      let currPath = document.querySelector('.tree-view .selected').getPath()
      let rootPath = ""
      console.log(currPath)
      atom.project.getPaths().filter(function(item){
        if(currPath.indexOf(item) >= 0){
          rootPath = item
        }
      })
      if(!rootPath){
        this.modalPanel.hide()
        return
      }
      shell.cd(rootPath)
      console.log(shell.exec('sr_ comp '+name+' -g'))
      this.modalPanel.hide()
    }

};