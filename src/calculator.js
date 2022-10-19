import { isEmpty, times } from "lodash-es"

class Calculator {

    static getSection() {
        return `
            <input id="command" type="string" class="form-control x3w" placeholder="Type the operation here" />
            <div id="result" class="alert alert-primary x3w no-margin" role="alert"></div>    
        `;
    }

    static run() {
        const command = document.getElementById("command");
        const result = document.getElementById("result");
        command.addEventListener("change", (event) => {
            const command = event.target.value;
            const calculator = new Calculator(command);
            calculator.parseCommand();
            calculator.processResult();
            result.innerText = calculator.getResult();
        });
    }

    constructor(command) {
        this.supportedCommands = ["+", "-", "*", "/"];
        this.status = {
            notFound: {
                key: "not-found",
                value: "No operation found"
            },
            multipleCommands: {
                key: "multiple-operators",
                value: "Multiple operators found"
            },
            ok: {
                key: "ok",
                value: "",
            }
        };
        this.operation = {
            command: command,
            operator: "",
            operands: [],
            result: this.status.ok,
        };
    }

    parseCommand() {
        if (isEmpty(this.operation.command)) {
            this.operation.result = this.status.notFound;
            return;
        }
        this.operation.command = this.operation.command.replaceAll(" ", "");
        const commands = this.supportedCommands.filter((supportedCommand) => {
            return this.operation.command.indexOf(supportedCommand) !== -1;
        });
        if (isEmpty(commands)) {
            this.operation.result = this.status.notFound;
            return;
        }
        if (commands.length > 1) {
            this.operation.result = this.status.multipleCommands;
            return;
        }
        this.operation.operator = commands[0];
        this.operation.operands = this.operation.command.split(this.operation.operator);
    }

    processResult() {
        if (this.operation.operator === "+") {
            this.add();
        }
        if (this.operation.operator === "-") {
            this.subtract();
        }
        if (this.operation.operator === "*") {
            this.multiply();
        }
        if (this.operation.operator === "/") {
            this.divide();
        }
    }

    add() {
        this.operation.result.value = 0;
        this.operation.operands.forEach((operand) => {
            this.operation.result.value += parseFloat(operand);
        });
    }

    subtract() {
        this.operation.result.value = 0;
        this.operation.operands.forEach((operand) => {
            if (this.operation.result.value === 0) {
                this.operation.result.value = operand;
                return;
            }
            this.operation.result -= parseFloat(operand);
        });
    }

    multiply() {
        this.operation.result.value = 1;
        this.operation.operands.forEach((operand) => {
            this.operation.result.value *= parseFloat(operand);
        });
    }

    divide() {
        this.operation.result.value = 0;
        this.operation.operands.forEach((operand) => {
            if (this.operation.result.value === 0) {
                this.operation.result.value = operand;
                return;
            }
            this.operation.result.value /= parseFloat(operand);
        });
    }

    getResult() {
        return this.operation.result.value;
    }

    isOk() {
        return this.operation.result.key === "ok";
    }
}


export { Calculator };