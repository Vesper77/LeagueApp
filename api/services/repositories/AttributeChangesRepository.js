const BaseRepository = require('./base/BaseRepository');

/**
 * @class ChampionRepository
 * @extends BaseRepository
 */
class AttributeChangesRepository extends BaseRepository {
  constructor() {
    super('attributechanges');
  }
}

module.exports = AttributeChangesRepository;
