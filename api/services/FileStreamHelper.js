"use strict";

/**
 * @module File Stream Helper
 */

const fs = require('fs');

/**
 * @class FileStreamHelper
 * @constructor
 */
function FileStreamHelper() {

  /**
   * Delete all files/folder in folder.
   * @param {string} path
   * @return {Promise}
   */
  this.deleteFiles = function(path) {

    if (path.substr(-1) !== '/') {
      path += '/';
    }

    return new Promise((resolve, reject) => {

      fs.readdir(path, (error, files) => {

        if (error) {
          reject('Can not read folder `' + path + '`: ' + error);
        }

        let deleted = [];

        if (files.length) {

          let removeItem = function(index) {

            fs.unlink(path + files[index], function(err) {

              if (err) {
                reject(err, deleted);
              }

              deleted.push(path + files[index]);

              index++;

              if (index < files.length) {
                removeItem(index);
              } else {
                resolve(deleted);
              }

            });

          };

          removeItem(0);

        } else {
          resolve([]);
        }
      });
    });
  };

  this.getFile = function(path) {

    return new Promise((resolve, reject) => {

      fs.readFile(path, function(err, file) {

        if (err) {
          reject(err);
        }

        resolve(file);

      });

    });

  };
}
module.exports = new FileStreamHelper();
