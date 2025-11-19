import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { getPost, updatePost } from "../services/postsService";
import { useLoader } from "../context/LoaderContext";

export default function EditBlogPage() {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm();

    const { loading, setLoading } = useLoader();

    useEffect(() => {
        let mounted = true;

        async function load() {
            try {
                setLoading(true);

                const data = await getPost(id);
                if (!mounted) return;

                if (!data) {
                    alert("Post not found");
                    navigate("/blogs");
                    return;
                }

                if (!user) {
                    navigate("/login");
                    return;
                }

                if (data.authorId !== user.uid) {
                    alert("You don't have permission to edit this post");
                    navigate("/blogs");
                    return;
                }

                setValue("title", data.title || "");
                setValue("imageUrl", data.imageUrl || "");
                setValue("content", data.content || "");

                setTimeout(() => setLoading(false), 300);

            } catch (err) {
                console.error("Failed to load post:", err);
                alert("Failed to load post");
                navigate("/blogs");
            }
        }

        load();

        return () => {
            mounted = false;
        };
    }, [id, user, navigate, setValue]);

    async function onSubmit(values) {
        try {
            setLoading(true);

            await updatePost(id, {
                title: values.title.trim(),
                imageUrl: values.imageUrl?.trim() || "",
                content: values.content.trim()
            });

            setTimeout(() => {
                setLoading(false);
                navigate("/blogs", { replace: true });
            }, 350);

        } catch (err) {
            console.error("Update failed:", err);
            alert(err.message || "Failed to update");
            setLoading(false);
        }
    }

    return (
        <div className="form-container">
            <div className="form-box large-form-box">
                <h2>Edit Post</h2>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="form-group">
                        <label>Title</label>
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
                        {errors.title && <p style={{ color: "salmon" }}>{errors.title.message}</p>}
                    </div>

                    <div className="form-group">
                        <label>Image URL</label>
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
                        {errors.imageUrl && <p style={{ color: "salmon" }}>{errors.imageUrl.message}</p>}
                    </div>

                    <div className="form-group">
                        <label>Content</label>
                        <textarea
                            rows="10"
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
                        {errors.content && <p style={{ color: "salmon" }}>{errors.content.message}</p>}
                    </div>

                    <button type="submit" className="form-button" disabled={isSubmitting}>
                        {isSubmitting ? "Updating..." : "Update Post"}
                    </button>
                </form>
            </div>
        </div>
    );
}
