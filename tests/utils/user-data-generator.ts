import { GLOBAL } from '../../config/global.config';


export function generateUserData(){
    const randomStr = Math.random().toString(36).substring(2, 15);
    return {
        email: `sampleUser${randomStr}@gmail.com`,
        password: `sample${randomStr}Password`
    }
}

