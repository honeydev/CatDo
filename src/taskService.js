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
        tasks.sort((a, b) => {
            return (a.created_time < b.created_time) ? 1 : -1;
        });
        const startPosition = cursor * 8;
        tasks = this._setTasksVisible(tasks, startPosition, startPosition + 8);
        return tasks;
    }

    _setTasksVisible(tasks, start, end) {
        
        for (let i = 0; i < tasks.length; i++) {
            (i >= start && i < end) ? tasks[i].visible = true : tasks[i].visible = false;
        }
        return tasks;
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
        const task = this._db.queryAll("tasks", { query: (task) => task.ID === taskId })[0];
        if (task === undefined) {
            return null;
        }
        const currentValue = task.completed;
        this._db.update("tasks", {ID: taskId}, (task) => {
            task.completed = !currentValue;
            return task;
        });
        this._db.commit();
    }
}

export default TaskService;