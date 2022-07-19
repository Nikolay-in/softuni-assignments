import { html } from './node_modules/lit-html/lit-html.js'

export function rows(ctx) {

    const rows = Object.entries(ctx.books);

    return rows.map(row => {
        return html `
            <tr>
                <td>${row[1].title}</td>
                <td>${row[1].author}</td>
                <td>
                    <button id=${row[0]} @click=${ctx.onEdit}>Edit</button>
                    <button id=${row[0]} @click=${ctx.onDelete}>Delete</button>
                </td>
            </tr>
        `;
    });
}