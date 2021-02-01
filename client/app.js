const postAPI = '/addAnimal';

class Animal{
    name; 
    description;

    constructor(name, description){
        this.name = name;
        this.description = description;
    }
}

const getAnimals = async (url='') => {
    // 1
    const res = await fetch(url);
    try{
        const animals = await res.json();
        return animals;
    } catch(error) {
        console.log('error', error);
    }
};

const postAnimal = async (url='', animal={}) => {
    // 1
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(animal),
    });
    try{
        const animals = await res.json();
        return animals;
    } catch(error) {
        console.log('error', error);
    }
}

function initialSetup(){
    getAnimals('/getAnimals').then((animals3 => {
        updateTable(animals3);
    }))
};

initialSetup();

function updateTable(animals){
    // Clearing the table
    const tbody = document.querySelector('.animalsList');
    tbody.innerHTML = '';

    // Filling the table
    for(let i = 0; i < animals.length; i++){
        let animal = animals[i];
        let row = document.createElement('tr');
        let animalName = document.createElement('td');
        animalName.innerHTML = animal.name;
        let animalDescription = document.createElement('td');
        animalDescription.innerHTML = animal.description;
        row.appendChild(animalName);
        row.appendChild(animalDescription);
        tbody.appendChild(row);
    }
}

document.querySelector('#submit').addEventListener('click', addAnimal);

function addAnimal(e){
    let name = document.getElementById('animalName').value;
    let description = document.getElementById('animalDescription').value;
    animal = new Animal(name, description);
    let animals = postAnimal(postAPI, animal);
}