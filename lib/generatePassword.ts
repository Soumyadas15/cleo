export function generatePassword(): string {
    const specialChars = "!@#$%^&*";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";

    const allChars = specialChars + lowercaseChars + uppercaseChars + numbers;

    let password = "";

    password += getRandomChar(specialChars);
    password += getRandomChar(lowercaseChars);
    password += getRandomChar(uppercaseChars);
    password += getRandomChar(numbers);

    for (let i = 0; i < 6; i++) password += getRandomChar(allChars);
    password = shuffleString(password);

    return password;
}

function getRandomChar(characters: string): string {
    const index = Math.floor(Math.random() * characters.length);
    return characters.charAt(index);
}

function shuffleString(str: string): string {
    const array = str.split('');
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join('');
}