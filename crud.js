
var niz_filmova;

niz_filmova = [
    {
        'id' : 1,
        'naziv' : 'Dont look up',
        'opis' : 'scenario za kraj sveta...',
        'ocena' : 8.8,
        'nagradjivana' : false
    },

    {
        'id' : 2,
        'naziv' : 'Titanik',
        'opis' : 'Put broda titanik',
        'ocena' : 10.0,
        'nagradjivana' : true
    },

    {
        'id' : 15,
        'naziv' : 'Kum',
        'opis' : 'Stanje u Italiji',
        'ocena' : 9.2,
        'nagradjivana' : true
    }
]

window.addEventListener('load', ucitavanje);

var filmovi_niz = [];
var div_za_filmove;

function ucitavanje()
{
    filmovi_niz = JSON.parse(localStorage.getItem('filmovi'));  
    if(filmovi_niz == null) {
        // console.log("Bio je null");
        filmovi_niz = niz_filmova;
    }
    console.log(filmovi_niz);
    localStorage.setItem('filmovi', JSON.stringify(filmovi_niz));
    div_za_filmove = document.getElementById('filmovi');
    div_za_filmove.innerHTML = '';
    for(var i = 0; i < filmovi_niz.length; i++){
        console.log(filmovi_niz[i].id);

        var div_za_trenutni_film = document.createElement('div');
        var naslov_za_film = document.createElement('h1');
        var opis_filma = document.createElement('h2');
        var ocena = document.createElement('p');

        naslov_za_film.innerText = `${filmovi_niz[i].naziv} (id = ${filmovi_niz[i].id})`;
        var da_li_je_nagradjivan = 'ne';
        if(filmovi_niz[i].nagradjivana)
        {
            da_li_je_nagradjivan = 'da';
        }

        opis_filma.innerHTML = `${filmovi_niz[i].opis} <hr> Nagradjivan: ${da_li_je_nagradjivan}`;

        ocena.innerHTML = filmovi_niz[i].ocena;
        div_za_trenutni_film.appendChild(naslov_za_film);
        div_za_trenutni_film.appendChild(opis_filma);
        div_za_trenutni_film.appendChild(ocena);
        div_za_trenutni_film.className = 'film';

        var update_dugme = document.createElement('button');
        update_dugme.innerText = 'Update';
        update_dugme.id = 'update_' + i;
        update_dugme.addEventListener('click', update_filma);

        var delete_dugme = document.createElement('button');
        delete_dugme.innerText = 'Delete';
        delete_dugme.id = 'delete_' + i;
        delete_dugme.addEventListener('click', delete_filma);

        div_za_trenutni_film.appendChild(update_dugme);
        div_za_trenutni_film.appendChild(delete_dugme);
        div_za_filmove.appendChild(div_za_trenutni_film);
    }
    
    
}

function update_filma(e){
    var meta = e.target;
    console.log(meta.id);    

    var redni_broj_iz_niza = meta.id.split('_');
    console.log(redni_broj_iz_niza);
    var pozicija_koja_se_updejtuje = parseInt(redni_broj_iz_niza[1]);
    var element_koji_se_apdejtuje = filmovi_niz[pozicija_koja_se_updejtuje];
    console.log(element_koji_se_apdejtuje);

    var deo_za_update = document.getElementById('deo_za_update');

    deo_za_update.innerHTML = `
            <form action="" id="forma_update">
            <p>
                <label for="id">ID</label>
                <input type="number" name="id" id="id" value=${element_koji_se_apdejtuje.id} readonly>
            </p>

            <p>
                <label for="naziv">Naziv</label>
                <input type="text" name="naziv" id="naziv" value=${element_koji_se_apdejtuje.naziv}>
            </p>

            <p>
                <label for="opis">Opis</label>
                <input type="text" name="opis" id="opis" value=${element_koji_se_apdejtuje.opis}>
            </p>

            <p>
                <label for="ocena">Ocena</label>
                <input type="number" step="0.1" name="ocena" id="ocena" value=${element_koji_se_apdejtuje.ocena}>
            </p>

            <p>
                <label for="nagradjivan">Nagradjivan</label>
                <input type="radio" name="nagradjivan" id="nagradjivan" value="da">Da
                <input type="radio" name="nagradjivan" id="nagradjivan" value="ne">Ne
            </p>
            
            
        </form>
        <button onclick="apdejtuj_film()"> Update </button> 
    `;
}

function apdejtuj_film()
{
    var id = document.getElementById('id').value;
    var naziv = document.getElementById('naziv').value;
    var opis = document.getElementById('opis').value;
    var ocena = parseFloat(document.getElementById('ocena').value);
    var nagradjivan = document.querySelector('input[name="nagradjivan"]:checked').value;

    if(nagradjivan=='da') nagradjivan = true;
    else nagradjivan = false;
    var film_objekat = {
        'id' : id,
        'naziv' : naziv,
        'opis' : opis,
        'ocena' : ocena,
        'nagradjivan' : nagradjivan
    }

    filmovi_niz = JSON.parse(localStorage.getItem('filmovi'));

    if(filmovi_niz == null){
        alert("Nema nista u localstorage-u");
        return;
    }

    var n = filmovi_niz.length;
    for(var i = 0;  i < n; i++){
        if(filmovi_niz[i].id == id){
           filmovi_niz[i] = film_objekat;
           localStorage.setItem('filmovi', JSON.stringify(filmovi_niz));
           window.location = 'pocetna.html';
           return;
        }
    }
}

function delete_filma(e){
    var meta = e.target;
    console.log(meta.id);    

    var redni_broj_iz_niza = meta.id.split('_');
    console.log(redni_broj_iz_niza);
    var pozicija_koja_se_brise = parseInt(redni_broj_iz_niza[1]);
    console.log(pozicija_koja_se_brise);
    filmovi_niz.splice(pozicija_koja_se_brise,1);
    console.log(filmovi_niz);
    localStorage.setItem('filmovi', JSON.stringify(filmovi_niz));
    window.location = 'pocetna.html';

}