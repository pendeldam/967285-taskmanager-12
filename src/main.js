import {createSiteMenuMarkup} from './view/site-menu.js';
import {createFiltersMarkup} from './view/filter.js';
import {createBoardMarkup} from './view/board.js';
import {createSortMarkup} from './view/sort.js';
import {createTaskMarkup} from './view/task.js';
import {createTaskEditMarkup} from './view/task-edit.js';
import {createLoadMoreButtonMarkup} from './view/load-more-button.js';
import {generateTask} from "./mock/task.js";
import {generateFilter} from "./mock/filter.js";

const TASK_COUNT = 22;
const TASK_COUNT_PER_STEP = 8;
const mainEl = document.querySelector(`.main`);
const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const render = (container, element, location = `beforeend`) => {
  container.insertAdjacentHTML(location, element);
};

render(mainEl.querySelector(`.main__control`), createSiteMenuMarkup());
render(mainEl, createFiltersMarkup(filters));
render(mainEl, createBoardMarkup());

const boardEl = mainEl.querySelector(`.board`);
const tasksListEl = boardEl.querySelector(`.board__tasks`);

render(boardEl, createSortMarkup(), `afterbegin`);
render(tasksListEl, createTaskEditMarkup(tasks[0]));

for (let i = 1; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i++) {
  render(tasksListEl, createTaskMarkup(tasks[i]));
}

if (tasks.length > TASK_COUNT_PER_STEP) {
  let renderedTaskCount = TASK_COUNT_PER_STEP;

  render(boardEl, createLoadMoreButtonMarkup());
  const loadMoreButton = boardEl.querySelector(`.load-more`);

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    tasks
    .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
    .forEach((task) => render(tasksListEl, createTaskMarkup(task)));

    renderedTaskCount += TASK_COUNT_PER_STEP;

    if (renderedTaskCount >= tasks.length) {
      loadMoreButton.remove();
    }
  });
}
