export default class Component {
    constructor(options) {
        this.options = options;
        this.model = options.model;
        this.markup = options.markup;
        this.id = options.id;
        return this.create(
            options.id,
            options.classes,
            this.render(this.model)
        );
    }
    
    create (id, classes, markup) {
        let el = document.createElement('div');
        // Set ID
        el.setAttribute('id', id);
        // Set Classes
        classes.forEach(className => {
            el.setAttribute('class', className);
        });
        // Set Markup
        el.innerHTML = markup;
        // Set Element
        this.self = el;
    }

    render (model) {
        return this.markup();
    }

    update (model) {
        if ( JSON.stringify(this.model) === JSON.stringify(model) ) {
          return console.warn('Warning: this.model matches updated model');
        } else {
            this.model = model;
            return document.getElementById(this.id).innerHTML = this.render(this.model);    
        }
    }

    mount (anchor) {
        this.anchor = anchor;
        return document.querySelector(anchor).appendChild(this.self);
    }

    unmount () {
        return document.getElementById(this.id).remove();
    }
}