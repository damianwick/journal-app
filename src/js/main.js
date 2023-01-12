import date from './date.js';
import deleteEntry from './delete-entry.js';

const app = document.getElementById('app-container');
const body = document.querySelector('body');
const entryTextArea = document.getElementById('entry-textarea');
const submitButton = document.getElementById('submit-btn');
const entriesContainer = document.getElementById('entries-container');
const currentDate = date();

//Text formatting

const createFormattingButtons = () => {
    const textFormattingButtons = document.querySelectorAll('.text-btn');
    textFormattingButtons.forEach(button => {
        button.addEventListener('click', () => {
            let event = button.dataset['element'];
            document.execCommand(event, false, null);
            if(event === 'bold' || event === 'italic' || event === 'underline') {
                if(!button.classList.contains('active')) {
                    button.classList.add('active');
                } else {
                    button.classList.remove('active');
                }
            };
        });
    });
};

//END text text formatting 
createFormattingButtons();

let entriesNo = 1;

const makeEntry = () => {
    const singleEntryContainer = document.createElement('div');
    singleEntryContainer.classList.add('entry-container');
    entriesContainer.appendChild(singleEntryContainer);

    const innerEntryContainer = document.createElement('div');
    innerEntryContainer.classList.add('inner-entry-container');
    
    const entryText = entryTextArea.innerHTML;

    const entry = document.createElement('p');
    entry.innerHTML = entryText;
    innerEntryContainer.append(entry);

    const dateContainer = document.createElement('div');
    dateContainer.classList.add('date-container');
    dateContainer.append(currentDate);
    
    singleEntryContainer.append(dateContainer, innerEntryContainer);
    
    const entryName = 'entry' + entriesNo;
    innerEntryContainer.setAttribute('name', entryName);
    entriesNo++;
    
    createExpandBtn(innerEntryContainer, entry);
    createDelAndEditBtns(innerEntryContainer, entry, entryName);
};

const createDelAndEditBtns = (location, entryText, entryIdentifier) => {
    const buttonsContainer = document.createElement('div');
    const deleteBtn = document.createElement('button');
    const editBtn = document.createElement('button');

    buttonsContainer.append(editBtn, deleteBtn);
    location.append(buttonsContainer);

    deleteBtn.classList.add('delete-btn');
    editBtn.classList.add('edit-btn');
    buttonsContainer.classList.add('entry-options');

    deleteBtn.addEventListener('click', function() {
        deleteEntry(this);
    });
    editBtn.addEventListener('click', () => {
        editEntry(entryText, entryIdentifier);
    })
};

const expandWindow = (thisEntry) => {
    app.classList.add('opacity-20');

    const window = document.createElement('div');
    window.classList.add('entry-window');
    body.appendChild(window);

    const innerWindow = document.createElement('div');
    innerWindow.classList.add('inner-window');
    window.append(innerWindow);   

    const closeWindowBtn = document.createElement('button');
    closeWindowBtn.classList.add('closeBtn');
    closeWindowBtn.innerHTML='<i class="fa-solid fa-xmark"></i>'
    window.appendChild(closeWindowBtn);


    
    const textInWindow = document.createElement('div');
    textInWindow.classList.add('text-expanded-window');
    textInWindow.innerHTML = thisEntry.innerHTML;

    const dateInWindow = document.createElement('p');
    dateInWindow.classList.add('date-container')
    dateInWindow.innerText = date();

    innerWindow.append(dateInWindow, textInWindow);
   
    closeWindowBtn.addEventListener('click', function() {
        window.remove();
        app.classList.remove('opacity-20');
    });
};

const editEntry = (entryToEdit, entryIdentifier) => {
    app.classList.add('opacity-20');

    const window = document.createElement('div');
    window.classList.add('entry-window');
    body.appendChild(window);
    
    const closeWindowBtn = document.createElement('button');
    closeWindowBtn.innerHTML='<i class="fa-solid fa-xmark"></i>';
    closeWindowBtn.classList.add('closeBtn');
    
    closeWindowBtn.addEventListener('click', function() {
        window.remove();
        app.classList.remove('opacity-20');
    });

    const editContainer = document.createElement('div');
    editContainer.classList.add('inner-window');

    window.append(editContainer, closeWindowBtn);

    const editTextArea = document.createElement('div');
    editTextArea.classList.add('edit-textarea');
    editTextArea.contentEditable = 'true';
    editTextArea.innerHTML = entryToEdit.innerHTML;

    const divider = document.createElement('div');
    divider.classList.add('textarea-divider');

    const editFromatBtnsContainer = document.createElement('div');
    editFromatBtnsContainer.classList.add('edit-textarea-nav');
    editFromatBtnsContainer.innerHTML = 
    `<div class="text-style-buttons">
        <button class="text-btn" data-element="bold"><i class="fa-solid fa-bold"></i></button>
        <button class="text-btn" data-element="italic"><i class="fa-solid fa-italic"></i></button>
        <button class="text-btn" data-element="underline"><i class="fa-solid fa-underline"></i></button>
        <button class="text-btn align" data-element="justifyLeft"><i class="fa-solid fa-align-left"></i></button>
        <button class="text-btn align" data-element="justifyCenter"><i class="fa-solid fa-align-center"></i></button>
        <button class="text-btn align" data-element="justifyRight"><i class="fa-solid fa-align-right"></i></button>
        <button class="text-btn align" data-element="justifyFull"><i class="fa-solid fa-align-justify"></i></button>
    </div>
    <div class="button-container">
        <button id ="save-btn" class="submit-btn">Save</button>
        <div class="button-underline"></div>
    </div>`;

    editContainer.append(editTextArea, divider, editFromatBtnsContainer);

    const saveBtn = document.getElementById('save-btn');

    const saveEdit = () => {
        window.remove();
        app.classList.remove('opacity-20');      
    };

    saveBtn.addEventListener('click', () => {
        saveEdit();

        const editedText = editTextArea.innerHTML;
        entryToEdit.innerHTML = editedText;
    });

    createFormattingButtons();
};

const createExpandBtn = (location, thisEntry) => {
    const expandBtn = document.createElement('button');
    expandBtn.classList.add('expand-btn');
    location.append(expandBtn);
    
    expandBtn.addEventListener('click', function() {
        expandWindow(thisEntry);
    });
};

const submitEntry = () => {
    if(entryTextArea.innerHTML != "") {
        makeEntry();
        entryTextArea.innerHTML = '';
    }
};

submitButton.addEventListener('click', function() {
    submitEntry();
});





