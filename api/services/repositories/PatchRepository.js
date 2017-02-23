const BaseRepository = require('./base/BaseRepository');

/**
 * @class PatchRepository
 * @extends BaseRepository
 */
class PatchRepository extends BaseRepository {
  constructor() {
    super('patch');
  }
}

module.exports = PatchRepository;
