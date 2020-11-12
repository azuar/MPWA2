const API_KEY = "75b65c4be26a4e81aa3428a7fdad4687";
const BASE_URL = "https://api.football-data.org/v2/";

const LEAGUE_ID = 2001;

const ENDPOINT_COMPETITION = `${BASE_URL}competitions/${LEAGUE_ID}/standings`;
const SCORER_COMPETITION = `${BASE_URL}competitions/${LEAGUE_ID}/scorers`;
const TEAMS_DETAIL = `${BASE_URL}teams`;

const fetchAPI = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': API_KEY
        }
    })
        .then(res => {
            if (res.status !== 200) {
                console.log("Error: " + res.status);
                return Promise.reject(new Error(res.statusText))
            } else {
                return Promise.resolve(res)
            }
        })
        .then(res => res.json())
        .catch(err => {
            console.log(err)
        })
};

// BLOK MENAMPILKAN DATA STANDINGS COMPETITION
function getAllStandings() {
    if ("caches" in window) {
        caches.match(ENDPOINT_COMPETITION).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    console.log("Competition Data: " + data);
                    showStanding(data);
                })
            }
        })
    }

    fetchAPI(ENDPOINT_COMPETITION)
        .then(data => {
            showStanding(data);
        })
        .catch(error => {
            console.log(error)
        })
}

function showStanding(data) {
    let standings = "";
    let standingElement = document.getElementById("homeStandings");

    data.standings[0].table.forEach(function (standing) {
        standings += `
                <tr>
                    <td>
                        <a href="./detail_teams.html?id=${standing.team.id}">
                            <img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/>
                        </a>
                    </td>
                    <td>${standing.team.id}</td>
                    <td>${standing.team.name}</td>
                    <td>${standing.won}</td>
                    <td>${standing.draw}</td>
                    <td>${standing.lost}</td>
                    <td>${standing.points}</td>
                    <td>${standing.goalsFor}</td>
                    <td>${standing.goalsAgainst}</td>
                    <td>${standing.goalDifference}</td>
                </tr>
        `;
    });

    standingElement.innerHTML = `
                <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">

                <table class="striped responsive-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Team ID</th>
                            <th>Team Name</th>
                            <th>Win</th>
                            <th>Draw</th>
                            <th>Lost</th>
                            <th>Points</th>
                            <th>Goals For</th>
                            <th>Goals Against</th>
                            <th>Goals Divfference</th>
                        </tr>
                     </thead>
                    <tbody id="standings">
                        ${standings}
                    </tbody>
                </table>
                
                </div>
    `;
}

// BLOK MENAMPILKAN DATA best 10 scorers
function getAllScorer() {
    if ("caches" in window) {
        caches.match(SCORER_COMPETITION).then(function (response) {
            if (response) {
                response.json().then(function (resources) {
                    console.log("Scorers Data: " + resources);
                    showScorer(resources);
                })
            }
        })
    }

    fetchAPI(SCORER_COMPETITION)
        .then(resources => {
            showScorer(resources);
        })
        .catch(error => {
            console.log(error)
        })
}

function showScorer(resources) {
    let scorers = "";
    let teamsElement = document.getElementById("homeScorer");

    resources.scorers.forEach(function (scorer) {
        scorers += `
                <tr>
                    <td>${scorer.player.name}</td>
                    <td>${scorer.team.name}</td>
                    <td>${scorer.numberOfGoals}</td>
                </tr>
        `;
    });

    teamsElement.innerHTML = `
                <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">

                <table class="striped responsive-table">
                    <thead>
                        <tr>
                            <th>Player Name</th>
                            <th>Team Name</th>
                            <th>Goals</th>
                        </tr>
                     </thead>
                    <tbody id="standings">
                        ${scorers}
                    </tbody>
                </table>

                </div>
    `;
}

// BLOK MENAMPILKAN DETAIL DARI TEAM
function getTeamById() {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");

    if ("caches" in window) {
        caches.match(TEAMS_DETAIL + "/" + idParam).then(function (response) {
            if (response) {
                response.json().then(function (teamsdata) {
                    console.log("Scorers Data: " + teamsdata);
                    showDetail(teamsdata);
                })
            }
        })
    }

    fetchAPI(TEAMS_DETAIL + "/" + idParam)
        .then(teamsdata => {
            showDetail(teamsdata);
        })
        .catch(error => {
            console.log(error)
        })
}

function showDetail(teamsdata) {
    let teams = "";
    let teamsDetail = document.getElementById("clubs-detail");

    teamsdata.teams.forEach(function (club) {
        teams += `
        <tr>
            <td>${club.id}</td>
            <td>${club.name}</td>
            <td>${club.address}</td>
            <td>${club.phone}</td>
            <td>${club.website}</td>
            <td>${club.email}</td>
            <td>${club.clubColors}</td>
        </tr>
        `
    });
    teamsDetail.innerHTML = `
                <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">

                <table class="striped responsive-table">
                    <thead>
                        <tr>
                            <th>Club ID</th>
                            <th>Club Name</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Website</th>
                            <th>Email</th>
                            <th>Club Color</th>
                        </tr>
                     </thead>
                    <tbody id="standings">
                        ${teams}
                    </tbody>
                </table>

                </div>
    `;

    let squad = "";
    let teamsElement = document.getElementById("list-player");
    teamsdata.squad.forEach(function (data) {
        squad += `
                <tr>
                    <td>${data.id}</td>
                    <td>${data.name}</td>
                    <td>${data.dateOfBirth}</td>
                    <td>${data.position}</td>
                    <td>${data.nationality}</td>
                </tr>
        `;
    });

    teamsElement.innerHTML = `
                <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">

                <table class="striped responsive-table">
                    <thead>
                        <tr>
                            <th>Player ID</th>
                            <th>Playar Name</th>
                            <th>Date Of Birth</th>
                            <th>Position</th>
                            <th>Nationality</th>
                        </tr>
                     </thead>
                    <tbody id="standings">
                        ${squad}
                    </tbody>
                </table>

                </div>
    `;
}
