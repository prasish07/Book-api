import bcrypt from 'bcryptjs';

export const comparePassword = async function(password:string,passwordBcrypt:string):Promise<boolean>{
    const isMatch = await bcrypt.compare(password,passwordBcrypt);
    return isMatch;
}