
window.addEventListener('load', init);

var x = [
    {
        'naziv' : 'Gospodar prstenova',
        'broj_stranica' : 700,
        'pisac' : 'tolkin',
        'godina_izdanja' : 1999,
        'cena' : 1000
    },

    {
        'naziv' : 'Ime ruze',
        'broj_stranica' : 400,
        'pisac' : 'Umberto Eko',
        'godina_izdanja' : 1976,
        'cena' : 2000
    },

    {
        'naziv' : 'Zivotinjska farma',
        'broj_stranica' : 80,
        'pisac' : 'Orvel',
        'godina_izdanja' : 1970,
        'cena' : 300
    }
]

var niz_knjiga = [];
var forma;
function init()
{
    niz_knjiga = JSON.parse(localStorage.getItem('knjige'));
    if(!niz_knjiga){
        niz_knjiga = x;
    }
    console.log(niz_knjiga);
    localStorage.setItem('knjige', JSON.stringify(niz_knjiga));
    prikazi_tabelu(niz_knjiga);
    forma = document.getElementById('forma');
    forma.addEventListener('submit', posalji_formu);
}

function posalji_formu(e)
{
    e.preventDefault();
    console.log('forma je poslata');
    var naziv = document.getElementById('naziv').value;
    var autor = document.getElementById('autor').value;
    var godina = parseInt(document.getElementById('godina').value);
    var cena = parseInt(document.getElementById('cena').value);
    var broj_stranica = parseInt( document.getElementById('broj_stranica').value);
    
    console.log(naziv,autor,godina,cena,broj_stranica);

    var knjiga = {
        'naziv' : naziv,
        'broj_stranica' : broj_stranica,
        'pisac' : autor,
        'godina_izdanja' : godina,
        'cena' : cena
    }

    console.log (knjiga);
    var n = niz_knjiga.length;
    console.log("Duzina niza: ", n);

    niz_knjiga.push(knjiga);
    console.log(knjiga);

    prikazi_tabelu(niz_knjiga);

    localStorage.setItem('knjige', JSON.stringify(niz_knjiga));
}

function prikazi_tabelu(niz_knjiga)
{
    var tabela = document.getElementById('tabela') || document.createElement('table');
    tabela.id = 'tabela';
    tabela.innerHTML = '';
    tabela.innerHTML = `
        <tr>
            <th>Naziv</th>
            <th>Autor</th>
            <th>Godina izdanja</th>
            <th>Cena</th>
            <th>Broj stranica</th>
            <th>Delete</th>
            <th>Update</th>
        </tr>
    `;

    tabela.setAttribute('border', 1);
    tabela.style.borderCollapse = 'collapse';

    for(var i = 0; i < niz_knjiga.length; i++){
        console.log(i);
        var trenutni_red = document.createElement('tr');
        var td = document.createElement('td');
        td.innerHTML = niz_knjiga[i].naziv;
        trenutni_red.appendChild(td);

        var td_autor = document.createElement('td');
        td_autor.innerHTML = niz_knjiga[i].pisac;
        trenutni_red.appendChild(td_autor);

        var td_godina = document.createElement('td');
        td_godina.innerHTML = niz_knjiga[i].godina_izdanja;
        trenutni_red.appendChild(td_godina);

        var td_cena = document.createElement('td');
        td_cena.innerHTML = niz_knjiga[i].cena;
        trenutni_red.appendChild(td_cena);

        var td_broj_stranica = document.createElement('td');
        td_broj_stranica.innerHTML = niz_knjiga[i].broj_stranica;
        trenutni_red.appendChild(td_broj_stranica);

        var td_delete = document.createElement('td');
        var dugme_delete = document.createElement('button');
        dugme_delete.innerText = 'Delete';
        td_delete.appendChild(dugme_delete);
        trenutni_red.appendChild(td_delete);
        dugme_delete.addEventListener('click', obrisi);
        dugme_delete.id = 'delete_' + i;

        var td_update = document.createElement('td');
        var dugme_update = document.createElement('button');
        dugme_update.innerText = 'Update'
        td_update.appendChild(dugme_update);
        trenutni_red.appendChild(td_update);
        dugme_update.addEventListener('click', update);
        dugme_update.id = 'update_' + i;
        console.log(dugme_update);

        tabela.appendChild(trenutni_red);
    }


    document.body.appendChild(tabela);
}

function obrisi(e)
{
    var meta = e.target;
    console.log(meta);
    console.log(meta.id);
    console.log(meta.id.split('_'));
    console.log(meta.id.split('_')[1]);
    var pozicija_za_brisanje = meta.id.split('_')[1];

    niz_knjiga.splice(pozicija_za_brisanje, 1);

    console.log(niz_knjiga);
    localStorage.setItem('knjige', JSON.stringify(niz_knjiga));
    window.location = 'crud_local_storage.html';
}

var forma_update;

function update(e)
{
    var meta = e.target;
    console.log(meta);
    var pozicija = e.target.id.split('_')[1];
    console.log(pozicija);
    var element_sa_pozicije = niz_knjiga[pozicija];
    console.log(element_sa_pozicije);

    var update_div = document.getElementById('za_update');
    update_div.innerHTML = '';
    update_div.innerHTML = `
        <form action="" id="forma_update">
        <h1>Update</h1>
        <p>
            <label>Naziv</label>
            <input type="text" name="naziv" id="naziv_update" value="${element_sa_pozicije.naziv}" readonly>
        </p>

        <p>
            <label for="autor">Autor</label>
            <input type="text" name="autor" id="autor_update" value="${element_sa_pozicije.pisac}">
        </p>

        <p>
            <label for="godina">Godina izdanja</label>
            <input type="number" name="godina" id="godina_update" value="${element_sa_pozicije.godina_izdanja}">
        </p>

        <p>
            <label for="cena">Cena</label>
            <input type="number" name="cena" id="cena_update" value="${element_sa_pozicije.cena}">
        </p>
        
        <p>
            <label for="broj_stranica">Broj stranica</label>
            <input type="number" name="broj_stranica" id="broj_stranica_update" value="${element_sa_pozicije.broj_stranica}">
        </p>

        <p>
            <input type="submit" value="Update">
        </p>
    </form>
    `;

    forma_update = document.getElementById('forma_update');

    forma_update.addEventListener('submit', forma_update_funkcija);
}

function forma_update_funkcija(e)
{
    e.preventDefault;
    var naziv = document.getElementById('naziv_update').value;
    var autor = document.getElementById('autor_update').value;
    var godina = parseInt(document.getElementById('godina_update').value);
    var cena = parseInt(document.getElementById('cena_update').value);
    var broj_stranica = parseInt( document.getElementById('broj_stranica_update').value);
    
    console.log(naziv,autor,godina,cena,broj_stranica);

    var knjiga = {
        'naziv' : naziv,
        'broj_stranica' : broj_stranica,
        'pisac' : autor,
        'godina_izdanja' : godina,
        'cena' : cena
    }

    for(var i = 0; i < niz_knjiga.length; i++){
        if(niz_knjiga[i].naziv == naziv)
        {
            niz_knjiga[i] = knjiga;
            localStorage.setItem('knjige', JSON.stringify(niz_knjiga));
            forma_update.innerHTML = '';
            window.location = 'crud_local_storage.html';
        }
    }
}

function knjige_jeftinije_od(niz_knjiga, cena)
{
    var jeftinije = [];
    for(var i = 0; i < niz_knjiga.length; i++)
    {
        if(niz_knjiga[i].cena <= cena)
        {
            jeftinije.push(niz_knjiga[i]);
        }
    }

    return jeftinije;
}

function prikazi_jeftinije()
{
    var granicna_vrednost = parseInt(document.getElementById('jeftinije').value);
    console.log(granicna_vrednost);
    var jeftinije_knjige = knjige_jeftinije_od(niz_knjiga, granicna_vrednost);
    if(document.getElementById('jeftinije').value == '')
    {
        jeftinije_knjige = niz_knjiga;
    }
    prikazi_tabelu(jeftinije_knjige);
}