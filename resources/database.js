import initSqlJs from "sql.jshttpvfs";

export async function getDb() {
    try{
        const response = await fetch("users.db");
        const sqliteData = new Uint8Array(await response.arrayBuffer());
        const SQL = await initSqlJs({
            locateFile: (file) => "${file}",
        });
        const db = new SQL.Database(sqliteData);
        const tableExists = await checkTableExists(db, "users");

        if (!tableExists){
            console.error("user table does not exist in the database");
            return null;
        }
    }
    //check if user table exist

  }
     

    

                            
