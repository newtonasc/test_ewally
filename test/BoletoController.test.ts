import BoletoController from '../src/Controllers/BoletoController';

test ('Must return as a valid boleto without separators', () => {
    const code = '34191093968645551854714557400000100000000000000';
    const boleto = new BoletoController(code);
    const data = JSON.stringify(boleto.getResponseData());
    expect(data).toBe(JSON.stringify({barcode: '3419000000000000001093986455518541455740000', amount: '0.00', expirationDate: "false"}));
});
test ('Must return as a valid boleto without separators', () => {
    expect(() => new BoletoController('033991140.63370000054.12002450101.5988610000021862')).toThrow(new Error('Expired due date!'));
});