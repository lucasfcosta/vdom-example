function neymar(type, props, ...children) {
    props = props || {}
    return {
        type,
        props,
        children: Array.prototype.concat.apply([], children)
    }
}

function changed(one, two) {
    return typeof one !== typeof two ||
        typeof one === 'string' && one !== two ||
        one.type !== two.type
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

function updateElement(parent, newNode, oldNode, index = 0) {
    if (!oldNode) {
        parent.appendChild(createElement(newNode))
    } else if (!newNode) {
        parent.removeChild(parent.childNodes[index])
    } else if (changed(newNode, oldNode)) {
        parent.replaceChild(
            createElement(newNode),
            parent.childNodes[index]
        )
    } else if (newNode.type) {
        const newLength = newNode.children.length;
        const oldLength = oldNode.children.length;
        for (let i = 0; i < Math.max(newLength, oldLength); i++) {
          updateElement(
            parent.childNodes[index],
            newNode.children[i],
            oldNode.children[i],
            i
          );
        }
    }
}

function view(x) {
    return (<div id="frase-reflexiva" className="container">
        <h1 className="cabecalho-top">O ousado chegou</h1>
        <h2 className="nome-do-app-topzera">Relógio de salários do Neymar</h2>
        <p>Desde que você entrou nessa página, Neymar ganhou {String(x)} dinheiros.</p>
    </div>)
}


function render(node) {
    //node.appendChild(createElement(currentView))
    let currentGolpinhos = 0;
    let currentView = view(currentGolpinhos);

    updateElement(node, currentView)

    setInterval(() => {
        const newGolpinhos = Number(currentGolpinhos) + 3.5
        const newView = view(newGolpinhos)
        updateElement(node, newView, currentView)

        currentGolpinhos = newGolpinhos
        currentView = newView
    }, 1000)
}

