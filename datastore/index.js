const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////
exports.create = (text, callback) => {//this CB is when CREATE is called

  counter.getNextUniqueId((error, counterString) => {
    if(error) {
      callback(new Error('error'))
    } else {
      var filePath = exports.dataDir + `/${counterString}.txt`;
      console.log('this is the path,   ', filePath);
      fs.writeFile(filePath , text, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          var obj = {id: counterString, text: text}
          callback(null, obj);
          console.log("File written successfully with data->", data);
        }
      })
    }
})
  // counter.getNextUniqueId( (err, data) => {
  //   if (err) {
  //     console.log('error');
  //   } else {
  //     fs.writeFile(`./data/data.txt`, text, (err, fileData) => {
  //       if(err) {
  //         console.log('error:   ', err);
  //       } else {
  //         callback(null, fileData);
  //       }
  //     })
  //   }
  // });
};

exports.readAll = (callback) => {
  var data = _.map(items, (text, id) => {
    return { id, text };
  });
  callback(null, data);
};

exports.readOne = (id, callback) => {
  var text = items[id];
  if (!text) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback(null, { id, text });
  }
};

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
