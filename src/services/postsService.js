import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDoc,
    serverTimestamp,
    query,
    orderBy,
    onSnapshot
} from "firebase/firestore";
import { db } from "../firebase";

const postsCol = collection(db, "posts");

function tsToDateIfNeeded(value) {
    if (!value) return null;
    if (typeof value.toDate === "function") return value.toDate();
    if (value instanceof Date) return value;
    const n = Number(value);
    if (!Number.isNaN(n)) return new Date(n);
    const parsed = new Date(value);
    return isNaN(parsed.getTime()) ? null : parsed;
}


// ADD POST

export async function addPost(postData, author) {
    if (!author) throw new Error("Not authenticated");

    const payload = {
        title: postData.title,
        content: postData.content,
        imageUrl: postData.imageUrl || null,
        authorId: author.uid,
        authorName: author.displayName || "Anonymous",
        authorEmail: author.email || null,
         authorPhoto: author.photoURL || null,
        createdAt: serverTimestamp()
    };

    const ref = await addDoc(postsCol, payload);
    return ref.id;
}


// GET POST

export async function getPost(id) {
    const ref = doc(db, "posts", id);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;

    const data = snap.data();
    return {
        id: snap.id,
        ...data,
        createdAt: tsToDateIfNeeded(data.createdAt),
        updatedAt: tsToDateIfNeeded(data.updatedAt)
    };
}


// UPDATE POST

export async function updatePost(id, postData) {
    const ref = doc(db, "posts", id);
    await updateDoc(ref, {
        ...postData,
        updatedAt: serverTimestamp()
    });
}

// DELETE POST

export async function deletePost(id) {
    const ref = doc(db, "posts", id);
    await deleteDoc(ref);
}

// REAL-TIME POSTS SUBSCRIPTION

export function subscribeToPosts(callback) {
    const q = query(postsCol, orderBy("createdAt", "desc"));

    return onSnapshot(q, (snap) => {
        const arr = snap.docs.map((d) => {
            const data = d.data();
            return {
                id: d.id,
                ...data,
                createdAt: tsToDateIfNeeded(data.createdAt),
                updatedAt: tsToDateIfNeeded(data.updatedAt)
            };
        });

        callback(arr);
    });
}
