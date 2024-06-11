export class Form {
    element = document.createElement("form");
    header = document.createElement("header");
    heading = document.createElement("h2");
    submitButton = document.createElement("button");

    constructor(type, title, content) {
        this.element.type = type;
        this.content = content;
        this.heading.innerHTML = `<strong>${title}</strong>`;
        this.submitButton.textContent = "Submit";
        this.#setStyling();
        this.#setRending();

    }

    #setStyling(){
        this.heading.style.display = "flex";
        this.heading.style.justifyContent = "center";
        this.submitButton.type = "submit";
        this.element.style.display = "flex";
        this.element.style.flexDirection = "column";
        this.element.style.alignItems = "center";
        this.element.style.gap = "1rem";
        this.submitButton.setAttribute("class", "primary");
    }

    #setRending(){
        this.header.appendChild(this.heading);
        this.element.appendChild(this.header);
        this.element.appendChild(this.content);
        this.element.appendChild(this.submitButton);
    }
}

export class Modal{
    openButton = document.createElement("button");
    closeButton = document.createElement("input");
    dialog = document.createElement("dialog");
    #form;

    constructor(name, parentElement, contentElement) {
        this.name = name;
        this.parentElement = parentElement;
        this.content = contentElement;
        this.openButton.textContent = this.name;
        this.closeButton.value = "Close";
        this.closeButton.type = "button";
        this.closeButton.classList = "secondary";
        this.#addEventListeners();
        this.#setupForm();
    }

    addSubmitEvent(func){
        this.#form.submitButton.addEventListener("click", func);
    }

    #setupForm(){
        const article = document.createElement("article");
        this.#form = new Form("submit", this.name, this.content);
        article.appendChild(this.#form.element);
        article.appendChild(this.closeButton);
        this.#form.submitButton.addEventListener("click", (event) => {
            event.preventDefault();
            this.dialog.close();
        });
        this.dialog.appendChild(article);
    }

    #addEventListeners(){
        this.openButton.addEventListener("click", ()  => {
            this.dialog.showModal();
        });
        this.closeButton.addEventListener("click", ()  => {
            this.dialog.close();
        });
    }

    render(){
        this.parentElement.appendChild(this.openButton);
        this.parentElement.appendChild(this.dialog);
    }
}