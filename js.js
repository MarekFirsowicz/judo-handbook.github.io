

const scrollBtn = document.querySelector('.arrowDownBtn')
const main = document.querySelector('.main_content')
const template = document.querySelector('#home_page')
const content = document.querySelector('.body_wrapper')

const fixed = content.offsetTop

function set_fixed(){
    const param = get_params('menu')
    if(!param)return
    const submenu=document.querySelector(`.${param}`)
    if(window.scrollY >= fixed){
        submenu.style.position = 'fixed'
    }else{
        submenu.style.position = 'absolute'       
    }
}


function set_params(key,val){
    const params = new URLSearchParams(window.location.search);
    params.set(key,val)
    history.pushState(null, '', `?${params.toString()}`);
}

function get_params(key){
    const params = new URLSearchParams(window.location.search);
    const param = params.get(key)
    return param
}

function delete_param(key){
    const params = new URLSearchParams(window.location.search);
    params.delete(key);
    history.pushState(null, '', `?${params.toString()}`);
}

function set_url(key,val){
    console.log(key,val)
    set_params(key,val)
    initial_state()
    if (key==='grade'){
        const grade_node = document.querySelector(`#${val}`)
        grade_node.focus()
    }
}

function createNode (node, content){
    const container = document.createElement(node)
    if(content){container.textContent=`${content}`}
    return container
}


function grading(lvl,id){
    const node = document.querySelector(`.${id}`)
    if (node.firstElementChild) {
    while(node.children.length>1){
        node.removeChild(node.children[1])
    }}
    const grade =  get_params('grade')||null
     
    const content = [...Array(lvl).keys()].map(n => {
        const li = createNode('li')
        li.role='none'
        const radio = createNode('input')
        const label = createNode('label', n+1)
        const input_id = `${id}_${n+1}`
        label.setAttribute('for',input_id)
        radio.type='radio'
        radio.name=`grading`
        radio.id = input_id
        grade===input_id?radio.checked=true:radio.checked=false
        radio.classList.add('visually-hidden')
        radio.onchange= function (){set_url('grade',this.id)}
        
        li.append(radio)
        li.append(label)
        
        node.append(li)
    })
 return content
}


function addContent  (tag, header){
    // const fragment = document.createDocumentFragment()
    
    

    const filtereed_data = grading_data.filter(item=>[tag,header].every(el=>item.tags.includes(el)))
    if(filtereed_data.length<=0)return    

    const fragment = createNode('section')
    fragment.classList.add('section')

    const header_content = createNode('h3',header)
    fragment.append(header_content)
    filtereed_data.map(item=>{
        const rotation = Math.floor(Math.random()*10-5)

        const article = document.createElement('article')
        article.classList.add('technique_container')

        const polaroid = document.createElement('div')
        polaroid.classList.add('polaroid')
        polaroid.style.rotate = `${rotation}deg`

        const link = document.createElement('a')
        link.setAttribute('href',item.link)
        link.classList.add('yt_link')
        const icon = document.createElement('i')
        icon.classList.add('fa-brands','fa-youtube')
        icon.setAttribute('aria-label', 'you tube')
        link.append(icon)
        

        const image = document.createElement('img')
        image.setAttribute('src', `./grading_img/${item.jap.toLowerCase()}.jpg`)
        image.setAttribute('alt', `${item.jap} image`)
        const image_h = createNode('h4',item.jap)
        const h_span = createNode('span',`(${item.eng})`)
        image_h.append(h_span)

        const descr = document.createElement('p')
        descr.classList.add('visually-hidden')

        if(typeof item.descr ==='object'){
            const dl = document.createElement('dl')
            //console.log(item.descr)
            for(key in item.descr){
                const dt = createNode('dt', key)
                
                const dd = createNode('dd', item.descr[key])
                dl.append(dt,dd)
            }
            descr.append(dl)
        }else{
            descr.innerText=item.descr
        }
        

        polaroid.append(image, image_h, link, descr)
        
        article.append(polaroid)

        return fragment.append(article)
    })    
    
    main.append(fragment)
      
}



// console.log( grading_data.length)
// const screen = Math.floor(innerWidth/300)





// function lerp (A,B,t){
//     return A+(B-A)*t;
// }

// function resetUrl(){
//     const params = new URLSearchParams(window.location.search);

//     const tag = [...params.get('tag').split(',')]

//     params.delete('tag');
//     if (params.toString()) {
//         // If there are still parameters, update the URL with them
//         history.pushState(null, '', `${location.pathname}?${params.toString()}`);
        
//     } else {
//         // If no parameters are left, update the URL without the '?'
//         history.pushState(null, '', location.pathname);
//         //location.reload();
//     }
//         // If no parameters are left, update the URL without the '?'
   
    
// }

// function reset_radio_btn(id){
//     const btn = document.querySelector(id)
//     btn.checked=false
//     set_menu_radioBtn()
// }




// function set_menu_radioBtn(){
//     const params = new URLSearchParams(window.location.search);
//     const tag = params.get('tag')
//     const level = params.get('level')
    
//     if(!tag||tag==='home'){
//         const home = document.querySelector('#home')
//         home.checked = true
//         history.pushState(null, '', location.pathname);
//     }else{
//         if(tag&&level){
//             return
            
//         }else{
//             document.querySelector(`#${tag}`).focus()
//         }
        
//     }
// }


// new

function close_submenu(id){
    delete_param('menu')
    const menu_node= document.querySelector(id)
    menu_node.checked=false
    menu_node.focus()
}

function set_home_page(){
    
    delete_param('grade')
    delete_param('menu')
    initial_state()
    
}

function initial_state(){
    const menu = get_params('menu')
    const grade = get_params('grade')
    const menu_node = document.querySelector(`#${menu}`)
    // const grade_node = document.querySelector(`#${grade}`)
    grading(6, 'kyu')
    grading(18, 'mon')
    if(grade){
        if(menu_node){
            menu_node.checked=true            
        }
        page_content(`${grade}`)
    }else{
        const home = document.querySelector('#home')
        home.checked = true
        //home.focus()
        const home_page =template.content.cloneNode(true)
        main.textContent=''
        main.append(home_page)
        //main.append(home_content)
    }
    if(menu_node){
        menu_node.checked=true        
    }
    
}

function page_content(grade_level){    
    const header_text = grade_level.replace('_', ' ')
    main.textContent=''
    const grade_header=createNode('h2',header_text)
    main.append(grade_header)
    addContent(grade_level, 'ukemi')
    addContent(grade_level, 'osaekomi-waza')
    addContent(grade_level, 'tachi-waza')
    addContent(grade_level, 'kansetsu-waza')
    addContent(grade_level, 'shime-waza')   
}
// start



initial_state()

window.addEventListener('scroll', function(){    
        set_fixed()   
})

window.addEventListener('popstate', function() {
    initial_state()
});

scrollBtn.addEventListener('click', (e)=>{
    document.querySelector('.body_wrapper').scrollIntoView({
        behavior: 'smooth'})
})