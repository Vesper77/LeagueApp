const BaseRepository = require('./base/BaseRepository');

/**
 * @class ChampionRepository
 * @extends BaseRepository
 */
class ChampionRepository extends BaseRepository {
  constructor() {
    super('champion');
  }
}

module.exports = ChampionRepository;
