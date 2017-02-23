'use strict';

const ChampionRepository = require('./repositories/ChampionRepository');
const UserRepository = require('./repositories/UserRepository');
const PatchRepository = require('./repositories/PatchRepository');
const AttributeChangesRepository = require('./repositories/AttributeChangesRepository');


/**
 * @class RepositoryStorage
 * @constructor
 */
function RepositoryStorage() {

  let reposEntities = {};


  /**
   * @return {ChampionRepository}
   */
  this.getChampionRepository = function() {

    if (!reposEntities.championRepository) {
      reposEntities.championRepository = new ChampionRepository();
    }

    return reposEntities.championRepository;

  };

  /**
   * @return {UserRepository}
   */
  this.getUserRepository = function() {

    if (!reposEntities.userRepository) {
      reposEntities.userRepository = new UserRepository();
    }

    return reposEntities.userRepository;

  };

  /**
   * @return {PatchRepository}
   */
  this.getPatchRepository = function(){

    if (!reposEntities.patchRepository) {
      reposEntities.patchRepository = new PatchRepository();
    }

    return reposEntities.patchRepository;
  };

  /**
   * @return {AttributeChangesRepository}
   */
  this.getAttributeChangesRepository = function () {

    if (!reposEntities.attributeChangesRepository) {
      reposEntities.attributeChangesRepository = new AttributeChangesRepository();
    }

    return reposEntities.attributeChangesRepository;

  };

  // let repos = {};
  // let reposEntities = {};
  //
  // function initStorage() {
  //
  //   for(let i in repositories) {
  //
  //     if (repositories.hasOwnProperty(i) && _.isFunction(repositories[i])) {
  //
  //       let repoName = repositories[i].name;
  //
  //       repos[repoName] = repositories[i];
  //
  //       this['get' + repoName] = function() {
  //
  //         if (!reposEntities[repoName]) {
  //
  //           reposEntities[repoName] = new repositories[i]();
  //
  //         }
  //
  //         return reposEntities[repoName];
  //
  //       }
  //
  //     }
  //
  //   }
  //
  // }
  //
  // initStorage();

}

/**
 * @module
 * @type {RepositoryStorage}
 */
module.exports = new RepositoryStorage();
