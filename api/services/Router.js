'use strict';

const _ = require('lodash');

/**
 * @class Router
 * @global
 */
class Router {

  /**
   * Constructor.
   * @param {string} query
   */
  constructor(query) {
    this.query = query;
  }

  /**
   * Check is admin current page.
   * @return {boolean}
   */
  isAdminPage() {
    return this.query.search(/^admin(\/|$)/) > -1;
  }

/**
  * Generate url.
  *
  * @param {string} controller
  * @param {string} action
  * @param {string} folder
  * @return {string}
  **/
  static getRoute(controller, action, folder) {

      if (!controller || !_.isString(controller)) {
        throw new Error('Bad controller for route');
      }

      if (!action || !_.isString(action)) {
        action = '';
      }

      let url = sails.config.appUrl;

      if (folder && _.isString(folder)) {
        url += folder + '/';
      }

      url += controller + '/' + action;

      return url;

  }

  /**
   *
   * Return path for data image.
   *
   * @param {string} path
   */
  static dataImage(path) {

    return sails.config.appUrl + 'data/images/' + path;

  }

}
/**
 * @module Router
 * @type {Router}
 */
module.exports = Router;
