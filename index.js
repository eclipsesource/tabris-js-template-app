// Tabris.js RSS Reader
// This project was originally started by the awesome Tabris.js power user:
// @author: Carlos Ernesto López
// @contact: facebook.com/c.ernest.1990
//
// It was since modified in structure, and added extra functionality (like themes, custom image resolver, content sanitizers and more) by.
// Shai Alon
// https://github.com/shaialon

// Shim Web Services
Promise = require("promise");
require("whatwg-fetch");

// Run the first page
require('./src/pages/news').open();
