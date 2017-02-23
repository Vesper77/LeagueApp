'use strict';

/**
 * @class BaseRepository
 */
function BaseRepository(name) {

  let modelName = name;
  let model = null;

  this.getModel = function() {

    if (model === null) {
      if (modelName && sails.models[modelName]) {
        model = sails.models[modelName];
      } else {
        throw new Error('Can not find model with ' + name.toString());
      }
    }

    return model;
  }

}
/**
 *
 * Return one row by params.
 *
 * @param {Object} [params]
 * @return {Promise}
 */
BaseRepository.prototype.getOne = function(params) {

  if (!params) {
    params = {};
  }

  let model = this.getModel();

  return new Promise((resolve, reject) => {

    model.findOne(params, function(err, item) {

      if (err) {
        return reject(err);
      }

      return npmresolve(item);

    })

  });

};

/**
 * Return rows by specific params
 *
 * @param {Object} [params]
 * @return {Promise}
 */
BaseRepository.prototype.getMany = function(params) {

  if (!params) {
    params = {};
  }

  return new Promise((resolve, reject) =>{

    let model = this.getModel();

    model.find(params, function(err, items) {

      if (err) {
        return reject(err);
      }

      return resolve(items);

    });

  });
};

/**
 * Insert data to database
 *
 * @param {Object} data
 * @return {Promise}
 */
BaseRepository.prototype.put = function(data) {

  let model = this.getModel();

  return new Promise((resolve, reject) => {

    model.create(data).exec(function(err, item) {

      if (err) {
        return reject(err);
      }

      return resolve(item);

    });
  });
};

/**
 *
 * Remove row(s) by params.
 *
 * @param {Object} [params]
 * @return {Promise}
 */
BaseRepository.prototype.remove = function(params) {

  if (!params) {
    params = {};
  }

  let model = this.getModel();

  return new Promise((resolve, reject) => {

    model.destroy(params, function(err, result) {

      if (err) {
        return reject(err);
      }

      return resolve(result);

    });

  });

};

/**
 * Update rows
 *
 * @param {Object} data
 * @param {Object} [params]
 * @return {Promise}
 */
BaseRepository.prototype.update = function(data, params) {

  if (!params) {
    params = {};
  }

  let model = this.getModel();

  return new Promise((resolve, reject) => {

    model.update(params, data).exec(function(err, result) {

      if (err) {
        return reject(err);
      }

      return resolve(result);

    });

  });

};

/**
 *
 * Return count of rows by params.
 *
 * @param {Object} [params]
 * @return {Promise}
 */
BaseRepository.prototype.count = function(params) {

  if (!params) {
    params = {};
  }

  let model = this.getModel();

  return new Promise((resolve, reject) => {

    model.count(params).exec(function(err, count) {

      if (err) {
        return reject(err);
      }

      return resolve(count);

    });

  });

};

/**
 * Return all attributes of model
 *
 * @return {Object}
 */
BaseRepository.prototype.attributes = function() {

  let model = this.getModel();

  return model.definition;

};

/**
 * @module
 * @type {BaseRepository}
 */
module.exports = BaseRepository;
