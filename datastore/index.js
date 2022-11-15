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
      // console.log('this is the path,   ', filePath);
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
//readAll(err, todoList) -> todoList refers to [{id: id, text: text}, {id: id, text: text}...]
exports.readAll = (callback) => {

  // var data = _.map(items, (text, id) => {
  //   return { id, text };
  // });
fs.readdir(exports.dataDir + '/', (err, filenames) => {
  var arr = [];
  if (err) {
    // console.log('readDir error');
    return;
  }
  for(var i = 0; i < filenames.length; i++) {
    let obj = {id: filenames[i].slice(0,5)}
    obj.text = fs.readFileSync(`${exports.dataDir}/${filenames[i]}`, 'utf8', (err, text) => {
      if(err) {
        throw('couldn\'t read file');
      } else {
        callback(null, filenames[i].slice(0,5));
      }
    });
// console.log('OBJ ->,  ', obj);
    arr.push(obj);
  }
  callback(null, arr);
  // console.log('array' , arr)
});
 //counter --00003, for loop 0001
};

exports.readOne = (id, callback) => {
  var pathToFile = `${exports.dataDir}/${id}.txt`;
  // console.log('ID IS', id, '\nPath to File,  ', pathToFile);
  fs.readFile(pathToFile, 'utf8' , (err, text) => {
    if (err) {
      callback(new Error('error message'));
    } else {
      callback(null, { id, text });
      // console.log('TEXT/ID', { id, text })
    }
  })
  };

  exports.update = (id, text, callback) => {
    console.log('ID in Update ->  ', id);
    var pathToFile = `${exports.dataDir}/${id}.txt`;
    fs.readdir(`${exports.dataDir}/`, (err, filenames) => {
      // if(err) {
      //   callback(new Error('error in readdir'));
      // } else {
      console.log('FILENAMES ->', filenames);
      if (filenames.includes(`${id}.txt`)) {
        fs.writeFile(pathToFile, text, (err) => {
          if (err) {
            callback(new Error('error bruh'));
          } else {
            // callback(null, data);
            var obj = {id, text};
            console.log('OBJ in Update ->  ', obj);
            callback(null, obj);
          }
        });
      } else {
       callback(new Error('file doesn\'t exist, so dont create new file. Good'));
      }
    });
  };




  // if (!item) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   items[id] = text;
  //   callback(null, { id, text });
  // }

exports.delete = (id, callback) => {
var pathToFile = `${exports.dataDir}/${id}.txt`;
fs.unlink(pathToFile, (err) => {
  if(err) {
    callback(new Error('error in deleting file..'));
  } else {
    callback(null);
  }
});


  // var item = items[id];
  // delete items[id];
  // if (!item) {
  //   // report an error if item not found
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback();
  // }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
