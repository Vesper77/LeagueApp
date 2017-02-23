'use strict';

const ChampionRepository = require('./repositories/ChampionRepository');
const UserRepository = require('./repositories/UserRepository');
const PatchRepository = require('./repositories/PatchRepository');
const AttributeChangeRepository = require('./repositories/AttributeChangeRepository');
const ChampionStatRepository = require('./repositories/ChampionStatRepository');
const ChampionSpellRepository = require('./repositories/ChampionSpellRepository');
const ChampionPassiveRepository = require('./repositories/ChampionPassiveRepository');

/**
 * @class RepositoryStorage
 * @constructor
 * @global
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
   * @return {AttributeChangeRepository}
   */
  this.getAttributeChangeRepository = function () {

    if (!reposEntities.attributeChangeRepository) {
      reposEntities.attributeChangeRepository = new AttributeChangeRepository();
    }

    return reposEntities.attributeChangeRepository;

  };

  /**
   * @return {ChampionStatRepository}
   */
  this.getChampionStatRepository = function() {

    if (!reposEntities.championStatRepository) {
      reposEntities.championStatRepository = new ChampionStatRepository();
    }

    return reposEntities.championStatRepository;

  };

  /**
   * @return {ChampionSpellRepository}
   */
  this.getChampionSpellRepository = function () {

    if (!reposEntities.championSpellsRepository) {
      reposEntities.championSpellsRepository = new ChampionSpellRepository();
    }

    return reposEntities.championSpellsRepository;

  };

  /**
   * @return {ChampionPassiveRepository}
   */
  this.getChampionPassiveRepository = function() {

    if (!reposEntities.championPassiveRepository) {
      reposEntities.championPassiveRepository = new ChampionPassiveRepository();
    }

    return reposEntities.championPassiveRepository;

  };

}

/**
 * @module
 */
module.exports = new RepositoryStorage();
