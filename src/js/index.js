
function convertiTimestamp(timestamp) {
    let data = new Date(timestamp * 1000);
    let giorno = data.getDate();
    let mese = data.getMonth() + 1;
    let anno = data.getFullYear();
    let ore = data.getHours();
    let minuti = data.getMinutes();
    let secondi = data.getSeconds();
    if (giorno < 10) {
        giorno = '0' + giorno;
    }
    if (mese < 10) {
        mese = '0' + mese;
    }
    if (ore < 10) {
        ore = '0' + ore;
    }
    if (minuti < 10) {
        minuti = '0' + minuti;
    }
    if (secondi < 10) {
        secondi = '0' + secondi;
    }
    return `${giorno}/${mese}/${anno} ${ore}:${minuti}:${secondi}`;
}
function VisualizzaDato(i, url, title, time){
    const p = document.getElementById(`${i}`);
    if (p) {
        let data = convertiTimestamp(time);
        p.innerHTML = `<h4 class="titolo-news">${title}</h4><a href="${url}"><button>
        Link
    </button></a><br>Data: ${data}`;
    } else {
        console.error(`Elemento con ID '${i}' non trovato.`);
    }
}
async function caricaFile(id, i){
    try {
        let dato = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        let news = await dato.json(); 
        await VisualizzaDato(i, news.url, news.title, news.time); 
    } catch (error) {
        console.error('Errore nel caricamento del file:', error);
    }
}

async function convertiJson(i) {
    try {
        let arrayId = await fetch("https://hacker-news.firebaseio.com/v0/newstories.json");
        let dati = await arrayId.json();
        if(i==0){
        for(i = 0; i < 10; i++){
            caricaFile(dati[i], i);
        }
    } else {
        caricaFile(dati[i], i);
    }
    } catch (error) {
        console.error('Errore nel caricamento del JSON:', error);
    }
}
let count=0;
convertiJson(count);

//Pulsante che carica le nuove 10 news
let button= document.querySelector('button');
button.addEventListener('click', (e) => {
    count++;
    let contatore2=(10*count)-1;
    for(let i=0; i<10; i++){
    let div= document.createElement('div');
    let p=document.createElement('p');
    let divBox=document.querySelector('.row');
    div.setAttribute('class', 'col-xl-12');
    div.appendChild(p);
    divBox.appendChild(div);
    contatore2++;
    p.setAttribute('id', `${contatore2}`);
    p.setAttribute('class', 'paragrafo');
    convertiJson(contatore2);
    }
})
import '../css/styles.css';