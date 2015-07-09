// sails-hook-autoreload configuration
// /config/autoreload.js

module.exports.autoreload = {
  active: true,
  usePolling: false,
  dirs: [
    "api/models",
    "api/controllers",
    "api/services"
  ]
};
