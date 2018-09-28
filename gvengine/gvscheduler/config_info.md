## How to configure a persist scheduler (using H2 version, follow notes to apply to general SQL DB configuration)

### Step 1
Copy datasource configuration file [org.ops4j.datasource-quartz.cfg](https://github.com/green-vulcano/gv-engine/raw/master/gvengine/gvscheduler/org.ops4j.datasource-quartz.cfg) into `<karaf_home>/etc`
Additional Notes:
Edit cfg file rows to adapt to others DB cfg.
Example: MySql uses "mysql" as driver.name, and a proper schema url such as "jdbc:mysql://localhost:3306/quartz", pointing at the MySql server URL.
Don't forget to put properties as "user" and "password", if the Quartz DB has it (_recommended_).

### Step 2
Copy schema creation script [tables_h2.sql](https://github.com/green-vulcano/gv-engine/raw/master/gvengine/gvscheduler/tables_h2.sql) anywhere in the same machine where karaf is running
Additional Notes:
Use other tables sql file to apply to other DBs. Proper sql files are present at the Quartz repo:
https://github.com/elventear/quartz-scheduler/tree/master/distribution/src/main/assembly/root/docs/dbTables

### Step 3
Run this command in the karaf shell to execute the schema creation script `jdbc:execute quartz-ds "runscript from '<path to>/tables_h2.sql'"`
Additional Notes:
Apply to a different .sql file, in case of other DB type used.

### Step 4
 Run this command in the karaf shell to install gvscheduler `feature:install gvscheduler`

### Step 5
Copy gvscheduler config [it.greenvulcano.gvesb.quartz.cfg](https://github.com/green-vulcano/gv-engine/raw/master/gvengine/gvscheduler/it.greenvulcano.gvesb.quartz.cfg) into `<karaf_home>/etc`

### Final step
Restart karaf and enjoy!
