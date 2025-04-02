const express = require(`express`);
const router = express.Router();

router.get('/', (req, res) => {
   
    console.log(`PROCESS (${new Date().toUTCString()}): The application is shutting down.`);
  
    process.exit();
  });
  
  module.exports = router;