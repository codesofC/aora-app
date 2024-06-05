import { Account, Avatars, Client, Databases, ID, Permission, Query, Storage } from 'react-native-appwrite';

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
const storage = new Storage(client)

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
        const allPosts = await databases.listDocuments(databaseId, videoCollectionId, [Query.orderDesc('$createdAt')])

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

// Get the data of query search
export const getSearchQuery = async (query) => {
    try {
        const allPosts = await databases.listDocuments(databaseId, videoCollectionId, [Query.search('title', query)])

        return allPosts.documents;
    } catch (error) {
        throw new Error(error)
    }
}

//Get the user profile posts
export const getUsersPosts = async (userId) => {
    try {
        const allPosts = await databases.listDocuments(databaseId, videoCollectionId, [Query.equal("creator", userId.toString())])

        return allPosts.documents;
    } catch (error) {
        throw new Error(error)
    }
}
// Logout fn
export const singOut = async () => {
    try {
        const session = await account.deleteSession("current")

        return session
    } catch (error) {
        throw new Error(error)
    }
}

export const getFilePreview = async (fileId, type) => {

    let fileUrl;

    try {
        if (type === 'video') {
            fileUrl = storage.getFileView(storageId, fileId)
        } else if (type === 'image') {
            fileUrl = storage.getFilePreview(storageId, fileId, 2000, 2000, "top", 100)
        } else {
            throw new Error('Tipo de arquivo invalido!')
        }

        if (!fileUrl) throw Error;

        return fileUrl
    } catch (error) {
        throw new Error(error)
    }

}

export const uploadFile = async (file, type) => {
    if (!file) return;

    const asset = {
        name: file.fileName,
        type: file.mimeType,
        size: file.fileSize,
        uri: file.uri,
    }

    try {
        const uploadedFile = await storage.createFile(
            storageId,
            ID.unique(),
            asset
        )

        const fileUrl = await getFilePreview(uploadedFile.$id, type)

        return fileUrl
    } catch (error) {
        throw new Error(error)
    }
}

//Create a new video
export const createVideo = async (form) => {
    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, 'image'),
            uploadFile(form.video, 'video')
        ])

        const newPost = await databases.createDocument(
            databaseId,
            videoCollectionId,
            ID.unique(),
            {
                title: form.title,
                prompt: form.prompt,
                thumbnail: thumbnailUrl,
                video: videoUrl,
                creator: form.userId
            }
        )

        return newPost;
    } catch (error) {
        throw new Error(error)
    }
}

export const SavedVideo = async (documentId, data) => {
    try {
        const result = await databases.updateDocument(
            databaseId, // databaseId
            videoCollectionId, // collectionId
            documentId, // documentId
            data, // data (optional)
            [Permission.update("users")]
        );

        return result
    } catch (error) {
        throw new Error(error)
    }
}