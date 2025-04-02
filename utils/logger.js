const getInfoLog = (req) => {
  console.log(`INFO (${new Date().toUTCString()}): ${req.method} - ${req.url}`);
};

const getErrorLog = (error) => {
  console.error(`ERROR (${new Date().toUTCString()}): ${error.message}`);
};

const getProcessLog = (message) => {
  console.log(`PROCESS (${new Date().toUTCString()}): ${message}`);
};

module.exports = {
  getInfoLog,
  getErrorLog,
  getProcessLog,
};