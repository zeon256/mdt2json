const fs = require('fs');
const path = process.argv[2];
let data = "#!/usr/bin/env node\n\n";
data += fs.readFileSync(path);
fs.writeFileSync(path, data);