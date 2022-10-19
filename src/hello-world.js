class Messages {

    static hello = "Hello World!";
    static hi = "Hi!";

    static getSection() {
        return `
            <label id="message" class="form-label">${this.hi}</label>
        `;
    }

    static run() {
        const message = document.getElementById("message");
        message.innerText = Messages.hello;
    }

}

export { Messages };