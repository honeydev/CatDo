'use strict';

import 'bootstrap/dist/css/bootstrap.min.css';
import Vue from 'vue';
import TaskService from './taskService';
import PaginationService from './paginationService';

let taskService = new TaskService();
let paginationService = new PaginationService();

let eventBus = new Vue();

Vue.component('toinput', {
    template: `
        <div class="input-group" v-on:keyup.enter="addTask">
            <div class="input-group-prepend">
                <span class="input-group-text">Push enter</span>
              </div>
              <input type="text" class="form-control" placeholder="Task text" aria-label="Task text" aria-describedby="basic-addon1">
        </div>
    `,
    methods: {
        addTask(event) {
            taskService.addTask(event.target.value);
            event.target.value = ""
            this.$parent.$children[1].tasks = taskService.getTasks();
            eventBus.$emit("addTask", null);
        }
    }
});

const tasks = Vue.component('tasks', {

    template: `
        <div class="list-group">
            <task v-for="task in tasks" v-bind:text="task.text" v-bind:id="task.ID" v-bind:completed="task.completed" v-bind:visible="task.visible">{{ task.text }}</task>
        </div>
    `,

    data() {
        return {
            tasks: taskService.getTasks()
        };
    }
});

Vue.component('task', {

    template: `
        <a v-on:click="switchCompleted" href="#" class="list-group-item list-group-item-action" v-bind:class="{ 'success': isCompleted()}" v-bind:style="{ 'display': getDisplay() }">
                <slot></slot>
                <button v-on:click="dropTask" type="button" class="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
        </a>
    `,


    methods: {

        switchCompleted(event) {
            taskService.switchCompleted(this.$attrs.id);
            this.$parent.tasks = taskService.getTasks();
        },

        dropTask(event) {
            taskService.dropTask(this.$attrs.id);
            this.$parent.tasks = taskService.getTasks();
            eventBus.$emit("dropTask", null);
        },

        isCompleted() {
            return this.$attrs.completed;
        },

        getDisplay() {
            return (this.$attrs.visible === true) ? "block" : "none";
        }
    }
});

Vue.component('pagination', {

    template: `
        <nav v-show="isShowPagination()" aria-label="navigation">
            <ul class="pagination">
                <page v-bind:cursor="page.val" v-for="page in pages">{{ page.val }}</page>
            </ul>
        </nav>
    `,

    data() {
        return {
            pages: paginationService.getPagesNumbers()
        };
    },

    methods: {

        isShowPagination() {
            return this.pages.length > 1;
        }
    },

    created() {
        eventBus.$on("addTask", () => {
            this.pages = paginationService.getPagesNumbers();

        });

        eventBus.$on("dropTask", () => {
            this.pages = paginationService.getPagesNumbers();
        });
    }
});

Vue.component('page', {

    template: `
        <li v-bind:class="{ 'active': active }" class="page-item"><a v-on:click="changePage" class="page-link" href="#"><slot></slot></a></li>
    `,

    data() {
        return {
            active: false
        };
    },

    methods: {
        changePage() {
            this.$parent.$parent.$children[1].tasks = taskService.getTasks(this.$attrs.cursor - 1);
            eventBus.$emit("changePage", null);
            this.active = true;
        }
    },

    created() {
        if (this.$attrs.cursor === 1) {
            this.active = true;
        }

        eventBus.$on("changePage", () => {
            this.active = false;
        });

        eventBus.$on("addTask", () => {
            this.active = false;
            if (this.$attrs.cursor === 1) {
                this.active = true;
            }
        });
    }
});

let app = new Vue({
    el: "#root"
});