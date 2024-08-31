import "server-only"
import * as admin from "firebase-admin"

if (!admin.apps.lengh) {
    admin.initializeApp({
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        client_email:process.env.FIREBASE_CLIENT_EMAIL,
      
});
   
    }


export default admin