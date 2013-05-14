databaseManager = {
	database: window.openDatabase("DB", "1.0", "iTracker DB", 1000000),
	databaseTables: ["Tracking", "Settings", "Statistics"],
	initializeDatabase: function() {           
		databaseManager.database.transaction(function(tx) {
			//databaseManager.dropTables();            
			tx.executeSql('CREATE TABLE IF NOT EXISTS Tracking (id integer primary key, trackName text, latitude double, longitude double, accuracy integer, speed integer, timestamp datetime)');
			tx.executeSql('CREATE TABLE IF NOT EXISTS Settings (id integer primary key, timestamp datetime)');
			tx.executeSql('CREATE TABLE IF NOT EXISTS Statistics (id integer primary key, timestamp datetime)');
		});
	},
	insertIntoDatabase: function(tableName, params) {
		database.transaction(function(tx) {
			var query;
			switch (tableName) {
				case "Tracking":
					query = "INSERT INTO " + tableName + " (trackName, latitude, longitude, accuracy, speed, timestamp) VALUES (?,?,?,?,?,?)";                 
					break;
				case "Settings":
					query = "INSERT INTO " + tableName + " (timestamp) VALUES (?)";
					break;
				case "Statistics":
					query = "INSERT INTO " + tableName + " (timestamp) VALUES (?)";
					break;
				default:
					query = "No such table";
					break;
			}
            
			if (query === "No such table")
				return false;
            
			tx.executeSql(query, params, function(tx, res) {
			}, function(e) {
				console.log("ERROR: " + e.message);
			});   
		});
	},
	dropTable: function(tableName) {
		tx.executeSql('DROP TABLE IF EXISTS ' + tableName);
	},
	dropTables: function() {
		database.transaction(function(tx) {
			for (i = 0; i < databaseManager.databaseTables.length; i++) {
				tx.executeSql('DROP TABLE IF EXISTS ' + databaseManager.databaseTables[i]);
			}
		});
	}   
}


/*
console.log("insertId: " + res.insertId + " -- probably 1");
console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");

tx.executeSql("select count(id) as cnt from Tracking;", [], function(tx, res) {
console.log("res.rows.length: " + res.rows.length + " -- should be 1");
console.log("res.rows.item(0).cnt: " + res.rows.item(0).cnt + " -- should be 1");
});*/