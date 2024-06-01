import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';

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
const avatars = new Avatars(client);
const databases = new Databases(client)

//Destructuring

const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    videoCollectionId,
    storageId,
} = appwriteConfig


export const signUpUser = async (username, email, password) => {

    // Register User
    await account.create(ID.unique(), email, password, username)
        .then(function (response) {
            const avatarUrl = avatars.getInitials(username)

            signIn(email, password);

            const newUser = databases.createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.userCollectionId,
                ID.unique(),
                {
                    accountId: response.$id,
                    email,
                    username,
                    avatar: avatarUrl
                }
            )

            return newUser
        })
        .catch(err => {
            console.log(err);
            throw new Error(err)
        })
}

export const signIn = async (email, password) => {

    try {

        const session = await account.createEmailPasswordSession(email, password)

        return session
    } catch (error) {
        console.log(error);
        throw new Error(error)
    }

}

export const getCurrentUser = async () => {

    try {
        const currentAccount = await account.get();

        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        )

        if (!currentUser) throw Error;

        return currentUser.documents[0]
    } catch (error) {
        console.log(error);
    }
}

//Get All the post withs videos
export const getAllPosts = async () => {
    try {
        const allPosts = await databases.listDocuments(databaseId, videoCollectionId)

        return allPosts.documents;
    } catch (error) {
        throw new Error(error)
    }
}

//Get All the post withs videos
export const getLatestPosts = async () => {
    try {
        const allPosts = await databases.listDocuments(databaseId, videoCollectionId, [Query.orderDesc('$createdAt', Query.limit(7))])

        return allPosts.documents;
    } catch (error) {
        throw new Error(error)
    }
}