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
        console.log(tasksLength);

        for (let i = 0; i < tasksLength; i++) {
            pages.push(i);
        }

        return pages;
    }
}

export default PaginationService;