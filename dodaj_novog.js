
window.addEventListener('load', ucitaj);

var forma;
var filmovi;
function ucitaj()
{
    forma = document.getElementById('forma'); 
    forma.addEventListener('submit', dodaj_novog);
}

function dodaj_novog(e)
{
    e.preventDefault();
    console.log("desilo se...");
    var id = document.getElementById('id').value;
    var naziv = document.getElementById('naziv').value;
    var opis = document.getElementById('opis').value;
    var ocena = parseFloat(document.getElementById('ocena').value);
    var nagradjivan = document.querySelector('input[name="nagradjivan"]:checked').value;

    filmovi = JSON.parse(localStorage.getItem('filmovi'));

    if(filmovi == null){
        alert("Nema nista u localstorage-u");
        return;
    }

    var n = filmovi.length;
    for(var i = 0;  i < n; i++){
        if(filmovi[i].id == id){
            alert("Vec postoji korisnik sa tim id-om");
            return;
        }
    }
    
    console.log(id,naziv,opis,ocena,nagradjivan);
    if(nagradjivan=='da') nagradjivan = true;
    else nagradjivan = false;
    var film_objekat = {
        'id' : id,
        'naziv' : naziv,
        'opis' : opis,
        'ocena' : ocena,
        'nagradjivan' : nagradjivan
    }

    filmovi[n] = film_objekat;
    localStorage.setItem('filmovi', JSON.stringify(filmovi));

}