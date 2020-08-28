import TasksModel from './model/tasks.js';
import SiteMenuView from './view/site-menu.js';
import FilterView from './view/filter.js';
import BoardPresenter from './presenter/board.js';
import {generateTask} from "./mock/task.js";
import {generateFilter} from "./mock/filter.js";
import {render, RenderPosition} from './utils/render.js';

const TASK_COUNT = 20;
const mainEl = document.querySelector(`.main`);
const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const boardPresenter = new BoardPresenter(mainEl, tasksModel);

render(mainEl.querySelector(`.main__control`), new SiteMenuView(), RenderPosition.BEFOREEND);
render(mainEl, new FilterView(filters), RenderPosition.BEFOREEND);
boardPresenter.init();
