function teamDataSaved(data) {
    var teamDataSavedHTML = "";

    data.forEach(function (team) {
        teamDataSavedHTML += `
        <div class="col s12 m8 offset-m2 l12 ">
        <div class="card-panel grey lighten-5 z-depth-1">
            <div class="row valign-wrapper">
                <div class="col s4">
                    <img src="${team.crestUrl}" alt="Logo" class="circle responsive-img">
                </div>
                <div class="col s10">
                    <a href="./info_teams.html?id=${team.id}">
                        <h5>${team.name}</h5>
                    </a>
                    <div class="card-content">
                        <p>address: ${team.address}</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
        `;
    });

    // Sisipkan komponen ke dalam elemen dengan id saved
    document.getElementById("saved").innerHTML = teamDataSavedHTML;
}