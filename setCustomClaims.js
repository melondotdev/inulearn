const admin = require('firebase-admin');
const serviceAccount = require('../../../PrivateKeys/inulearn-firebase-adminsdk-wk0fm-b97cec5ec7.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function setCustomClaims(uid, role) {
  try {
    await admin.auth().setCustomUserClaims(uid, { role });
    console.log(`Custom claims set for user ${uid} with role ${role}`);
  } catch (error) {
    console.error('Error setting custom claims:', error);
  }
}

// Example usage: Replace 'USER_UID' with the actual UID of the teacher
setCustomClaims('qIo0UAR6nnWWU2B6f3VMINTsCWz2', 'teacher');
