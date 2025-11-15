// src/pages/AddBlogPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";     // make sure path is correct
import { addPost } from "../services/postsService";    // service from above

export default function AddBlogPage() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // if user is not signed in, redirect to login
    useEffect(() => {
        if (!user) navigate("/login");
    }, [user, navigate]);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        // basic validation
        if (!title.trim() || !content.trim()) {
            setError("Please provide both title and content.");
            return;
        }

        setLoading(true);
        try {
            // call service which writes to Firestore
            await addPost({ title: title.trim(), content: content.trim(), imageUrl: imageUrl.trim() }, user);
            // success: navigate to blog list
            navigate("/blogs");
        } catch (err) {
            console.error("Add post failed:", err);
            setError(err.message || "Failed to publish post. Try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="form-container">
            <div className="form-box large-form-box">
                <h2>Create New Post</h2>

                {error && <p style={{ color: "salmon", marginBottom: 12 }}>{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Post Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Your amazing blog title"
                            className="form-input"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="imageUrl">Image URL (optional)</label>
                        <input
                            type="url"
                            id="imageUrl"
                            name="imageUrl"
                            placeholder="https://example.com/your-image.jpg"
                            className="form-input"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="content">What's on your mind?</label>
                        <textarea
                            id="content"
                            name="content"
                            rows="10"
                            placeholder="Write your story here..."
                            className="form-input"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            disabled={loading}
                        ></textarea>
                    </div>

                    <button type="submit" className="form-button" disabled={loading}>
                        {loading ? "Publishing..." : "Publish Post"}
                    </button>
                </form>
            </div>
        </div>
    );
}
