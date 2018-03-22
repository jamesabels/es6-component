import Util from './util';

export default class Component {
    constructor(options) {
        this.options = options;
        this.model = options.model;
        this.markup = options.markup;
        this.id = options.id;
        this.create(
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

        // Set the element
        this.self = el;
    }

    render (model) {
        return this.markup();
    }

    call (callback) {
        return callback(this.model);
    }

    beforeUpdate (model) {
        return this.options.beforeUpdate(model);
    }

    update (model) {
        if (Util.deepObjectCompare(model, this.model)) {
            console.warn('The model provided and this.model are the same!');
        } else {
            this.model = model;
            this.beforeUpdate(this.model);
            document.getElementById(this.id).innerHTML = this.render(this.model);    
            return this.whenUpdated(this.model);    
        }
    }

    whenUpdated (model) {
        return this.options.whenUpdated(model);
    }

    beforeMount (model) {
        return this.options.beforeMount(model);
    }

    mount (context, anchor) {
        this.beforeMount(this.model);
        this.anchor = anchor;
        context.querySelector(anchor).appendChild(this.self);
        return this.whenMounted(this.model);
    }

    whenMounted (model) {
        return this.options.whenMounted(model);
    }

    beforeUnmount (model) {
        return this.options.beforeUnmount(model);
    }

    unmount () {
        this.beforeUnmount(this.model);
        document.getElementById(this.id).remove();
        return this.whenUnmounted(this.model);
    }

    whenUnmounted (model) {
        return this.options.whenUnmounted(model);
    }
}