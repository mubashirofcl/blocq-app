import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { addPost } from "../services/postsService";


export default function AddBlogPage() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm({
        defaultValues: { title: "", imageUrl: "", content: "" }
    });

    useEffect(() => {
        if (!user) navigate("/login");
    }, [user, navigate]);

    async function onSubmit(data) {
        try {

            await addPost(
                {
                    title: data.title.trim(),
                    content: data.content.trim(),
                    imageUrl: data.imageUrl.trim() || ""
                },
                user
            );

            reset();
            navigate("/blogs");
        } catch (err) {
            console.error("addPost error:", err);
            alert(err.message || "Failed to publish post");
        }
    }

    return (
        <div className="form-container">
            <div className="form-box large-form-box">
                <h2>Create New Post</h2>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="form-group">
                        <label>Post Title</label>
                        <input
                            className="form-input"
                            {...register("title", {
                                required: "Title is required",
                                validate: {
                                    notEmpty: v => v.trim().length > 0 || "Title cannot be empty",
                                    minLength: v => v.trim().length >= 3 || "Title must be at least 3 characters"
                                }
                            })}
                            disabled={isSubmitting}
                        />
                        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                    </div>

                    <div className="form-group">
                        <label>Image URL (optional)</label>
                        <input
                            className="form-input"
                            {...register("imageUrl", {
                                validate: v =>
                                    v === "" ||
                                    /^https?:\/\/.+/i.test(v) ||
                                    "Enter a valid URL starting with http:// or https://"
                            })}
                            disabled={isSubmitting}
                        />
                        {errors.imageUrl && <p className="text-red-500">{errors.imageUrl.message}</p>}
                    </div>

                    <div className="form-group">
                        <label>Content</label>
                        <textarea
                            rows={10}
                            className="form-input"
                            {...register("content", {
                                required: "Content is required",
                                validate: {
                                    notEmpty: v => v.trim().length > 0 || "Content cannot be empty",
                                    minLength: v => v.trim().length >= 10 || "Content must be at least 10 characters"
                                }
                            })}
                            disabled={isSubmitting}
                        ></textarea>
                        {errors.content && <p className="text-red-500">{errors.content.message}</p>}
                    </div>

                    <button type="submit" className="form-button" disabled={isSubmitting}>
                        {isSubmitting ? "Publishing..." : "Publish Post"}
                    </button>

                </form>
            </div>
        </div>
    );
}
