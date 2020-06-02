var pokedexLimit = 151;

// populates dex container with pokemon
function loadDexGrid() {
    var dexGrid = '<div class="row justify-content-center">'; // opening row div
    
    // adds a box to container with pokemon sprite from serebii
    for(var i = 1; i <= pokedexLimit; i++) {
        // takes dex number from var i, and converts to pokedex number (i.e. 1 --> 001)
        // https://stackoverflow.com/questions/5366849/convert-1-to-0001-in-javascript
        var num = "" + i;
        var pad = "000";
        var dexNum = pad.substring(0, pad.length - num.length) + num;
        
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
function loadModal(dexNum) {
    
    // converts id to pokedex format to get sprites
    var num = "" + dexNum;
    var pad = "000";
    var dexNum = pad.substring(0, pad.length - num.length) + num;
    
    var pkModal = `
        <div class="modal-dialog">
            <div class="modal-content">
                 <div class="modal-header">
                    <img src="https://www.serebii.net/pokedex-dp/icon/` + dexNum + `.gif">
                    <h5 class="modal-title" id="pokeName">  ` + dexNum + `</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <img src="https://www.serebii.net/blackwhite/pokemon/` + dexNum + `.png">
                </div>
            </div>
        </div>    
    `;
    
    document.getElementById("pokeModal").innerHTML = pkModal; // replaces modal data
    $('#pokeModal').modal(); // opens modal
}
