var pokedexLimit = 151;
const P = new Pokedex.Pokedex(); 

// populates dex container with pokemon
function loadDexGrid() {
    var dexGrid = '<div class="row justify-content-center">'; // opening row div
    
    // adds a box to container with pokemon sprite from serebii
    for(var i = 1; i <= pokedexLimit; i++) {
        var dexNum = convertId(i); // converts id to pokedex format to get sprites
        
        // adds html to dexGrid var for specific pokemon
        // each pokemon is given id that is also their dex number (non-dex format)
        dexGrid += `
            <div id="` + i + `" class="col-xs-4 square rounded border border-dark" onClick="loadModal(this.id)";>
                <img src="https://www.serebii.net/blackwhite/pokemon/` + dexNum + `.png" class="mx-auto d-block img-fluid">
                <p>` + dexNum + `</p>
            </div>
        `;
    }

    dexGrid += '</div>'; // closing row div

    document.getElementById("dex").insertAdjacentHTML('beforeend', dexGrid); // inserts html stored in 'dexGrid' to the dex div
}

// loads modal with information from selected pokemon, and opens modal
// retrieves info from https://pokeapi.co/
async function loadModal(dexNum) {
    var pkmn;

    // retrieves pokemon info
    try {
        pkmn = await P.getPokemonSpeciesByName(dexNum);
    } catch(e) {
        return;
    }

    var dexNum = convertId(dexNum);

    var pkmnModal = `
        <div class="modal-dialog">
            <div class="modal-content">
                 <div class="modal-header">
                    <img src="https://www.serebii.net/pokedex-dp/icon/` + dexNum + `.gif">
                    <h5 class="modal-title">` + pkmn.name.charAt(0).toUpperCase() + pkmn.name.slice(1) + `</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <img src="https://www.serebii.net/blackwhite/pokemon/` + dexNum + `.png" class="">
                    <p>` + pkmn.flavor_text_entries[13].flavor_text + `</p> 
                </div>
            </div>
        </div>    
    `;
    
    document.getElementById("pkmnModal").innerHTML = pkmnModal; // replaces modal data
    $('#pkmnModal').modal(); // opens modal
}

// takes dex number from var i, and converts to pokedex number (i.e. 1 --> 001)
// did this because the sprites I am getting from serebii use the 001 format
// https://stackoverflow.com/questions/5366849/convert-1-to-0001-in-javascript
function convertId(dexNum) {
    var num = "" + dexNum;
    var pad = "000";
    var dexNum = pad.substring(0, pad.length - num.length) + num;
    return dexNum;
}

// search function, can search by either name or number
// inspired by https://www.w3schools.com/howto/howto_js_filter_lists.asp
async function pokeSearch() {
    var input = document.getElementById("search").value.toLowerCase();
    var pokeList; // list of pokemon

    // grabs an array of pokemon names and their numbers
    try {
        pokeList = await P.getPokemonsList({limit: pokedexLimit, offset: 0});
        console.log(pokeList);
    } catch(e) { 
        return;
    }

    for(var i = 1; i <= pokedexLimit; i++) {
        var pkmn = document.getElementById(i);
        var dexNum = convertId(i);

        // if any segment of the input matches a name or dex number, it will display the corresponding pokemon
        if(dexNum.indexOf(input) > - 1 || pokeList.results[i-1].name.indexOf(input) > -1) {
            pkmn.style.display = "";
        } else {
            pkmn.style.display = "none";
        }
    }
}
