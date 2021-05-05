import logger from '../lib/logger';

const assert = require('assert');describe('Simple Math Test', () => {
  it('should return 2', () => {
         assert.strictEqual(1 + 1, 2);
         logger.info("hola");
     });
  it('should return 9', () => {
         assert.strictEqual(3 * 3, 9);
     });
 });