
window.addEventListener('load', init);


function init(){
    console.log('ucitana stranica');
}

localStorage.setItem('kljuc', 'vrednost');
localStorage.setItem('kljuc2', 'vrednost2');

var vrednost_kljuc = localStorage.getItem('kljuc');
console.log(vrednost_kljuc);

var vrednost_kljuc2 = localStorage.getItem('kljuc2');
console.log(vrednost_kljuc2);

var nepostojeci_kljuc = localStorage.getItem('nepostojeci_kljuc') || 123;
console.log(nepostojeci_kljuc);

// var x = 123;
// if(nepostojeci_kljuc == null)
// {
//     localStorage.setItem('nepostojeci_kljuc', x);
// }
var nepostojeci_kljuc = localStorage.getItem('nepostojeci_kljuc');
console.log(nepostojeci_kljuc);

localStorage.removeItem('nepostojeci_kljuc');


var film = {
    'nazi' : "Dont look up",
    'ocena' : 8.9 
}


localStorage.setItem('moj_film', film);
console.log(localStorage.getItem('moj_film'));

var niz_filmova = [
    {
        'naziv' : 'Dont look up',
        'ocena' : 8.9
    },

    {
        'naziv' : 'Dont look up2',
        'ocena' : 7.9
    },

    {
        'naziv' : 'Dont look up3',
        'ocena' : 5.9
    }
]

localStorage.setItem('json', JSON.stringify(film));

var vrednost = JSON.parse(localStorage.getItem('json'));
console.log(vrednost);

localStorage.setItem('niz', JSON.stringify(niz_filmova));
var za_niz_filmova = JSON.parse(localStorage.getItem('niz'));
console.log(za_niz_filmova);