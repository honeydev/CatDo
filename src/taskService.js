'use strict';

import db from './db';
import moment from 'moment';

class TaskService {

    constructor() {
        this._db = db.db;
    }
    /**
     * @param  {Number} limit [description]
     * @return {[array]}
     */
    getTasks(cursor = 0) {
        let tasks = this._db.queryAll("tasks");
        tasks = tasks.sort((a, b) => {
            return Number(a.created_time) < Number(b.created_time);
        });
        tasks = this._setTasksVisible(tasks, cursor, cursor + 3);
        return tasks;
    }

    _setTasksVisible(tasks, start, end) {
        let counter = start;
        return tasks.map((task) => {
            (counter >= start && counter <= end) ? task.visible = true : task.visible = false;
            counter++;
            return task;
        });
    }
    /**
     * @param {[string]} taskText
     * @return {void} 
     */
    addTask(taskText) {
        this._db.insert("tasks", {text: taskText, created_time: Number(moment().unix()), completed: false});
        this._db.commit();
    }

    dropTask(taskId) {
        this._db.deleteRows("tasks", {ID: taskId})
        this._db.commit();
    }

    switchCompleted(taskId) {
        const currentValue = this._db.queryAll("tasks", { query: (task) => task.ID === taskId })[0].completed;
        this._db.update("tasks", {ID: taskId}, (task) => {
            task.completed = !currentValue;
            return task;
        });
    }
}

export default TaskService;