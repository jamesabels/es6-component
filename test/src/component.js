var assert = require('assert');
import chai from 'chai';
import 'chai/register-should';
import 'chai/register-expect';

import Component from '../../src/component';

const model = {
    name: 'Dave',
    job: 'Gorilla',
    location: 'The Zoo',
    bio: 'Dave loves his job at the zoo!'
}

const markup = function () {
    return  `
    <div class="person">
        <h1 class="name">${model.name}</h1>
        <h3 class="job">${model.job}</h3>
        <p class="location">${model.location}</p>
        <p class="bio">${model.bio}</p>
    </div>`
}

const options = {
    id: 'new-comp-wrap',
    classes: ['new-comp-wrap', 'new-comp'],
    beforeMount: () => console.log('Before Mount!'),
    whenMounted: () => console.log('Mounted!'),
    beforeUnmount: () => console.log('Before Unmount!'),
    whenUnmounted: () => console.log('Unmounted!'),
    beforeUpdate: () => console.log('Before Update!'),
    whenUpdated: () => console.log('After Update!'),
    model,
    markup
}

const testComponent = new Component({
    id: 'new-comp-wrap',
    classes: ['new-comp-wrap', 'new-comp'],
    beforeMount: () => console.log('Before Mount!'),
    whenMounted: () => console.log('Mounted!'),
    beforeUnmount: () => console.log('Before Unmount!'),
    whenUnmounted: () => console.log('Unmounted!'),
    beforeUpdate: () => console.log('Before Update!'),
    whenUpdated: () => console.log('After Update!'),
    model,
    markup
});

// testComponent.mount(document, '#app');

describe('Component', function() {
    
    describe('create()', function () {
        it('Should create the component markup', function () {
            expect(testComponent.self, markup);
        });
    });

    describe('call()', function() {
        it('Should execute the callback given to the function', function() {
            expect(testComponent.call(() => console.log('Hello World')))
            .to.equal(console.log('Hello World'));
        });
    });

    describe('beforeMount()', function() {
        it('Should execute the before mount life-cycle method', function() {
            expect(testComponent.beforeMount(model)).to.equal(options.beforeMount(model));
        });
    });
    
    describe('render()', function() {
        it('Should return a string', function() {
            expect(testComponent.render(model)).to.be.a('string');
        });
        it('Should return the correct mark-up string', function() {
            expect(testComponent.render(model)).to.equal(markup(model));
        });
    });
    
    describe('mount()', function() {
        testComponent.mount(document, '#app');
        it('Should add component markup to the dom', function() {
            expect(document.getElementById(`${testComponent.id}`).innerHTML, markup);
        });
    });

    describe('whenMounted()', function() {
        it('Should execute the when mounted life-cycle method', function() {
            expect(testComponent.whenMounted(model)).to.equal(options.whenMounted(model));
        });
    });

    describe('beforeUpdate()', function() {
        it('Should execute the before update life-cycle method', function() {
            expect(testComponent.beforeUpdate(model)).to.equal(options.beforeUpdate(model));
        });
    });
    
    describe('whenUpdated()', function() {
        it('Should execute the when updated life-cycle method', function() {
            expect(testComponent.whenUpdated(model)).to.equal(options.whenUpdated(model));
        });
    });

    describe('beforeUnmount()', function() {
        it('Should execute the before unmount life-cycle method', function() {
            expect(testComponent.beforeUnmount(model)).to.equal(options.beforeUnmount(model));
        });
    });

    describe('unmount()', function() {
        testComponent.unmount();
        it('Should remove component from the dom', function() {
            let component = document.querySelector(`#${options.id}`);
            expect(component, null);
        });
        testComponent.mount(document, '#app');
    });

    describe('whenUnmounted()', function() {
        it('Should execute the when unmounted life-cycle method', function() {
            expect(testComponent.whenUnmounted(model)).to.equal(options.whenUnmounted(model));
        });
    });
    
});
