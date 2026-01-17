const db = require('./db');

db.serialize(() => {
    // Correct the typo in Nano Banana template
    db.run(`UPDATE templates SET name = 'Nano Banana JSON prompt Generator' WHERE name = 'Nano Banana JSON prompt Gernator'`, function (err) {
        if (err) {
            console.error(err.message);
        } else {
            console.log(`Row(s) updated: ${this.changes}`);
        }
    });

    // Verify all templates
    db.all("SELECT id, name FROM templates", [], (err, rows) => {
        if (err) {
            throw err;
        }
        console.log("Current Templates in DB:");
        rows.forEach((row) => {
            console.log(`${row.id}: ${row.name}`);
        });
    });
});
