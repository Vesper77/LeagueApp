'use strict';

const BaseRepository = require('./base/BaseRepository');

/**
 * @class AttributeChangeRepository
 * @extends BaseRepository
 */
function AttributeChangeRepository() {}
AttributeChangeRepository.prototype = new BaseRepository('attributechange');

module.exports = AttributeChangeRepository;
