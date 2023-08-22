export function html(str) {
    const div = document.createElement('div');
    div.innerHTML = str.trim();
    return div.childNodes;
}
