'use strict';

import 'bootstrap/dist/css/bootstrap.min.css';
import Vue from 'vue';
import TaskService from './taskService';

let taskService = new TaskService();

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
        <div class="list-group" >
            <task v-for="task in tasks" v-bind:text="task.text" v-bind:id="task.ID">{{ task.text }}</task>
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
        <a v-on:click="setComplete" href="#" class="list-group-item list-group-item-action">
                <slot></slot>
                <button type="button" class="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
        </a>
    `,
    methods: {
        setComplete(event) {
            console.dir( this.$attrs.id, this.$attrs.text );
           // taskService.setComplete
        }
    }
});

new Vue({
    el: "#root"
});