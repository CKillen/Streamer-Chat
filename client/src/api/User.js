import axios from 'axios';
import config from '../config/config.js';
const userUrl = '/api/user';

const User = {
    oauth: (cb) => {
        axios.get(`${config.backendURL}${userUrl}/oauth`,{}).then(res => cb(res));
    }
}

export default User;
