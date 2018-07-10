'use strict';

import localStorageDB from 'localStorageDB';

const db = new localStorageDB("todo", localStorage);

if (db.isNew()) {
    db.createTable("tasks", ["text", "created_time", "completed"]);
    db.commit();
}

export default {db};