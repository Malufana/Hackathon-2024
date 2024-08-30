//interação do chatBot com o usuario
var data= {
    //Mensagem inicial e opções de perguntas frequentes
    chatinit:{
        title: ["Olá, eu sou ...","Essas são as nossas opções mais buscadas!"],
        options: ["Palestras","Treinamentos","Cronograma","Hackathon", "TCC"]
    },

    //Opção1
    palestras: {
        title:["Essas são algumas palestras, qual deseja visualizar?"],
        options:['Tech2','Tech3','Ui/Ux','Lowcode', 'Ux', 'Devs'],
        url : {
            link: ["../telas/tech2.html", "../telas/tech3.html", "../telas/ui.html", "../telas/lowcode.html", "../telas/ux.html", "../telas/devs.html"]
        }
    },

    //Opção2
    treinamentos: {
        title:["Esses são alguns treinamnetos"],
        options:["SAP", "AHK", "TPM"],
        url : {
            link: ["../telas/sap.html", "../telas/ahk.html", "../telas/tpm.html"]
        }
    },

    //Opção3
    cronograma: {
        title:["Qual cronograma gostaria de visualizar?"],
        options:['Mensal','Semanal'],
        url : {
            link:["../telas/mensal.html", "../telas/semanal.html"]
        }
    },

    //Opção4
    Hackathon: {
        title:["Qual edição gostaria de ver?"],
        options: ["1ºEdição","2ºEdição","3ºEdição","4ºEdição","5ºEdição", "6ºEdição"],
        url : {
            link: ["../telas/1edHack.html", "../telas/2edHack.html", "../telas/3edHack.html", "../telas/4edHack.html", "../telas/5edHack.html", "../telas/6edHack.html"]
        }
    },
    //Opção5
    TCC: {
        title: ["Thanks for your response"],
        options: ["Comedy","Horror","Sci-Fi","Romance","Action"],
        url: {
            link:["#","#","#","#","#"]
        }
    }
}

//chama o chatbot
document.getElementById("init").addEventListener("click",showChatBot);
var cbot= document.getElementById("chat-box");

var len1= data.chatinit.title.length;

//exibe a caixa de chat
function showChatBot(){
    console.log(this.innerText);
    if(this.innerText=='START CHAT'){
        document.getElementById('test').style.display='block';
        document.getElementById('init').innerText='CLOSE CHAT';
        initChat();
    }
    else{
        location.reload();
    }
}

//limpa o conteudo do chat e depois exibe as mensagens
function initChat(){
    j=0;
    cbot.innerHTML='';
    for(var i=0;i<len1;i++){
        setTimeout(handleChat,(i*500));
    }
    setTimeout(function(){
        showOptions(data.chatinit.options)
    },((len1+1)*450))
}

//
var j=0;
function handleChat(){
    console.log(j);
    var elm= document.createElement("p");
    elm.innerHTML= data.chatinit.title[j];
    elm.setAttribute("class","msg");
    cbot.appendChild(elm);
    j++;
    handleScroll();
}

//mostra as opções
function showOptions(options){
    for(var i=0;i<options.length;i++){
        var opt= document.createElement("span");
        var inp= '<div>'+options[i]+'</div>';
        opt.innerHTML=inp;
        opt.setAttribute("class","opt");
        opt.addEventListener("click", handleOpt);
        cbot.appendChild(opt);
        handleScroll();
    }
}

//exibe a resposta do chat de acordo com a clicada do usuario
function handleOpt(){
    console.log(this);
    var str= this.innerText;
    var textArr= str.split(" ");
    var findText= textArr[0];
    
    document.querySelectorAll(".opt").forEach(el=>{
        el.remove();
    })
    var elm= document.createElement("p");
    elm.setAttribute("class","test");
    var sp= '<span class="rep">'+this.innerText+'</span>';
    elm.innerHTML= sp;
    cbot.appendChild(elm);

    console.log(findText.toLowerCase());
    var tempObj= data[findText.toLowerCase()];
    handleResults(tempObj.title,tempObj.options,tempObj.url);
}

//mostra o conteudo clicado
function handleDelay(title){
    var elm= document.createElement("p");
        elm.innerHTML= title;
        elm.setAttribute("class","msg");
        cbot.appendChild(elm);
}

//exibe as opções com um atraso
function handleResults(title,options,url){
    for(let i=0;i<title.length;i++){
        setTimeout(function(){
            handleDelay(title[i]);
        },i*450)
        
    }

    const isObjectEmpty= (url)=>{
        return JSON.stringify(url)=== "{}";
    }

    if(isObjectEmpty(url)==true){
        console.log("having more options");
        setTimeout(function(){
            showOptions(options);
        },title.length*500)
        
    }
    else{
        console.log("end result");
        setTimeout(function(){
            handleOptions(options,url);
        },title.length*500)
        
    }
}

//coloca os links se for preciso
function handleOptions(options,url){
    for(var i=0;i<options.length;i++){
        var opt= document.createElement("span");
        var inp= '<a class="m-link" href="'+url.link[i]+'">'+options[i]+'</a>';
        opt.innerHTML=inp;
        opt.setAttribute("class","opt");
        cbot.appendChild(opt);
    }
    var opt= document.createElement("span");
    var inp= '<a class="m-link" href="'+url.more+'">'+'See more</a>';

    const isObjectEmpty= (url)=>{
        return JSON.stringify(url)=== "{}";
    }

    console.log(isObjectEmpty(url));
    console.log(url);
    opt.innerHTML=inp;
    opt.setAttribute("class","opt link");
    cbot.appendChild(opt);
    handleScroll();
}

//faz uma rolagem automatica para mostrar a mensagem mais recente
function handleScroll(){
    var elem= document.getElementById('chat-box');
    elem.scrollTop= elem.scrollHeight;
}