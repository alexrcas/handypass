export default class PasswordGenerator {

    private static chars = 'abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    private static symbols = '@#!?$%&()^*';

    static newPassword(): string {
        let password = '';
        for (let i = 0; i < 12; i++) {
            password += this.randomChar();
            password += this.randomNumber();
            if (i % 4 == 0) {
                password += this.randomSymbol();
            }
        }
        return password;
    }

    private static randomChar(): string {
        return this.chars.split('')[Math.floor(Math.random() * this.chars.length)];
    }

    private static randomNumber(): string {
        return Math.floor(Math.random() * 10).toString()
    }

    private static randomSymbol(): string {
        return this.symbols.split('')[Math.floor(Math.random() * this.symbols.length)];
    }

}