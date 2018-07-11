'use strict';

import 'bootstrap/dist/css/bootstrap.min.css';
import Vue from 'vue';
import TaskService from './taskService';
import PaginationService from './paginationService';

let taskService = new TaskService();
let paginationService = new PaginationService();

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
        }
    }
});

const tasks = Vue.component('tasks', {

    template: `
        <div class="list-group">
            <task v-for="task in tasks" v-bind:text="task.text" v-bind:id="task.ID" v-bind:completed="task.completed">{{ task.text }}</task>
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
        <a v-on:click="switchCompleted" href="#" class="list-group-item list-group-item-action" v-bind:class="{ 'success': isCompleted() }">
                <slot></slot>
                <button v-on:click="dropTask" type="button" class="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
        </a>
    `,
    methods: {

        switchCompleted(event) {
            console.log("switch")
            taskService.switchCompleted(this.$attrs.id);
            this.$parent.tasks = taskService.getTasks();
        },

        dropTask(event) {
            console.dir( this.$attrs.id, this.$attrs.text );
            taskService.dropTask(this.$attrs.id);
            console.log(this)
            console.log(this.$parent.$children)
            this.$parent.tasks = taskService.getTasks();
        },

        isCompleted() {
            console.log('completed', this.$attrs.completed);
            return this.$attrs.completed;
        }
    }
});

Vue.component('pagination', {
    template: `
        <nav aria-label="navigation">
            <ul class="pagination">
                <page v-for="page in pages">{{ page }}</pages>
            </ul>
        </nav>
    `,

    data() {
        return {
            pages: []
        };
    },

    mounted() {
        this.pages = paginationService.getPagesNumbers();
    }
});

Vue.component('page', {
    tempalte: `
        <li class="page-item"><a class="page-link" href="#">0</a></li>
    `
});

new Vue({
    el: "#root"
});