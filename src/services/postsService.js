// src/services/postsService.js
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const postsCol = collection(db, "posts");

export async function addPost(postData, author) {
    // postData: { title, content, imageUrl? }
    // author: firebase user object (uid, displayName, email)
    if (!author) throw new Error("Not authenticated");
    const payload = {
        title: postData.title,
        content: postData.content,
        imageUrl: postData.imageUrl || null,
        authorId: author.uid,
        authorName: author.displayName || author.email || "Anonymous",
        createdAt: serverTimestamp()
    };
    const docRef = await addDoc(postsCol, payload);
    return docRef;
}
