import bcrypt from 'bcrypt';
const saltRounds = 10;
export async function hashPassword(password) {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
}
export async function comparePassword(password, hash) {
    const match = await bcrypt.compare(password, hash);
    return match;
}
//# sourceMappingURL=auth.js.map