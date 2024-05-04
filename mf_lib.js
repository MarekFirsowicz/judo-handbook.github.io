
export const mflib = (    
    function (){
        let hooks = []
        let idx=0
        let globalParent
        const componentState = new Map()
        //1 
        function createHTML(type,props,...children){
            
            idx=0
            const node = document.createElement(type)
            //node.innerHTML=children
            for(const key in props){
                if(key==='children')continue
                if(typeof props[key === 'function']){
                    //console.log(key, props[key])
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


        function render (parent, component){
            globalParent={parent:parent, component:component}
            
            parent.append(component)
            console.log(parent)
            return parent
        }
        //2
        function updateState(initialState){
            //const {cache} = componentState.get(globalParent)
            
            const state = hooks[idx]||initialState
            const _idx = idx
            const setState = newVal =>{
                hooks[_idx] = newVal
                //console.log(hooks)
                //console.log(globalParent.parent, globalParent.component)
                globalParent.parent.style.color = 'green'
                render(globalParent.parent, globalParent.component)
            }
            idx++
            
            return [state, setState]
        }

        

    return {
        createHTML,
        updateState,
        render
    }
    }
())

export const createHTML2= function (type,props,...children){
    const node_props = props||{}
    const node = document.createElement(type)
    node.innerHTML=children
    for(const key in props){
        if (props==='children')continue
        node.setAttribute(key,props[key])
    }
    return node
}


function create_text_element(text){
    return {
        type:'TEXT_ELEMENT',
        props:{
            nodeValue:text,
        },
    }
}