import bcrypt from "bcryptjs";
import { Result } from "pg";

const hashPassword = async (plainPassword: string) => {

    return await bcrypt.hash(plainPassword, 10);

}


const compareHash = async (plainPassword: string, hashPassword: string) => {

    return await bcrypt.compare(plainPassword, hashPassword);

}


export const passwordHelper = {
    hashPassword,
    compareHash,
}