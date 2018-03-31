import Component from './component';

export default class UniversalForm extends Component {
    

    _onSubmit (e) {
        e.preventDefault();
        let obj = Object.values(e.target.elements).reduce((obj,field) => { 

            if (field.name !== 'submit_button') {
                obj[field.name] = field.value;      
            }

            return obj;
        }, {});
        
        let json = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));

        this.data = json;

        this.update(this.model);
    }

    _renderStandardInput (field)  {
        let label = document.createElement('label');
        let input = document.createElement('input');

        // Create Label
        label.setAttribute('id', `${field.id}-label`);
        label.setAttribute('class', 'form-label');
        label.setAttribute('for', field.id);
        label.innerText = field.label;

        // Create Input
        input.setAttribute('id', field.id);
        input.setAttribute('name', field.name);
        input.setAttribute('type', field.type);
        input.setAttribute('value', field.initialValue);
        input.setAttribute('placeHolder', field.placeHolder);
        input.setAttribute('class', field.classList);
        input.setAttribute('class', 'form-input');

        // Append Input
        label.appendChild(input);

        return label.outerHTML;
    }

    _renderSelectInput (field) {
        let input = document.createElement('select');
        let label = document.createElement('label');

        // Create Label
        label.setAttribute('id', `${field.id}-label`);
        label.setAttribute('class', 'form-label');
        label.setAttribute('for', field.id);
        label.innerText = field.label;

        // Create Select
        input.setAttribute('id', field.id);
        input.setAttribute('name', field.name);
        input.setAttribute('class', ['form-select', field.classList].join(' '));

        field.options.forEach(o => {
            let option = document.createElement('option');
            
            // Set option label
            option.text = o.label;

            // Set option value
            input.setAttribute('value', o.value);
            
            input.add(option);
        })

        // Append Input
        label.appendChild(input);

        return label.outerHTML;
    }

    _renderSubmitButton (field)  {
        let input = document.createElement('input');
        let label = document.createElement('label');

        // Create Label
        label.setAttribute('id', `${field.id}-label`);
        label.setAttribute('class', 'form-label');
        label.setAttribute('for', field.id);
        
        // Create Input
        input.setAttribute('id', field.id);
        input.setAttribute('name', 'submit_button');
        input.setAttribute('type', field.type);
        input.setAttribute('value', field.initialValue);
        input.setAttribute('placeHolder', field.placeHolder);
        input.setAttribute('class', ['form-input', 'btn', 'btn-primary', 'input-group-btn', field.classList].join(' '));

        // Append Input
        label.appendChild(input);

        return label.outerHTML;
    }

    _renderInput (fields, anchor) {
        let formInputs = [];
        
        fields.map(f => {
            if (f.type !== 'select' && f.type !== 'submit') {
                formInputs.push(this._renderStandardInput(f));
            } if (f.type === 'submit') {
                formInputs.push(this._renderSubmitButton(f));
            } if (f.type === 'select') {
                formInputs.push(this._renderSelectInput(f));
            } else {
                return;
            }
        })
        
        return formInputs.join("");
    }

    whenMounted () {
        let anchor = document.getElementById('universal-form');

        // append Inputs to dom
        anchor.innerHTML = this._renderInput(this.model.fields);

        // Bind submit function to form
        this.self.onsubmit = this._onSubmit.bind(this);
    }

    whenUpdated () {
        let anchor = document.getElementById('universal-form');

        // append Inputs to dom
        anchor.innerHTML = this._renderInput(this.model.fields);
    }

    render (model) {
        return `
            <div id="form-wrap" style="width:500px;margin:0 auto;">
                <form id="universal-form" class="form-group"></form>
                ${this.self ? `<a href="data:${this.data}"  download="data.json">download JSON</a>` : ``}
            </div>
        `;
    }
}