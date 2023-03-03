import firebase_admin
from firebase_admin import credentials, firestore, storage

cred = credentials.Certificate("./secretkey.json")
print("Running")
app = firebase_admin.initialize_app(cred,{'storageBucket':'remotepepejobs.appspot.com'})
firestore_client = firestore.client()
