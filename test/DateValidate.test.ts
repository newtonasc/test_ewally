import DateValidate from "../src/Domain/Entity/DateValidate";

test('Must return as a boleto expire date', () => {
    const code = '26090763087584449858654300000004389240000041807';
    const getDate = new DateValidate(code);
    expect(getDate.getExpireDate()).toEqual(new Date('2022-03-14 00:00')); 
});
test('Must return as a not expire boleto date (factor 0000)',  () => {
    const code = '34191093968645551854714557400000100000000000000';
    const getDate = new DateValidate(code);
    expect(getDate.getExpireDate()).toBeFalsy(); 
});
test('Must return as a not expired boleto date', () => {
    const code = '26090763087584449858654300000004389240000041807';
    const checkDataFactor = new DateValidate(code);
    expect(checkDataFactor.isExpired(new Date())).toBeFalsy(); 
});
test('Must return as a expired boleto date',  () => {
    const code = '033991140.63370000054.12002450101.5988610000021862';
    const checkDataFactor = new DateValidate(code);
    expect(checkDataFactor.isExpired()).toBeTruthy(); 
});
test('Must return as a valid boleto whithout factor date',  () => {
    const code = '34191093968645551854714557400000100000000000000';
    const checkDataFactor = new DateValidate(code);
    expect(checkDataFactor.isExpired(new Date())).toBeFalsy(); 
});
test('Must return as a not expired boleto use new limit base date (2025-02-21)', () => {
    const code = '26090763087584449858654300000004389240000041807';
    const checkDataFactor = new DateValidate(code, new Date('2025-02-22 00:00'));
    const expireDate = new Date('2025-02-22 00:00');
    expect(checkDataFactor.isExpired(expireDate)).toBeFalsy(); 
});
test ('Must return as a covenant expire date', () => {    
    const code = '846200000020445002962022202208840001002715520207';
    const getDate = new DateValidate(code);
    expect(getDate.getExpireDate()).toEqual(new Date('2022-02-20T00:00:00.000Z')); 
});
test ('Must return as a covenant invalid date date', () => {    
    const code = '836700000018156700531072207591184115101293073785';
    const checkDataFactor = new DateValidate(code);
    expect(checkDataFactor.isExpired(new Date())).toBeFalsy();  
});