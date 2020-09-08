import AbstractView from "./abstract.js";

export default class Loading extends AbstractView {
  getTemplate() {
    return `<p class="board__no-tasks">Loading...</p>`;
  }
}
