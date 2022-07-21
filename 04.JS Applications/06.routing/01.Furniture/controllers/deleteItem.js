import { del } from "./api.js";

export function delItem(ctx) {
    del('/data/catalog/' + ctx.params.id);
    ctx.page.redirect('/');
}