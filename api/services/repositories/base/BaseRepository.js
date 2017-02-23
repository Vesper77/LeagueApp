'use strict';

const _ = require('lodash');
/**
 * @class BaseRepository
 */
const BaseRepository = (function() {
  let modelName;

  class BaseRepository {

    constructor(name) {
      modelName = name;
      this.getModel();
    }

    getModel() {

      if (modelName && sails.models[modelName]) {

        this.modelEntity = sails.models[modelName];

        return this.modelEntity;

      } else {
        throw new Error('Can not find model with ' + modelName);
      }

    }

    getOne(params, next) {

      if (_.isFunction(params)) {
        next = params;
        params = {};
      }

      let model = this.getModel();

      model.findOne(params, next);

    };

    getMany(params, next) {

      if (_.isFunction(params)) {
        next = params;
        params = {};
      }

      let model = this.getModel();

      model.find(params, next);

    };

    put(data, next) {

      let model = this.getModel();

      model.create(data, next);

    };

    remove(params, next) {

      if (_.isFunction(params)) {
        next = params;
        params = {};
      }

      let model = this.getModel();

      model.destroy(params, next);

    };

    update(data, params, next) {

      if (_.isFunction(params)) {
        next = params;
        params = {};
      }

      let model = this.getModel();

      model.update(params, data, next);

    };

    count(params, next) {

      if (_.isFunction(params)) {
        next = params;
        params = {};
      }

      let model = this.getModel();

      model.count(params, next);

    }

  }

  return BaseRepository;
})();

/**
 * @module
 * @type {BaseRepository}
 */
module.exports = BaseRepository;
