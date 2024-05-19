import { Account, Client, ID } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.codesofC.aora",
    projectId: "663d7636000fa8102c2e",
    databaseId: "663d78c100180e7d2ee2",
    userCollectionId: "663d7ec7001e089b5f62",
    videoCollectionId: "663d7f3a001868772a03",
    storageId: "663d83cc00102f56933d"
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // My Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // My project ID
    .setPlatform(appwriteConfig.platform) // My application ID or bundle ID.
    ;

const account = new Account(client);

export const signUpUser = (username, email, password) => {

    // Register User
    account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe')
        .then(function (response) {
            console.log(response);
        }, function (error) {
            console.log(error);
        });
}
