$(document).ready(function() {
    const url = "https://pokeapi.co/api/v2/pokemon/";

    $.ajax ({
        url : url,
        method : "get",
        success : function (res) {
            res.results.forEach(function(listPokemon) {
                $(".left-content").addClass("card");
                $("<button></button>").text(listPokemon.name).appendTo(".card");

                $("button").click(function() {
                    const selectItem = $(this).text();
                    $.get(`https://pokeapi.co/api/v2/pokemon/${selectItem.toLowerCase()}`, function(dataPokemon) {
                        const imageUrl = dataPokemon.sprites.other['official-artwork'].front_default;
                        const hp = dataPokemon.stats[0].base_stat;
                        const atk = dataPokemon.stats[1].base_stat;
                        const def = dataPokemon.stats[2].base_stat;
                        const sa = dataPokemon.stats[3].base_stat;
                        const sd = dataPokemon.stats[4].base_stat;
                        const weight = dataPokemon.weight;

                        $(".info").html(`
                            <img src="${imageUrl}" width="30%" alt="${selectItem}" /> 
                            <h3>${selectItem}</h3>
                            
                            <table>
                                <tr>
                                    <td><img src="https://www.svgrepo.com/show/506502/heart-fill.svg" width="15px" /></td>
                                    <td>HP</td>
                                    <td>:</td>
                                    <td>${hp}</td>
                                </tr>
                                <tr>
                                    <td><img src="https://www.svgrepo.com/show/360818/sword-f.svg" width="15px" /></td>
                                    <td>Attack</td>
                                    <td>:</td>
                                    <td>${atk}</td>
                                </tr>
                                <tr>
                                    <td><img src="https://www.svgrepo.com/show/360745/shield-half.svg" width="15px" /></td>
                                    <td>Defense</td>
                                    <td>:</td>
                                    <td>${def}</td>
                                </tr>
                                <tr>
                                    <td><img src="https://www.svgrepo.com/show/346430/sword-fill.svg" width="15px" /></td>
                                    <td>Special Attack</td>
                                    <td>:</td>
                                    <td>${sa}</td>
                                </tr>
                                <tr>    
                                    <td><img src="https://www.svgrepo.com/show/491481/shield.svg" width="15px" /></td>
                                    <td>Special Defense</td>
                                    <td>:</td>
                                    <td>${sd}</td>
                                </tr>
                                <tr>
                                    <td><img src="https://www.svgrepo.com/show/482797/weight-scale-1.svg" width="15px" /></td>
                                    <td>Weight</td>
                                    <td>:</td>
                                    <td>${weight}</td>
                                </tr>
                            </table>
                        `);
                    });
                });
                
            })  
        }
   })
});

function searchPokemon() {   
    const nama = $('input').val().toLowerCase();
    
    !nama ? Swal.fire('', 'Data tidak boleh kosong', 'warning') : console.log("data diproses...");

    $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon/"+nama,
        method: "get",
        success: function(res) {
            const imageUrl = res.sprites.other['official-artwork'].front_default;
            const hp = res.stats[0].base_stat;
            const atk = res.stats[1].base_stat;
            const def = res.stats[2].base_stat;
            const sa = res.stats[3].base_stat;
            const sd = res.stats[4].base_stat;
            const weight = res.weight;

            $(".info").html(`
                <img src="${imageUrl}" width="30%" alt="${res.name}" /> 
                <h3>${res.name}</h3>

                <table>
                    <tr>
                        <td><img src="https://www.svgrepo.com/show/506502/heart-fill.svg" width="15px" /></td>
                        <td>HP</td>
                        <td>:</td>
                        <td>${hp}</td>
                    </tr>
                    <tr>
                        <td><img src="https://www.svgrepo.com/show/360818/sword-f.svg" width="15px" /></td>
                        <td>Attack</td>
                        <td>:</td>
                        <td>${atk}</td>
                    </tr>
                    <tr>
                        <td><img src="https://www.svgrepo.com/show/360745/shield-half.svg" width="15px" /></td>
                        <td>Defense</td>
                        <td>:</td>
                        <td>${def}</td>
                    </tr>
                    <tr>
                        <td><img src="https://www.svgrepo.com/show/346430/sword-fill.svg" width="15px" /></td>
                        <td>Special Attack</td>
                        <td>:</td>
                        <td>${sa}</td>
                    </tr>
                    <tr>    
                        <td><img src="https://www.svgrepo.com/show/491481/shield.svg" width="15px" /></td>
                        <td>Special Defense</td>
                        <td>:</td>
                        <td>${sd}</td>
                    </tr>
                    <tr>
                        <td><img src="https://www.svgrepo.com/show/482797/weight-scale-1.svg" width="15px" /></td>
                        <td>Weight</td>
                        <td>:</td>
                        <td>${weight}</td>
                    </tr>
                </table>
            `);
        },
        error: function() {
            Swal.fire('', 'Tidak ada data seperti itu', 'error');
            console.log("tidak ada data");
        }
    })
}