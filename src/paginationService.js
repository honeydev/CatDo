'use strict';

import db from './db';

class PaginationService {

    constructor() {
        this._db = db.db;
        this._currentPage = 0;
        this._tasksOnPage = 5;
    }

    getPagesNumbers() {
        let pages = [];
        const tasksLength = this._db.queryAll("tasks").length;
        let counterPage = 1;

        for (let i = 0; i < tasksLength; i += 8) {
            pages.push({val: counterPage});
            counterPage++;
        }
        return pages;
    }
}

export default PaginationService;