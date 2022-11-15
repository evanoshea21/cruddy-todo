const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;
var Promise = require('bluebird');
var fsPromise = Promise.promisifyAll(require('fs'));
// const {counter} = require('./data/counter.txt');

// var counter = 0;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

const readCounter = (callback) => { //this CB from getUniqueiD inside Read
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      callback(null, 0);
    } else {
      callback(null, Number(fileData));
    }
  });
};

const writeCounter = (count, callback) => { //this CB from index.js
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////

//want to get it from stored data so it PERSISTS on server re-boots

//resolves -> readFile, getdata, writeFile(data + 1)
  //then return zeroPaddedNumber(data^);
  //does this^ return for outer Func getNextUniqueId ??
//rejected -> console.log(error)

  exports.getNextUniqueId = (callback) => {//this CB is from index.js
    readCounter((err, count) => {
      if (err) {
        console.log('error');
      } else {
        count = count + 1;
        writeCounter(count, callback);
      }
    });
    // return zeroPaddedNumber(counter);
  };





// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');
