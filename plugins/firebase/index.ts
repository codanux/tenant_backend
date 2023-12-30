import * as firebase from 'firebase-admin';
import config from './config';

firebase.initializeApp({
  credential: firebase.credential.cert(JSON.parse(JSON.stringify(config))),
});

export default firebase;