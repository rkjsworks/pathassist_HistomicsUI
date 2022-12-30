import View from '../View';

import panelThumbnails from '../../templates/layout/panelThumbnails.pug';
import '../../stylesheets/layout/panelThumbnails.styl';

var PanelThumbnailsView = View.extend({
    events: {
        'click .h-show-overview-item': '_showHideComponent'
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
        this.parentView.$('.h-overview-widget').toggleClass('hidden');
        
        
    }
});

export default PanelThumbnailsView;
