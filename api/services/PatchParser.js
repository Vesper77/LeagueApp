"use strict";

const cheerio = require('cheerio');
const request = require('request');

/**
 * @module
 * @type {PatchParser}
 **/
module.exports = PatchParser;

/**
 * @class PatchParser
 * @param {string} version
 * @constructor
 * @global
 */
function PatchParser(version) {

  //Public fields
  this.currentVersion = version;

  //Private fields
  let $ = null;

  //Public functions
  /**
   * Get url for version.
   *
   * @return {null|string}
   */
  this.getUrlVersion = function() {

    if (this.currentVersion) {

      return 'http://euw.leagueoflegends.com/en/news/game-updates/patch/patch-' + this.currentVersion + '-notes';

    }

    return null;

  };

  /**
   * Return html code for patch
   *
   * @return {Promise}
   */
  this.getHtml = function() {

    return new Promise((resolve, reject) => {

      function onResponse(err, response, body) {

        if (err || response.statusCode != 200) {
          return reject(err);
        }

        return resolve(body);

      }

      let options = {
        url: this.getUrlVersion(),
        headers: {
          'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'
        }
      };

      request(options, onResponse);

    });


  };

  /**
   * Process html
   *
   * @return {Promise}
   */
  this.processHtml = function() {

    return new Promise((resolve, reject) => {

      function process(html){

        if (!html) {
          return reject(new Error('No html there'));
        }

        $ = cheerio.load(html);

        let $start = $('header.header-primary #patch-champions').parent();

        let championChanges = $start.nextUntil('.header-primary', '.content-border');

        let result = [];

        championChanges.each(function(index, item) {

          let $item = $(item);

          result.push(processChampionChangeBlock($item));

        });

        return resolve(result);

      }

      return this.getHtml().then(process, reject);

    });

  };

  //Private function

  function processChampionChangeBlock($block) {

    let $championTitle = $block.find('h3.change-title');

    let result = {
      championKey: null,
      attributesChanges: []
    };

    if ($championTitle.attr('id')) {

      result.championKey= $championTitle.attr('id').replace('patch-', '');

    } else {

      result.championKey = $championTitle.text().trim().toLowerCase();

    }


    let $attributeChanges = $block.find('div.attribute-change');

    $attributeChanges.each(function(index, item) {

      let $item = $(item);

      let attributeChange = processAttributeChange($item);

      if (attributeChange) {

        result.attributesChanges.push(attributeChange);

      }

    });

    return result;

  }

  function processAttributeChange($attributeChange) {

    let attributeData = {};

    attributeData.attribute = $attributeChange.find('span.attribute').text();
    attributeData.attributeBefore = $attributeChange.find('span.attribute-before').text();
    attributeData.attributeChange = $attributeChange.find('span.change-indicator').text();
    attributeData.attributeAfter = $attributeChange.find('span.attribute-after').text();
    attributeData.isNew = $attributeChange.find('span.new').length > 0;

    return attributeData;

  }

}
