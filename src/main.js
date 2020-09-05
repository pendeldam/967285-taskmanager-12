import TasksModel from './model/tasks.js';
import FilterModel from './model/filter.js';
import StatisticsView from './view/statistics.js';
import SiteMenuView from './view/site-menu.js';
import FilterPresenter from './presenter/filter.js';
import BoardPresenter from './presenter/board.js';
import {generateTask} from './mock/task.js';
import {render, RenderPosition, remove} from './utils/render.js';
import {MenuItem, UpdateType, FilterType} from './const.js';

const mainEl = document.querySelector(`.main`);
const TASK_COUNT = 20;
const tasks = new Array(TASK_COUNT).fill().map(generateTask);

const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const filterModel = new FilterModel();
const siteMenuComponent = new SiteMenuView();

render(mainEl.querySelector(`.main__control`), siteMenuComponent, RenderPosition.BEFOREEND);

const boardPresenter = new BoardPresenter(mainEl, tasksModel, filterModel);
const filterPresenter = new FilterPresenter(mainEl, filterModel, tasksModel);

const handleTaskNewFormClose = () => {
  siteMenuComponent.getElement().querySelector(`[value=${MenuItem.TASKS}]`).disabled = false;
  siteMenuComponent.setMenuItem(MenuItem.TASKS);
};

let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_NEW_TASK:
      remove(statisticsComponent);
      boardPresenter.destroy();
      filterModel.setFilter(UpdateType.MAJOR, FilterType.ALL);
      boardPresenter.init();
      boardPresenter.createTask(handleTaskNewFormClose);
      siteMenuComponent.getElement().querySelector(`[value=${MenuItem.TASKS}]`).disabled = true;
      break;
    case MenuItem.TASKS:
      boardPresenter.init();
      remove(statisticsComponent);
      break;
    case MenuItem.STATISTICS:
      boardPresenter.destroy();
      statisticsComponent = new StatisticsView(tasksModel.getTasks());
      render(mainEl, statisticsComponent, RenderPosition.BEFOREEND);
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

filterPresenter.init();
boardPresenter.init();
