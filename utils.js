function createHTML(type,props,...children){
            
    idx=0
    const node = document.createElement(type)
    for(const key in props){
        if(key==='children')continue
        if(typeof props[key === 'function']){
            node[key]=props[key]
        }
        else{
        node.setAttribute(key,props[key])}
    }

    children.map(child=>{
        if(typeof child ==='object'){
            node.append(child)
        }else{
            node.textContent=child
        }
    })
    
    return node
}