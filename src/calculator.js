class Calculator {

    static getSection() {
        return `
            <input id="command" type="string" class="form-control x3w" placeholder="Type the operation here" />
            <div id="result" class="alert alert-primary x3w no-margin" role="alert"></div>    
        `;
    }

    static run() {
        const calculator = new Calculator();
        const command = document.getElementById("command");
        const result = document.getElementById("result");
        command.addEventListener("change", (event) => {
            result.innerText = event.target.value;
        });
    }

    constructor() {
        let command;
    }




}


export { Calculator };