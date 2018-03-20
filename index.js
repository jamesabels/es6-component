import Component from './src/component';

let model = {
    name: 'Dave',
    job: 'Gorilla',
    location: 'The Zoo',
    bio: 'Dave loves his job at the zoo!'
}

let markup = function () {
    return  `
    <div class="person">
        <h1>${model.name}</h1>
        <h3>${model.job}</h3>
        <p class="location">${model.location}</p>
        <p class="bio">${model.bio}</p>
    </div>`
}

let methods = {
    helloWorld: () => console.log('Hello World')
}

let newComp = new Component({
    id: 'new-comp-wrap',
    classes: ['new-comp-wrap', 'new-comp'],
    beforeMount: () => console.log('Before Mount!'),
    whenMounted: () => console.log('Mounted!'),
    beforeUnmount: () => console.log('Before Unmount!'),
    whenUnmounted: () => console.log('Unmounted!'),
    beforeUpdate: () => console.log('Before Update!'),
    whenUpdated: () => console.log('After Update!'),
    methods,
    model,
    markup
});

newComp.mount('#app');

let update = setInterval(function () {
    model.job = Math.random(100);
    newComp.update(model);
}, 1);

setTimeout(function () {
    clearInterval(update);
    newComp.call('helloWorld');
    newComp.unmount();
}, 200)