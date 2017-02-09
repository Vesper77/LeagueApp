const cheerio = require('cheerio');
const fs = require('fs');

module.exports = function(version) {

  this.currentVersion = version;

  this.getUrlVersion = function() {


    if (this.currentVersion) {

      return 'http://euw.leagueoflegends.com/en/news/game-updates/patch/patch-' + this.currentVersion + '-notes';

    }

    return null;

  };

  this.getHtml = function(next) {

    fs.readFile('data/Patch 7.2 Notes _ League of Legends.html', 'utf-8', function (err, res) {

      if (err !== null) {

        next(null);
        return true;

      }

      next(res);

    });

  };

  this.processHtml = function(next) {

    function process(html){

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

  let $ = null;

  // Process html there
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

};
