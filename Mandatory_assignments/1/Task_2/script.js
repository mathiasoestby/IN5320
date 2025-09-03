const createCurrencyItem = (currency) => {
    const li = document.createElement('li');
    li.textContent = currency;

    const removeBtn = document.createElement('span');
    removeBtn.className = 'remove-currency';
    removeBtn.textContent = 'x';
    removeBtn.addEventListener('click', removeCurrency);
    li.appendChild(removeBtn);
    return li;
}

const addNewCurrency = (event) => {
    const listElement = document.querySelector("#currency-list");
    const input = document.querySelector("#input-currency");
    const newCurrency = input.value;

    if (newCurrency) {
        listElement.appendChild(createCurrencyItem(newCurrency));
        input.value = "";
    }
};

const removeCurrency = (event) => {
    const listElement = document.querySelector("#currency-list");
    const currencyItem = event.target.parentElement;
    listElement.removeChild(currencyItem);
}

const searchElementForWord = (element, searchWord) => {
    if (typeof element !== "string" || typeof searchWord !== "string"){
        throw new TypeError("Both arguments must be strings");
    }
    return element.startsWith(searchWord);
}

const searchArrayForWord = (array, searchWord) => {
    if (!Array.isArray(array)){
        throw new TypeError("First argument must be an array");
    }
    if (typeof searchWord !== "string"){
        throw new TypeError("Second argument must be a string");
    }
    const elementsContainingWord = array.filter((element) => searchElementForWord(element, searchWord));
    return elementsContainingWord;
}

document.querySelector("#add-currency").addEventListener("click", addNewCurrency);
document.querySelector("#form-currency").addEventListener("submit", (event) => {
    addNewCurrency(event);
    event.preventDefault(); 
});

document.querySelectorAll(".remove-currency").forEach((element) =>{
    element.addEventListener("click", removeCurrency);
});