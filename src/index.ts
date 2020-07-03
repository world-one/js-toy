import './scss/index.scss';

const appEl:any = document.getElementById('app');

const a = h('ul', { 'class': 'list' },
            h('li', { 'class': 'list-item' }, 'li'),
            h('li', { 'class': 'list-item' }, 'li'),
          );


const b = h('ul', { 'class': 'list' },
  h('li', { 'class': 'list-item' }, 'liiiii'),
  h('li', { 'class': 'list-item' }, 'li'),
);

appEl.append(createElement(a));
setTimeout(()=>{
  console.log('updated');
  updateElement( document.querySelector('ul'), b.children[0], a.children[0], 0 );
},1000);

function h(type: string, props: {}, ...children: {}[]) {
  return { type, props, children };
}

function createElement(node: any) {
  if (typeof node === 'string') {
    return document.createTextNode(node);
  }
  const $el = document.createElement(node.type);
  
  node.children
    .map(createElement)
    .forEach($el.appendChild.bind($el));
  return $el;
}

function updateElement($parent: any, newNode: any, oldNode: any, index = 0) {
  if (!oldNode) {
    $parent.appendChild(
      createElement(newNode)
    );
  } else if (!newNode) {
    $parent.removeChild(
      $parent.childNodes[index]
    );
  } else if (changed(newNode, oldNode)) { 
    $parent.replaceChild(
      createElement(newNode),
      $parent.childNodes[index]
    );
  } else if (newNode.type) {
    const newLength = newNode.children.length;
    const oldLength = oldNode.children.length;
    for (let i = 0; i < newLength || i < oldLength; i++) {
      updateElement(
        $parent.childNodes[index],
        newNode.children[i],
        oldNode.children[i],
        i
      );
    }
  }
}

function changed(node1: any, node2: any) {
  return typeof node1 !== typeof node2 ||
         typeof node1 === 'string' && node1 !== node2 ||
         node1.type !== node2.type
}