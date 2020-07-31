const helpers = require('../lib/helperModels');

describe('Helpers', () => {
  describe('Bank date parser', () => {
    it('should work at all (with full date)', () => {
      expect('2016-12-01').toEqual(helpers.Date.parse(2016,12,1).toISOString().substr(0, 10));
      expect('1996-12-01').toEqual(helpers.Date.parse(1996,12,1).toISOString().substr(0, 10));
    });

    it('should work with YY (2-digit) year', () => {
      expect('2016-12-01').toEqual(helpers.Date.parse(16,12,1).toISOString().substr(0, 10));
    });
  });

  describe('Bank amount', () => {
    describe('Parse', () => {
      it('should parse debit amount -> negative', () => {
        expect(helpers.Amount.parse('D', '123.34')).toEqual(-123.34);
      });

      it('should parse credit amount -> positive', () => {
        expect(helpers.Amount.parse('C', '123.34')).toEqual(123.34);
      });

      it('should parse debit amount reversal -> positive', () => {
        expect(helpers.Amount.parse('RD', '123.34')).toEqual(123.34);
      });

      it('should parse credit amount reversal -> negative', () => {
        expect(helpers.Amount.parse('RC', '123.34')).toEqual(-123.34);
      });

      it('should parse amount with ,', () => {
        expect(helpers.Amount.parse('C', '123,34')).toEqual(123.34);
      });

      it('should round to 2 fractional digits', () => {
        expect(helpers.Amount.parse('C', '123,345')).toEqual(123.35);
      });

      it('should fail if wrong indicator passed', () => {
        expect(helpers.Amount.parse.bind(null, 'X', '123,34')).toThrow(/Wrong debit/);
      });

      it('should fail if wrong indicator passed / reversal', () => {
        expect(helpers.Amount.parse.bind(null, 'XZ', '123,34')).toThrow(/Wrong reversal/);
      });

      it('should fail if wrong indicator passed / reversal 2', () => {
        expect(helpers.Amount.parse.bind(null, 'RZ', '123,34')).toThrow(/Wrong debit/);
      });

      it('should fail if wrong amount passed', () => {
        expect(helpers.Amount.parse.bind(null, 'D', 'XXXXXX')).toThrow(/Amount cannot be parsed/);
      });

      it('should fail for negative amount string', () => {
        expect(helpers.Amount.parse.bind(null, 'D', '-123.78')).toThrow(/Positive amount/);
      });
    });

    describe('isEqual', () => {
      it('Basic checks', () => {
        expect(helpers.Amount.isEqual(123.23, 123.2301)).toBe(true);
        expect(helpers.Amount.isEqual(123.23, 123.235)).toBe(false);
      });
    });
  });


});
