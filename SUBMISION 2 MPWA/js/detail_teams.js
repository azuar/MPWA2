document.addEventListener(
    "DOMContentLoaded",
    function () {
        if ("indexedDB" in window) {
            var urlParams = new URLSearchParams(window.location.search);
            var id = Number(urlParams.get("id"));

            var isSaved = false;

            cekData("saved", id)
                .then((msg) => {
                    document.getElementById("saved").innerHTML = "delete";
                    getSavedDataById("team");
                    isSaved = true;
                })
                .catch((msg) => {
                    document.getElementById("saved").innerHTML = "save";
                    getTeamById();
                    isSaved = false;
                });

            var isSaved = document.getElementById("saved");

            isSaved.onclick = function () {
                if (isSaved) {
                    deleteData("saved", id);
                    isSaved = false;
                } else {
                    item = getTeamById();
                    item.then(function (team) {
                        saveData("team", team);
                    });
                    isSaved = true;
                }
            };
        }
    },
    false
);