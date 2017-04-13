'use strict';

const BaseRepository = require('./base/BaseRepository');

module.exports = PatchRepository;

/**
 * @class PatchRepository
 * @extends BaseRepository
 * @constructor
 */
function PatchRepository() {}
PatchRepository.prototype = new BaseRepository('patch');

PatchRepository.prototype.getLastVersion = function(params, populate) {

  params = params || {};
  populate = populate || {};

  return new Promise((resolve, reject) => {
    this.getMany(params, populate).then((items) => {

      let result = [];

      items.forEach((item) => {

        if (!result.find((x) => { return x.getShortVersion() === item.getShortVersion()})) {
          result.push(item);
        }
      });

      return resolve(result);

    }, reject);
  });

};
