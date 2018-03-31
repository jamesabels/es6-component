import UniversalForm from './src/UniversalForm';

let model = {
    fields : [
        {
            type: 'text',
            id: 'valueOne',
            name: 'value_one',
            label: 'Click To Edit',
            initialValue: 'Value One',
            placeHolder: 'Value One',
            classList: ['form-li', 'meme']
        },
        {
            type: 'email',
            id: 'valueOne',
            name: 'value_two',
            label: 'Click To Edit',
            initialValue: 'value@test.com',
            placeHolder: 'Value Two',
            classList: ['form-li', 'meme']
        },
        {
            type: 'number',
            id: 'numberOne',
            name: 'number_one',
            label: 'Click To Edit',
            initialValue: 1,
            placeHolder: 2,
            classList: ['form-li', 'meme']
        },
        {
            type: 'file',
            id: 'fileOne',
            name: 'file_one',
            label: 'Click To Edit',
            initialValue: '',
            placeHolder: '',
            classList: ['form-li', 'meme']
        },
        {
            type: 'select',
            id: 'valueOne',
            name: 'value_three',
            label: 'Click To Edit',
            initialValue: 'One',
            placeHolder: 'Value Three',
            classList: ['form-li', 'meme'],
            options: [
                { label: 'one', value: 1 },
                { label: 'two', value: 2 },
                { label: 'three', value: 3 },
            ]
        },
        {
            type: 'submit',
            id: 'submitButton',
            name: 'submit_button',
            initialValue: 'Submit',
            classList: ['form-li', 'meme']
        },
    ]
}

let newComp = new UniversalForm({
    id: 'new-comp-wrap',
    classes: ['new-comp-wrap', 'new-comp'],
    beforeMount: () => console.log('Before Mount!'),
    whenMounted: () => console.log('Mounted!'),
    beforeUnmount: () => console.log('Before Unmount!'),
    whenUnmounted: () => console.log('Unmounted!'),
    beforeUpdate: () => console.log('Before Update!'),
    whenUpdated: () => console.log('After Update!'),
    model
});

newComp.mount(document, '#app');