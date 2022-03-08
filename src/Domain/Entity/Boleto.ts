export default class Boleto {
    private value: string;
    private errorMessage = '';
    private typeDigitableLine = 'boleto';
    private DIGITS_FIELD1 = [0];
    private DIGITS_FIELD2 = [0];
    private DIGITS_FIELD3 = [0];
    private DIGITS_FIELD4 = [0];
    private INFORMED_DIGIT1 = [0];
    private INFORMED_DIGIT2 = [0];
    private INFORMED_DIGIT3 = [0];
    private INFORMED_DIGIT4 = [0];
    private INFORMED_GENERAL_DIGIT = [0];
    private DIGITABLE_LINE_BLOCKS = [[0, 0]];
    private CHECK_GENERAL_DIGITS_POSITION = [0];
    private INFORMED_DATE_FACTOR = [0];
    private INFORMED_AMOUNT = [0];
    private TOTAL_DIGITS_BOLETO = 47;
    private TOTAL_DIGITS_COVENANT = 48;

    constructor (value: string) {
        if (!this.validate(value)) throw new Error(this.errorMessage);
        this.value = value; 
    }

    public getValue() {
        return this.value;
    }

    public getDateFactor() {
        let boleto = this.value;
        boleto = this.cleanBoleto(boleto);
        return this.getBlockFromDigitableLine(boleto, this.INFORMED_DATE_FACTOR);
    }

    public getAmount() {
        let boleto = this.value;
        boleto = this.cleanBoleto(boleto);
        const informedAmount = this.getBlockFromDigitableLine(boleto, this.INFORMED_AMOUNT);
        const indexInitialAmout = [...informedAmount].findIndex((digit, index) => {
            if (parseInt(digit) > 0) return index;
        });
        return informedAmount.slice(indexInitialAmout);
    }

    public getBarCode() {
        let boleto = this.value;
        boleto = this.cleanBoleto(boleto);
        return this.getBlockFromDigitableLine(boleto, this.CHECK_GENERAL_DIGITS_POSITION);
    }

    private validate(boleto: string) {
        if (!boleto) {
            this.errorMessage = 'Uninformed typeable line!';
            return false;
        }
        boleto = this.cleanBoleto(boleto);
        if (!this.isValidLength(boleto)) {
            this.errorMessage = 'Invalid typeable Line Size!';
            return false;
        }
        this.prepareBoletoValidate(boleto);
        if (!this.isValidDigits(boleto)) {
            this.errorMessage = 'Typeable line has invalid characters!';
            return false;
        }
        if (this.hasAllDigitsEquals(boleto)) {
            this.errorMessage = 'Typeable line has a sequence of equal digits!';
            return false;
        }
        if (this.typeDigitableLine === 'covenant') {
            const checkGeneralDigit = this.calculateCheckDigit(boleto, this.CHECK_GENERAL_DIGITS_POSITION);
            const generalDigitInformed = this.getBlockFromDigitableLine(boleto, this.INFORMED_GENERAL_DIGIT);
            if (checkGeneralDigit !== parseInt(generalDigitInformed)) {
                this.errorMessage = 'The general checker digit is invalid!';
                return false;
            }
        }
        const checkDigitField1 = this.calculateCheckDigit(boleto, this.DIGITS_FIELD1);
        const checkDigitField2 = this.calculateCheckDigit(boleto, this.DIGITS_FIELD2);
        const checkDigitField3 = this.calculateCheckDigit(boleto, this.DIGITS_FIELD3);
        const digitInformed1 = this.getBlockFromDigitableLine(boleto, this.INFORMED_DIGIT1);
        const digitInformed2 = this.getBlockFromDigitableLine(boleto, this.INFORMED_DIGIT2);
        const digitInformed3 = this.getBlockFromDigitableLine(boleto, this.INFORMED_DIGIT3);
        if (checkDigitField1 !== parseInt(digitInformed1)) {
            this.errorMessage = 'The first field checker digit is invalid!';
            return false;
        }
        if (checkDigitField2 !== parseInt(digitInformed2)) {
            this.errorMessage = 'The second field checker digit is invalid!';
            return false;
        }
        if (checkDigitField3 !== parseInt(digitInformed3)) {
            this.errorMessage = 'The third field checker digit is invalid!';
            return false;
        } 
        if (this.typeDigitableLine === 'covenant') {
            const checkDigitField4 = this.calculateCheckDigit(boleto, this.DIGITS_FIELD4); 
            const digitInformed4 = this.getBlockFromDigitableLine(boleto, this.INFORMED_DIGIT4);
            if (checkDigitField4 !== parseInt(digitInformed4)) {
                this.errorMessage = 'The fourth field checker digit is invalid!';
                return false;
            }
            return true;
        }       
        const checkGeneralDigit = this.calculateCheckGeneralDigit(boleto);
        const generalDigitInformed = this.getBlockFromDigitableLine(boleto, this.INFORMED_GENERAL_DIGIT);
        if (checkGeneralDigit !== parseInt(generalDigitInformed)) {
            this.errorMessage = 'The general checker digit is invalid!';
            return false;
        }
        return true;
    }

    private cleanBoleto(boleto: string) {
        return boleto.replace(/[\.]/g, '');
    }

    private isValidLength(boleto: string) {
        if (boleto.length === 48) this.typeDigitableLine = 'covenant'; 
        return boleto.length === this.TOTAL_DIGITS_BOLETO || boleto.length === this.TOTAL_DIGITS_COVENANT;
    }

    private prepareBoletoValidate(boleto: string) {
        if (this.typeDigitableLine === 'boleto') {
            this.DIGITS_FIELD1 = [0, 1, 2];
            this.DIGITS_FIELD2 = [4];
            this.DIGITS_FIELD3 = [6];
            this.INFORMED_DIGIT1 = [3];
            this.INFORMED_DIGIT2 = [5];
            this.INFORMED_DIGIT3 = [7];
            this.INFORMED_GENERAL_DIGIT = [8];
            this.DIGITABLE_LINE_BLOCKS = [[0, 3], [3, 4], [4, 9], [9, 10], [10, 20], [20, 21], [21, 31], [31, 32], [32, 33], [33, 37], [37, 47]];
            this.CHECK_GENERAL_DIGITS_POSITION = [0, 1, 9, 10, 2, 4, 6];
            this.INFORMED_AMOUNT = [10];
            this.INFORMED_DATE_FACTOR = [9];
        } 
        if (this.typeDigitableLine === 'covenant') {
            this.DIGITS_FIELD1 = [0, 1, 2, 3, 4];
            this.DIGITS_FIELD2 = [6];
            this.DIGITS_FIELD3 = [8];
            this.DIGITS_FIELD4 = [10];
            this.INFORMED_DIGIT1 = [5];
            this.INFORMED_DIGIT2 = [7];
            this.INFORMED_DIGIT3 = [9];
            this.INFORMED_DIGIT4 = [11]; 
            this.INFORMED_GENERAL_DIGIT = [3];
            this.DIGITABLE_LINE_BLOCKS = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 11], [11, 12], [12, 23], [23, 24], [24, 35], [35, 36], [36, 47], [47, 48],[12, 16], [20, 23], [24, 29]]; 
            this.CHECK_GENERAL_DIGITS_POSITION = [0, 1, 2, 4, 6, 8, 10]; 
            this.INFORMED_AMOUNT = [4, 12];
            this.INFORMED_DATE_FACTOR = [13, 14];
        }
    }

    private isValidDigits(boleto: string) {
        return [...boleto].every(digit => isNaN(parseInt(digit)) !== true);
    }

    private hasAllDigitsEquals(boleto: string) {
        const [firstDigit] = boleto;
        return [...boleto].every(digit => digit === firstDigit);
    }

    private calculateCheckDigit(boleto: string, position: number[]) {
        const digitableLineBlocks = this.getBlockFromDigitableLine(boleto, position);
        let calculate = 0;
        let multiplier = 2;
        let total = 0;
        for (const digit of [...digitableLineBlocks].reverse()) {
            calculate = parseInt(digit) * multiplier;
            if (calculate > 9) calculate = (calculate % 10) + 1;
            total += calculate;
            multiplier = multiplier == 2 ? 1 : 2;
        }
        const rest = total % 10;
        const digit = (rest == 0) ? rest : 10 - rest;
        return digit;
    }

    private getBlockFromDigitableLine(boleto: string, positions: number[]) {
        const blocks = [];
        for (const block of this.DIGITABLE_LINE_BLOCKS) {
            blocks.push(boleto.slice(block[0], block[1]));  
        }    
        let digitsInBlock = '';
        for (const position of positions) {
            digitsInBlock += blocks[position];
        }
        return digitsInBlock;
    }

    private calculateCheckGeneralDigit(boleto: string) {
        const positions = this.CHECK_GENERAL_DIGITS_POSITION;
        const digitableLineBlocks = this.getBlockFromDigitableLine(boleto, positions);        
        let total = 0;
        let multiplier = 2;
        for (const digit of [...digitableLineBlocks].reverse()) {
	        total += parseInt(digit) * multiplier;	
            multiplier++;
            if (multiplier > 9) multiplier = 2;
        }
        const rest = total % 11;
        const digit = 11 - rest;
        return (digit > 0 && digit < 10) ? digit : 1;
    }
}