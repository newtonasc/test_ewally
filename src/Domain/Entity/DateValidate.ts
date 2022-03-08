import Boleto from "./Boleto";

export default class DateValidate {
    private expireDate = new Date();
    private BASE_FACTOR = 1000;
    private CURRENT_BASE_DATE = new Date('2000-07-03 00:00');
    private LIMIT_CURRENT_BASE_DATE = new Date('2025-02-21 00:00');
    private BASE_DATE: Date;

    constructor (readonly value: string, readonly today?: Date) {
        this.BASE_DATE = this.setBaseDate();
        this.checkExpireDate();
    }

    public getExpireDate() {
        if (!this.checkExpireDate()) return false;
        return this.expireDate;
    }
   
    public isExpired(today = new Date()) {
        if (!this.getExpireDate()) return false;
        const expire = this.expireDate;
        return today.getTime() > expire.getTime();
    }

    private setBaseDate() {
        const currentDate = this.today || new Date();
        const newLimitBaseDate = new Date(this.LIMIT_CURRENT_BASE_DATE.valueOf());
        newLimitBaseDate.setDate(newLimitBaseDate.getDate() + 1);
        return (currentDate > this.LIMIT_CURRENT_BASE_DATE) ? newLimitBaseDate : this.CURRENT_BASE_DATE;
    }

    private checkExpireDate() {
        const boleto = new Boleto(this.value);
        const informedExpirationFactor = boleto.getDateFactor();
        if (informedExpirationFactor.length > 4) {
            const getExpireDate = new Date(`${informedExpirationFactor.slice(0,4)}-${informedExpirationFactor.slice(4,6)}-${informedExpirationFactor.slice(6,8)}`);            
            if (getExpireDate.toLocaleString('pt-BR') === 'Invalid Date') return false;
            this.expireDate = getExpireDate;
            return true;
        }
        if (informedExpirationFactor == '0000') return false;
        const getExpireDate = new Date(this.BASE_DATE);
        getExpireDate.setDate(getExpireDate.getDate() + parseInt(informedExpirationFactor) - this.BASE_FACTOR);        
        this.expireDate = getExpireDate;
        return true;
    }
}