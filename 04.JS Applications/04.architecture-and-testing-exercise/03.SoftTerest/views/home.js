const section = document.body.children[1];
// section.remove();

export function showHome() {
    document.body.children[1].replaceWith(section);
}