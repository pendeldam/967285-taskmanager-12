import TasksModel from './model/tasks.js';
import FilterModel from './model/filter.js';
import SiteMenuView from './view/site-menu.js';
import FilterPresenter from './presenter/filter.js';
import BoardPresenter from './presenter/board.js';
import {generateTask} from './mock/task.js';
import {render, RenderPosition} from './utils/render.js';

const mainEl = document.querySelector(`.main`);
const TASK_COUNT = 20;
const tasks = new Array(TASK_COUNT).fill().map(generateTask);

const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const filterModel = new FilterModel();

render(mainEl.querySelector(`.main__control`), new SiteMenuView(), RenderPosition.BEFOREEND);

const boardPresenter = new BoardPresenter(mainEl, tasksModel, filterModel);
const filterPresenter = new FilterPresenter(mainEl, filterModel, tasksModel);

filterPresenter.init();
boardPresenter.init();
