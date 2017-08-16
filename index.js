function neymar(type, props, ...children) {
    props = props || {}
    return {
        type,
        props,
        children: Array.prototype.concat.apply([], children)
    }
}

function setProperties(node, props) {
    Object.keys(props).map(prop => {
        const propName = prop === 'className' ? 'class' : prop
        node.setAttribute(propName, props[prop])
    })

}

function createElement(node) {
    if (typeof node === 'string') {
        return document.createTextNode(node)
    }

    const el = document.createElement(node.type)
    setProperties(el, node.props)
    node.children
        .map(createElement)
        .map(el.appendChild.bind(el))

    return el
}

function view() {
    return (<div id="frase-reflexiva" className="container">
        <h1 className="cabecalho-top">O ousado chegou</h1>
        <p className="paragrafo-topzera">Tô chegando com os refri rapazeada</p>
    </div>)
}

function render(node) {
    node.appendChild(createElement(view()))
}
