'use strict';

import 'bootstrap/dist/css/bootstrap.min.css';
import Vue from 'vue'

Vue.component('toinput', {
    template: `
        <div class="input-group" v-on:keyup.enter="addTask">
            <div class="input-group-prepend">
                <span class="input-group-text">Push Enter</span>
              </div>
              <input type="text" class="form-control" placeholder="Task Text" aria-label="Task text" aria-describedby="basic-addon1">
        </div>
    `,
    methods: {
        addTask() {
            console.log('hello')
        }
    }
});

Vue.component('tasks', {
    template: `
        <div class="list-group" >
            <task v-for="task in tasks">{{ task.text }}</task>
        </div>
    `,
    data() {
        return {
            tasks: [{text: "hello world"}]
        };
    }
});

Vue.component('task', {

    template: `
        <li class="list-group-item">
            <slot></slot>
            <button type="button" class="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </li>
    `
});

new Vue({
    el: "#root"
});