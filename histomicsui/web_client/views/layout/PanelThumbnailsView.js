import View from '../View';

import panelThumbnails from '../../templates/layout/panelThumbnails.pug';
import '../../stylesheets/layout/panelThumbnails.styl';

var PanelThumbnailsView = View.extend({
    events: {
        'click .h-show-overview-item': '_showHideComponent',
        'click .h-show-zoom-item': '_showHideComponent',
        'click .h-show-Metadata-item': '_showHideComponent',
        'click .h-show-annotation-item': '_showHideComponent'
    },

    initialize(params) {
        this.settings = params.settings;
        return View.prototype.initialize.apply(this, arguments);
    },

    render() {       
        this.$el.html(panelThumbnails({
            
        }));

        return this;
    },

    setViewer(viewer) {
        this.viewer = viewer;
        return this;
    },

    _showHideComponent(evt) {
        evt.preventDefault();      
        this._hidecomponents();
        const cls = $(evt.currentTarget).data('id');
        this.parentView.$(`.${cls}`).toggleClass('hidden');
    },

    _hidecomponents() {
        const compList = ['.h-overview-widget','.h-zoom-widget','.h-metadata-widget','.h-annotation-selector'];
        compList.forEach(function(cls){
        $(cls).addClass('hidden');                        
        })
        
    }
});

export default PanelThumbnailsView;
