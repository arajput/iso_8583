import test from 'ava';
import iso8583 from '../lib/8583.js';

/*
Support custom iso 8583 formats
Support Case: Binary var field encode decode
*/
test('iso8583 Ext - binary var field must be encoded', t => {
  const format = {
    2: {
      ContentType: 'b',
      Label: 'F1',
      LenType: 'llvar',
      MaxLen: 99
    },
        
  };
  const data = {
    0: '0800',
    '2': '1004000000000000303030303030303030343048' 
    // #2 this is prepard by encodng subfields - 8bytes bitmap followed by subfields data
  };
  let isopack = new iso8583(data, format);
  let buff = isopack.getRawMessage();
  const iso1 = new iso8583(undefined, format).getIsoJSON(buff, {lenHeader: false});
  t.deepEqual(iso1, data);
  let isopack1 = new iso8583(iso1);
  t.is(isopack1.Msg['2'], '1004000000000000303030303030303030343048');

});
