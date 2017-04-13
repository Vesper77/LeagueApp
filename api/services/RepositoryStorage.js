'use strict';

/**
 * @module Repository Storage
 */

const ChampionRepository = require('./repositories/ChampionRepository');
const UserRepository = require('./repositories/UserRepository');
const PatchRepository = require('./repositories/PatchRepository');
const ChampionChangeRepository = require('./repositories/ChampionChangeRepository');
const ChampionStatRepository = require('./repositories/ChampionStatRepository');
const ChampionSpellRepository = require('./repositories/ChampionSpellRepository');
const ChampionPassiveRepository = require('./repositories/ChampionPassiveRepository');

/**
 * @class RepositoryStorage
 * @constructor
 */
function RepositoryStorage() {

}

/**
 * Get User Repository.
 * @return {UserRepository}
 */
RepositoryStorage.prototype.getUserRepository = function() {
  return UserRepository();
};

/**
 * Get Patch Repository.
 * @return {PatchRepository}
 */
RepositoryStorage.prototype.getPatchRepository = function() {
  return new PatchRepository();
};

/**
 * Get Champion Repository.
 * @return {ChampionRepository}
 */
RepositoryStorage.prototype.getChampionRepository = function() {
  return new ChampionRepository();
};

/**
 * Get Champion Repository.
 * @return {ChampionPassiveRepository}
 */
RepositoryStorage.prototype.getChampionPassiveRepository = function() {
  return new ChampionPassiveRepository();
};

/**
 * Get Champion Spell Repository.
 * @return {ChampionSpellRepository}
 */
RepositoryStorage.prototype.getChampionSpellRepository = function() {
  return new ChampionSpellRepository();
};

/**
 * Get Champion Stat Repository.
 * @return {ChampionStatRepository}
 */
RepositoryStorage.prototype.getChampionStatRepository = function() {
  return new ChampionStatRepository();
};
/**
 * Get Champion Change Repository.
 * @return {ChampionChangeRepository}
 */
RepositoryStorage.prototype.getChampionChangeRepository = function() {
  return new ChampionChangeRepository();
};

/**
 * @member {RepositoryStorage}
 */
module.exports = new RepositoryStorage();
