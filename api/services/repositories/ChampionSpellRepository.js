'use strict';

const BaseRepository = require('./base/BaseRepository');

/**
 * @class ChampionSpellRepository
 * @extends BaseRepository
 */
function ChampionSpellRepository() {}
ChampionSpellRepository.prototype = new BaseRepository('championspell');

module.exports = ChampionSpellRepository;
