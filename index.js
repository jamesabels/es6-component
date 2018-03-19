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

let newComp = new Component({
    id: 'new-comp-wrap',
    classes: ['new-comp-wrap', 'new-comp'],
    model,
    markup
});

newComp.mount('#app');

let update = setInterval(function () {
    model.job = 1;
    newComp.update(model);
}, 1);

setTimeout(function () {
    clearInterval(update);
    newComp.unmount();
}, 5000)