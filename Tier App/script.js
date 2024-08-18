let curDraggedItem;

const tierInput = document.getElementById('tier');
const submitBtn = document.getElementById('submit');
const imageForm = document.getElementById('image-form');
// const tierLists = document.querySelector('.tier-list');
const imageContainers = document.getElementsByClassName('item-container');

for(const imageContainer of imageContainers) {
    setUpItemContainerToDrag(imageContainer);
}

imageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const imageItemInput = document.getElementById('item');
    const imageUrl = imageItemInput.value;
    if(imageUrl === '') {
        alert("Please enter an image url");
        return;
    }
    createTierListItem(imageUrl);
    imageItemInput.value = '';
});

submitBtn.addEventListener("click", (event) => {
    event.preventDefault(); // Stops the default behaviour of the click event
    if(tierInput.value === '') {
        alert('Please enter the Tier name');
        return;
    }
    createTierList(tierInput.value);
    tierInput.value = '';
});

function createTierList (tierInput) {
    const newTierList = document.createElement("div");
    newTierList.classList.add("tier-list");

    const heading = document.createElement('div');
    heading.classList.add("heading");
    heading.textContent = tierInput;

    // Set backgroud-color
    const bgColor = randomColor();
    heading.style.backgroundColor = bgColor;

    const listContainer = document.createElement('div');
    listContainer.classList.add('list-container');

    const newTierListItem = document.createElement('div');
    newTierListItem.classList.add('tier-list-item');

    const btnContainer = document.createElement('div');
    btnContainer.classList.add('btn-container');

    // Remove 
    const removeBtn = document.createElement('i');
    removeBtn.classList.add("fa-solid", "fa-trash");
    removeBtn.addEventListener("click", () => {
        removeTierList(newTierList);
    });

    // edit
    const edit = document.createElement('i');
    edit.classList.add("fa-solid", "fa-gear");
    edit.addEventListener('click', () => {
        editTierName(heading);
    });

    newTierList.appendChild(heading);
    newTierList.appendChild(listContainer);
    listContainer.appendChild(newTierListItem);
    listContainer.appendChild(btnContainer);
    btnContainer.appendChild(edit);
    btnContainer.appendChild(removeBtn);

    setUpDropZoneInTierList(newTierListItem);
    
    const tierSection = document.getElementById("tier-list-section");
    tierSection.appendChild(newTierList);
}

function createTierListItem (imageUrl) {
    const imageDiv = document.createElement('div');
    imageDiv.setAttribute("draggable", "true");
    imageDiv.classList.add('item-container');

    setUpItemContainerToDrag(imageDiv);

    const image = document.createElement('img');
    image.src = imageUrl;

    imageDiv.appendChild(image);

    const nonTierSection = document.getElementById('non-tier-section');
    nonTierSection.appendChild(imageDiv);
}

function setUpItemContainerToDrag (imageContainer) {
    imageContainer.addEventListener('dragstart', (event) => {
        console.log(event.target.parentNode);
        curDraggedItem = event.target.parentNode;
    });

    // To remove image from tier-list
    imageContainer.addEventListener('dblclick', (event) => {
        const parentNode = event.target.parentNode;
        const nonTierSection = document.getElementById("non-tier-section");
        nonTierSection.appendChild(parentNode);
    });
}

function setUpDropZoneInTierList(tierList) {
    tierList.addEventListener('drop', (event) => {
        event.preventDefault();
    });

    tierList.addEventListener('dragover', function (event) {
        if(this !== curDraggedItem.parentNode) {
            this.appendChild(curDraggedItem);
        }
    });
}

function randomColor () {
    let str = '#';
    for(let i = 0; i < 6; i++) {
        let n = Math.floor(Math.random() * 16);
        let hex = n.toString(16);
        str += hex;
    }
    return str;
}

function removeTierList(newTierList) {
    const nonTierSection = document.getElementById('non-tier-section');
    const items = newTierList.querySelectorAll('.item-container');
    items.forEach(item => {
        nonTierSection.appendChild(item);
    });
    newTierList.remove();
}

function editTierName (heading) {
    console.log("edited");
    const input = document.createElement('input');
    input.classList.add('edit-input');
    input.type = 'text';
    input.value = heading.textContent;
    heading.replaceWith(input);
    input.focus();

    const saveInput = () => {
        heading.textContent = input.value;
        input.replaceWith(heading);
    }

    input.addEventListener('keypress', (event) => {
        if(input.value == '' && event.key == 'Enter') {
            alert('Please enter a valid name to the tier');
            return;
        }
        if(event.key == 'Enter') {
            saveInput();
        }
    });
}