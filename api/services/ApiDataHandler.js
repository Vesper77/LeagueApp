'use strict';

const _ = require('lodash');

/**
 * @member {RepositoryStorage} RepositoryStorage
 */

/**
 * @module
 */
module.exports = new ApiDataHandler();

/**
 * @class ApiDataHandler
 * @constructor
 * @global
 */
function ApiDataHandler() {

  let _this = this;

  /**
   * Insert data, that was get by api.
   * @param {Array} attributeChanges
   * @return {Promise}
   */
  this.insertAttributeChanges = function(attributeChanges) {

    if (!(attributeChanges && _.isArray(attributeChanges))) {

      return new Promise((resolve, reject) => {
        return reject(new Error('Bad data of attribute changes for insert'));
      });

    } else {

      let dataToInsert = [];

      attributeChanges.forEach(function (hero) {

        hero.attributesChanges.forEach(function (attributeChange) {

          dataToInsert.push({
            attribute: attributeChange.attribute,
            isNew: attributeChange.isNew,
            change: attributeChange.attributeChange,
            before: attributeChange.attributeBefore,
            after: attributeChange.attributeAfter
          });

        });

      });

      return new Promise((resolve, reject) => {

        let attributeChangesRepo = RepositoryStorage.getAttributeChangeRepository();

        attributeChangesRepo.put(dataToInsert).then(resolve, reject);

      });

    }

  };

  /**
   * Fill version, by data was get by api.
   *
   * @param {Array} versions
   */
  this.fillVersions = function(versions) {

    if (versions && _.isArray(versions)) {

      let dataToInsert = [];

      versions.forEach(function(item) {

        let shortVersion = _this.getShortVersion(item);

        if (_.isString(shortVersion)) {

          dataToInsert.push({
            version: item,
            shortVersion: shortVersion
          });

        }

      });

      return  new Promise((resolve, reject) => {

        let patchRepo = RepositoryStorage.getPatchRepository();

        return patchRepo.remove().then(() => { return patchRepo.put(dataToInsert);}, resolve).then(resolve, reject);

      });


    } else {

      return new Promise((resolve, reject) => {
        return reject(new Error('Bad data of version for insert'))
      });

    }

  };

  /**
   * Fill champions, by data was get by api.
   *
   * @param {Array} champions
   * @return {Promise}
   */
  this.fillChampions = function(champions) {

    if (champions && _.isArray(champions)) {

      let championRepo = RepositoryStorage.getChampionRepository();
      let statsRepo = RepositoryStorage.getChampionStatRepository();
      let spellsRepo = RepositoryStorage.getChampionSpellRepository();
      let passivesRepo = RepositoryStorage.getChampionPassiveRepository();

      let championsToInsert = [];
      let spellsToInsert = [];
      let statsToInsert = [];
      let passiveToInsert = [];

      champions.forEach(function(champion) {

        let championId = champion.id;

        /** Data of champion to insert **/
        championsToInsert.push({
          name: champion.name,
          riotId: championId,
          image: champion.image.full
        });
        /** /Data of champion to insert/ **/

        /** Data of stats to insert **/
        let statsAttr = statsRepo.attributes();

        if (statsAttr) {

          let statsObject = {
            champion: championId
          };

          for(let stat in statsAttr) {

            let statLower = stat.toLowerCase();

            if (typeof champion.stats[statLower] !== 'undefined') {

              statsObject[stat] = champion.stats[statLower];

            }

          }

          statsToInsert.push(statsObject);

        }
        /** /Data of attributes to insert/ **/

        /** Data of spells to insert **/
        champion.spells.forEach(function(spell) {

          spellsToInsert.push({
            champion: championId,
            name: spell.name,
            description: spell.description,
            image: spell.image.full
          });

        });
        /** /Data of spells to insert/ **/

        /** Data of passive to insert **/
        passiveToInsert.push({
          champion: championId,
          name: champion.passive.name,
          description: champion.passive.description,
          image: champion.passive.image.full
        });
        /** /Data of passive to insert/ **/

      });

      return new Promise((resolve, reject) => {

        function insertChamps() {
          return championRepo.put(championsToInsert);
        }

        function insertStats() {
          return statsRepo.put(statsToInsert);
        }

        function insertSpells() {
          return spellsRepo.put(spellsToInsert);
        }

        function insertPassives() {
          return passivesRepo.put(passiveToInsert);
        }

        function errorCatch(err) {
          return reject(err);
        }

        return championRepo.remove()
          .then(() => { return statsRepo.remove(); }, errorCatch)
          .then(() => { return spellsRepo.remove() }, errorCatch)
          .then(() => { return passivesRepo.remove() }, errorCatch)
          .then(insertChamps, errorCatch)
          .then(insertStats, errorCatch)
          .then(insertSpells, errorCatch)
          .then(insertPassives, errorCatch)
          .then(resolve, reject);

      });

    } else {

      return new Promise((resolve, reject) => { return reject(new Error('Data to insert undefined or not array')); } );

    }

  };

  /**
   * Get short-hand version
   * @param {String} version
   * @return {String}
   */
  this.getShortVersion = function(version) {

    if (_.isString(version)) {

      let reqExp = new RegExp(/^\d+\.\d+/);

      let shortVersion = reqExp.exec(version);

      if (_.isArray(shortVersion)) {

        return shortVersion[0].replace('.', '');

      }

    }

    return version;
  }

}
