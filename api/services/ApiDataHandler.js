'use strict';

const _ = require('lodash');
const fs = require('fs');
const request = require('request');

/**
 * @var {FileStreamHelper} FileStreamHelper
 */

/**
 *  @class ApiDataHandler
 *  @description Handler data that come from api.
 *  @global
 */
class ApiDataHandler {

  /**
   * @method
   * @description Fill version, by data was get by api.
   * @param {Array} versions
   * @memberOf ApiDataHandler
   * @instance
   * @return {Promise}
   */
  fillVersions(versions) {

    if (versions && _.isArray(versions)) {

      let dataToInsert = [];

      versions.forEach(function (item) {

        dataToInsert.push({
          version: item
        });

      });

      return new Promise((resolve, reject) => {

        let patchRepo = RepositoryStorage.getPatchRepository();

        return patchRepo.remove().then(() => {
          return patchRepo.put(dataToInsert);
        }, reject).then(resolve, reject);

      });


    } else {

      return new Promise((resolve, reject) => {
        return reject(new Error('Bad data of version for insert'))
      });

    }

  }

  /**
   * @method
   * @name fillChampions
   * @description Fill champions, by data was get by api.
   * @memberOf ApiDataHandler
   * @param {Array} champions
   * @instance
   * @return {Promise}
   */
  fillChampions(champions) {

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
        image: champion.image.full,
        key: champion.key
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
        return championRepo.put(championsToInsert).then((data) => {

          let path = 'data/images/champions/previews/';

          let resolve = function() {

            if (data.length > 0) {
              data.forEach(function(champion) {

                let urlToImage = "http://ddragon.leagueoflegends.com/cdn/7.2.1/img/champion/" + champion.image;

                request(urlToImage).pipe(fs.createWriteStream(path + champion.image));

              });
            }
          };

          FileStreamHelper.deleteFiles(path).then(resolve, errorCatch);

          return new Promise((res) => {res(data);})
        }, errorCatch);
      }

      function insertStats() {
        return championRepo.fillChampionByRiotIds(statsToInsert, 'champion', 'champion').then((stats) => { return statsRepo.put(stats); }, errorCatch);
      }

      function insertSpells() {
        return championRepo.fillChampionByRiotIds(spellsToInsert, 'champion', 'champion').then((spells) => { return spellsRepo.put(spells); }, errorCatch);
      }

      function insertPassives() {
        return championRepo.fillChampionByRiotIds(passiveToInsert, 'champion', 'champion').then((passives) => { return passivesRepo.put(passives); }, errorCatch);
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

}

}

/**
 * @module ApiDataHandler
 * @type {ApiDataHandler}
 * @global
 */
module.exports = new ApiDataHandler();
