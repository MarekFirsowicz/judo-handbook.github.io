import {mflib, createHTML2} from './mf_lib.js'
const main = document.querySelector('.main_content')

//const vb = console.log('jkl')
//const html = `<button onclick=${()=>setZ(1)}>butn</button>`

const ab=()=>{
    const [v, setV]=mflib.updateState('fg')
    const [z, setZ]=mflib.updateState('jlk')
    console.log(z)
    
    return mflib.createHTML('div',{
            class:'home',
            id:1,
            },
            v,
            mflib.createHTML('button',{onclick:()=>{setV('vhg')}},v),
            mflib.createHTML('button',{style:'color:red', onclick: ()=>{setZ('kl')}},z)
        
    )
}


//  const home_content = mflib.createHTML('div',{
//                         class:'home',
//                         id:1,
//                         },
//                         v,
//                         mflib.createHTML('button',{onclick:()=>{setZ('vhg')}},v),
//                         mflib.createHTML('button',{style:'color:red', onclick: ()=>{setZ('kl')}},z)
//                     )

mflib.render(main,ab())
// main.append(a)
//main.innerHTML = html