
function addExampleText() {
    let exampleJson = '  {\n    "Name": "string",\n    "Lecture": [ "string" ],\n    "Classes": [ "string" ],\n    "Laboratories": [ "string" ],\n    "Project": [ "string" ]\n  }';
    document.querySelector('#example-text').innerHTML = `[\n${exampleJson},\n${exampleJson}\n]`;
    document.querySelector('#generate-button').addEventListener('click', handleClick);
}
addExampleText();

function handleClick() {

    let input = document.querySelector('#generate-input');
    const reader = new FileReader();

    reader.readAsText(input.files[0]);

    input.value = '';
    
    reader.onload= e => {
        var data = JSON.parse(e.target.result);
        mapData(data);
    };
}

function mapData(data) {
    let content = document.querySelector('#content');
    let backgrounDiv = document.createElement('div');
    let randomNumber = Math.floor(Math.random() * 100);
    let divId = 'background-div-' + randomNumber;
    backgrounDiv.id = divId;
    let backButton = getBackButton(divId);
    backgrounDiv.appendChild(backButton);
    let removeButton = getRemoveButton('to-remove');
    backgrounDiv.appendChild(removeButton);
    data.forEach((element, index) => {
        let div = document.createElement('div');
        mapDiv(div, element, index);
        backgrounDiv.appendChild(createCard(`header-${index}`, element.Name, `body-${index}`, div, true));
    });
    content.appendChild(backgrounDiv);
}

function getBackButton(id) {
    let backButton = document.createElement('button');
    backButton.id = 'back-button';
    backButton.innerText = 'Remove';
    backButton.className = 'btn btn-primary w-10';
    backButton.addEventListener('click', () => document.querySelector(`#${id}`).remove());
    return backButton;
}

function getRemoveButton(id) {
    let removeButton = document.createElement('button');
    removeButton.id = 'remove-button';
    removeButton.innerText = 'Remove controls';
    removeButton.className = 'btn btn-primary w-10 ml-2';
    removeButton.addEventListener('click', () => {
        document.querySelector(`#${id}`).remove();
        document.querySelector(`#back-button`).remove();
        document.querySelector(`#remove-button`).remove();
    });
    return removeButton;
}

function mapDiv(div, element, index) {
    if (element.Lecture !== null){
        div.appendChild(createCard(`lecture-header-${index}`, "Wykład", `lecture-body-${index}`, element.Lecture.join("<br />"), false));
    }
    if (element.Classes !== null){
        div.appendChild(createCard(`classes-header-${index}`, "Ćwiczenia", `classes-body-${index}`, element.Classes.join("<br />"), false));
    }
    if (element.Laboratories !== null){
        div.appendChild(createCard(`laboratories-header-${index}`, "Laboratoria", `laboratories-body-${index}`, element.Laboratories.join("<br />"), false));
    }
    if (element.Project !== null){
        div.appendChild(createCard(`project-header-${index}`, "Projekt", `project-body-${index}`, element.Project.join("<br />"), false));
    }
}

function createCard(headerId, headerContent, bodyId, bodyContent, isContentBodyDiv){
    var div = document.createElement('div');
    div.id = `${headerId}-${bodyId}`;
    div.className = 'card card-container';
    div.appendChild(getCardHeader(headerId, bodyId, headerContent));
    div.appendChild(isContentBodyDiv ? getCardBodyWithDiv(bodyId, bodyContent) : getCardBodyWithText(bodyId, bodyContent));
    return div;
}

function getCardHeader(headerId, bodyId, content) {
    var div = document.createElement('div');
    div.id = headerId;
    div.className = 'card-header';
    div.innerHTML = `<h2 type="button" data-toggle="collapse" data-target="#${bodyId}">${content}</h3>`;
    return div;
}

function getCardBodyWithText(bodyId, content) {
    var div = document.createElement('div');
    div.id = bodyId;
    div.className = 'collapse';
    div.innerHTML = `<div class="card-body">${content}</div>`;
    return div;
}

function getCardBodyWithDiv(bodyId, content) {
    var parentDiv = document.createElement('div');
    parentDiv.id = bodyId;
    parentDiv.className = 'collapse';
    var childDiv = document.createElement('div');
    childDiv.className = 'card-body';
    childDiv.appendChild(content);
    parentDiv.appendChild(childDiv);
    return parentDiv;
}