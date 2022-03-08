import Boleto from "../src/Domain/Entity/Boleto";

test ('Must return as a valid boleto without separators', () => {
    const code = '26090763087584449858654300000004389240000041807';
    const boleto = new Boleto(code);
    expect(boleto.getValue()).toBe(code);    
});
test ('Must return as a valid boleto with separators', () => {
    const code = '26090.76308.75844.498586.54300.000004.3.89240000041807';
    const boleto = new Boleto(code);
    expect(boleto.getValue()).toBe(code);
});
test ( 'Must return as a invalid boleto', () => {
    expect(() => new Boleto('26090_76308_75844_498586_54300_000004_3_89240000041807')).toThrow(new Error('Invalid typeable Line Size!'));
    expect(() => new Boleto('26090#76308b75844c498586d54300e000004f3g89240000041807')).toThrow(new Error('Invalid typeable Line Size!'));
    expect(() => new Boleto('26090#63087$844&9_58654300000004389240000041807')).toThrow(new Error('Typeable line has invalid characters!'));
});
test ( 'Must return as a invalid boleto with same digits', () => {
    expect(() => new Boleto('11111111111111111111111111111111111111111111111')).toThrow(new Error('Typeable line has a sequence of equal digits!'));
    expect(() => new Boleto('999999999999999999999999999999999999999999999999')).toThrow(new Error('Typeable line has a sequence of equal digits!'));
});
test ( 'Must return as a invalid boleto without code', () => {
    expect(() => new Boleto('')).toThrow(new Error('Uninformed typeable line!'));
});
test ( 'Must return as a invalid field digit in boleto', () => {
    expect(() => new Boleto('26090763097584449858654300000004389240000041807')).toThrow(new Error('The first field checker digit is invalid!'));
    expect(() => new Boleto('00190000090282113542025476786170689200000005480')).toThrow(new Error('The second field checker digit is invalid!'));
    expect(() => new Boleto('23793645044206300544341000287702689200000039062')).toThrow(new Error('The third field checker digit is invalid!'));
});
test ('Must return as a valid boleto with general digit calc forced to 1', () => {
    const code = '23792656026206300524373005393704189200000030459';
    const boleto = new Boleto(code);
    expect(boleto.getValue()).toBe(code);    
});
test ('Must return as a invalid boleto general digit', () => {
    expect(() => new Boleto('23792656026206300524373005393704289200000030459')).toThrow(new Error('The general checker digit is invalid!'));   
});
test ('Must return factor data from digitable line code', () => {
    const code = '26090763087584449858654300000004389240000041807';
    const boleto = new Boleto(code);
    expect(boleto.getDateFactor()).toEqual('8924');
});
test ('Must return amount from digitable line code', () => {
    const code = '26090763087584449858654300000004389240000041807';
    const boleto = new Boleto(code);
    expect(boleto.getAmount()).toEqual('41807');
});
test ('Must return as a valid covenant without separators', () => {
    const code = '836400000003615400531070159934590112101293073785';
    const boleto = new Boleto(code);
    expect(boleto.getValue()).toBe(code);    
});
test ('Must return as a valid covenant with separators', () => {
    const code = '82630000000.5.97630109202.0.01025252729.5.43102020019.9';
    const boleto = new Boleto(code);
    expect(boleto.getValue()).toBe(code);    
});
test ('Must return as a invalid covenant', () => {
    expect(() => new Boleto('826300000004976301092020010252527295431020200199')).toThrow(new Error('The first field checker digit is invalid!'));
    expect(() => new Boleto('826300000005976301092021010252527295431020200199')).toThrow(new Error('The second field checker digit is invalid!'));
    expect(() => new Boleto('826300000005976301092020010252527296431020200199')).toThrow(new Error('The third field checker digit is invalid!'));
    expect(() => new Boleto('826300000005976301092020010252527295431020200191')).toThrow(new Error('The fourth field checker digit is invalid!'));  
});
test ('Must return as a invalid covenant whith invalid characters', () => {
    expect(() => new Boleto('8367000000a8368201110005$01010202222616506228728')).toThrow(new Error('Typeable line has invalid characters!'));
    expect(() => new Boleto('83600000001&5.15520053107#9#15863989511.5.10129307378.5')).toThrow(new Error('Invalid typeable Line Size!'));
});
test ('Must return as a valid covenant with general digit', () => {
    const code = '836700000018368201110005001010202222616506228728';
    const boleto = new Boleto(code);
    expect(boleto.getValue()).toBe(code);    
});
test ('Must return as a invalid covenant general digit', () => {
    expect(() => new Boleto('836100000018368201110005001010202222616506228728')).toThrow(new Error('The general checker digit is invalid!'));   
});
test ('Must return factor data from covenant digitable line code', () => {
    const code = '846200000020445002962022202208840001002715520207';
    const boleto = new Boleto(code);
    expect(boleto.getDateFactor()).toEqual('20220220');
});
test ('Must return amount from covenant digitable line code', () => {
    const code = '846200000020445002962022202208840001002715520207';
    const boleto = new Boleto(code);
    expect(boleto.getAmount()).toEqual('24450');
});