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
    getTasks(limit = 2) {
        const tasks = this._db.queryAll("tasks");
        const sortedTasks = tasks.sort((a, b) => {
            return Number(a.created_time) < Number(b.created_time);
        });
        // console.log(sortedTasks);
        // console.log(sortedTasks.map((value) => {
        //     console.log(value.created_time)
        // }));
        console.log(sortedTasks);
        return sortedTasks;
    }
    /**
     * @param {[string]} taskText
     * @return {void} 
     */
    addTask(taskText) {
        this._db.insert("tasks", {text: taskText, created_time: Number(moment().unix()), completed: false});
        this._db.commit();
    }
}

export default TaskService;