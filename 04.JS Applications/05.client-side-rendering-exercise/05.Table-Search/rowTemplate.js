import { html } from './node_modules/lit-html/lit-html.js';

export const createRows = (input) => {

    return input.map(s => {
        return html `<tr><td>${s.firstName + ' ' + s.lastName}</td> <td>${s.email}</td> <td>${s.course}</td></tr>`;});
}