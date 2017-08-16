function neymar(type, props, ...children) {
    props = props || {}
    return {
        type,
        props,
        children: Array.prototype.concat.apply([], children)
    }
}

function createElement(node) {
    if (typeof node !== 'object') {
        return document.createTextNode(node)
    }

    const el = document.createElement(node.type)

    Object.keys(node.props).map(prop => {
        const propName = prop === 'className' ? 'class' : prop
        el.setAttribute(propName, node.props[prop])
    })

    node.children
        .map(createElement)
        .map(el.appendChild.bind(el))

    return el
}

function view(x) {
    return (<div id="frase-reflexiva" className="container">
        <h1 className="cabecalho-top">O ousado chegou</h1>
        <h2 className="nome-do-app-topzera">Relógio de salários do Neymar</h2>
        <p>Desde que você entrou nessa página, Neymar ganhou {x} dinheiros.</p>
    </div>)
}

function render(node) {
    node.appendChild(createElement(view(0)))
}
