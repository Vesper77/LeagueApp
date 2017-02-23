const cheerio = require('cheerio');
const fs = require('fs');
const request = require('request');

/** @module **/
module.exports = PatchParser;

/**
 * @class PatchParser
 * @param version
 * @constructor
 */
function PatchParser(version) {

  let $ = null;

  this.currentVersion = version;

  this.getUrlVersion = function() {

    if (this.currentVersion) {

      return 'http://euw.leagueoflegends.com/en/news/game-updates/patch/patch-' + this.currentVersion + '-notes';

    }

    return null;

  };

  this.getHtml = function(next) {

    function onResponse(err, response, body) {

      if (err || response.statusCode != 200) {
        next(null);
        return false;
      }

      next(body);

    }

    let options = {
      url: this.getUrlVersion(),
      headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'
      }
    };

    request(options, onResponse);

  };

  this.processHtml = function(next) {

    function process(html){

      if (!html) {
        next(null);
        return false;
      }

      $ = cheerio.load(html);

      let $start = $('header.header-primary #patch-champions').parent();

      let championChanges = $start.nextUntil('.header-primary', '.content-border');

      let result = [];

      championChanges.each(function(index, item) {

        let $item = $(item);

        result.push(processChampionChangeBlock($item));

      });

      next(result);

    }

    this.getHtml(process);

  };

  function processChampionChangeBlock($block) {

    let $championTitle = $block.find('h3.change-title');

    let result = {
      championId: null,
      attributesChanges: []
    };

    if ($championTitle.attr('id')) {

      result.championId = $championTitle.attr('id').replace('patch-', '');

    } else {

      result.championId = $championTitle.text().trim().toLowerCase();

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
