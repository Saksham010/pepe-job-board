from firebaseConfig import firestore_client
from firebaseConfig import storage

# Data schema
data = {
    "position":"",
    "company": "",
    "email": "",
    "minimumSalary": "",
    "maximumSalary": "",
    "skills":[] , #Array of string
    "additionalSkills": [],  # Array of string
    "location": "",
    "type": "",
    "background": "",
    "jobDescription":"",
    "candidateTask":[], #Array of string
    "jobRequirement":[], #Array of string
    "benefits":[], #Array of string 
    "fileUrl":"",
    "applyUrl":""
}


# Data is scrapped

# Upload to firebase cloud storage
def uploadPicture():
    picture = "files/darkhunter.png"
    bucket = storage.bucket()
    blob = bucket.blob(picture)
    blob.upload_from_filename(picture)

    # Making url public
    blob.make_public()
    uploadedURL = blob.public_url
    
    #Updating the data schema
    data["fileUrl"] = uploadedURL

def uploadJob():
    data.map

# Upload to firebase cloud storage
uploadPicture()


print("Updated data: ",data)
# collectionRef = firestore_client.collection("Job")
# created_time, doc_ref = collectionRef.add({
#     "name":"Saksham",
#     "Type": "Testing"
# })

# print(f"{doc_ref} successfully created at {created_time}")

# def postFile(url):


# def postData():
#     print("Hello")


# Posting data to firebase
# postData()