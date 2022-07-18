import { html } from './node_modules/lit-html/lit-html.js';

export const createOpt = ({text, _id}) => {
    return html `<option value=${_id}>${text}</option>`;
}