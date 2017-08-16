function neymar(type, props, ...children) {
    props = props || {}
    return {
        type,
        props,
        children: Array.prototype.concat.apply([], children)
    }
}

function createElement(node) {
    if (typeof node === 'string') {
        return document.createTextNode(node)
    }

    const el = document.createElement(node.type)
    node.children
        .map(createElement)
        .map(el.appendChild.bind(el))

    return el
}

function view() {
    return (<div id="frase-reflexiva"><h1>Neymar é fera</h1></div>)
}

function render(node) {
    node.appendChild(createElement(view()))
}
