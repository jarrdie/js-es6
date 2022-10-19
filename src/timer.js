import {LitElement, html, css} from 'lit';
import {play, pause, replay} from '/tsc/icons.js';

export class Timer extends LitElement {

  static properties = {
    duration: {},
    remaining: {state: true},
    end: {state: true},
  };

  static styles = css`
    :host {
      display: inline-block;
      min-width: 4em;
      text-align: center;
      padding: 0.2em;
      margin: 0.2em 0.1em;
    }

    footer {
      user-select: none;
      font-size: 0.6em;
    }
  `;

  constructor() {
    super();
    this.duration = 60;
    this.remaining = 0;
    this.end = null;
    this.msxSecond = 1000;
    this.sxMinute = 60;
    this.msxMinute = this.sxMinute * this.msxSecond;
  }

  render() {
    const {remaining, running} = this;
    const {msxSecond, sxMinute,msxMinute} = this;
    const minutes = Math.floor(remaining / msxMinute);
    const seconds = this.pad(minutes, Math.floor((remaining / msxSecond) % sxMinute));
    const hundreds = this.pad(true, Math.floor((remaining % msxSecond) / 10));
    return html`
      <span>${minutes ? `${minutes}:${seconds}` : `${seconds}.${hundreds}`}</span>
      <footer>
        ${
          remaining === 0
            ? ''
            : running
            ? html`<span @click=${this.pause}>${pause}</span>`
            : html`<span @click=${this.start}>${play}</span>`
        }
        <span @click=${this.reset}>${replay}</span>
      </footer>
    `;
  }

  pad(pad, val) {
    return pad ? String(val).padStart(2, '0') : val;
  }

  start() {
    this.end = Date.now() + this.remaining;
    this.tick();
  }

  pause() {
    this.end = null;
  }

  reset() {
    const running = this.running;
    this.remaining = this.duration * 1000;
    this.end = running ? Date.now() + this.remaining : null;
  }

  tick() {
    if (this.running) {
      this.remaining = Math.max(0, this.end - Date.now());
      requestAnimationFrame(() => this.tick());
    }
  }

  get running() {
    return this.end && this.remaining;
  }

  connectedCallback() {
    super.connectedCallback();
    this.reset();
  }
}

customElements.define('lit-timer', Timer);
