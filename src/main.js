import {createSiteMenuMarkup} from './view/site-menu.js';
import {createFiltersMarkup} from './view/filter.js';
import {createBoardMarkup} from './view/board.js';
import {createSortMarkup} from './view/sort.js';
import {createTaskMarkup} from './view/task.js';
import {createTaskEditMarkup} from './view/task-edit.js';
import {createLoadMoreButtonMarkup} from './view/load-more-button.js';

const TASKS_COUNT = 3;
const mainEl = document.querySelector(`.main`);

const render = (container, element, location = `beforeend`) => {
  container.insertAdjacentHTML(location, element);
};

render(mainEl.querySelector(`.main__control`), createSiteMenuMarkup());
render(mainEl, createFiltersMarkup());
render(mainEl, createBoardMarkup());

const boardEl = mainEl.querySelector(`.board`);
const tasksListEl = boardEl.querySelector(`.board__tasks`);

render(boardEl, createSortMarkup(), `afterbegin`);
render(tasksListEl, createTaskEditMarkup());

for (let i = 0; i < TASKS_COUNT; i++) {
  render(tasksListEl, createTaskMarkup());
}

render(boardEl, createLoadMoreButtonMarkup());
