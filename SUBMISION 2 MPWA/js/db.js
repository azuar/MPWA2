function databasePromise(idb) {
    var dbPromise = idb.open("team", 1, function (upgradeDb) {
        if (!upgradeDb.objectStoreNames.contains("saved")) {
            var indexTeamSaved = upgradeDb.createObjectStore("saved", {
                keyPath: "id",
            });
            indexTeamSaved.createIndex("team_name", "team_name", {
                unique: false,
            });
        }
    });

    return dbPromise;
}