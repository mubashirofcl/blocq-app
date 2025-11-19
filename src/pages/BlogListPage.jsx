import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { subscribeToPosts, deletePost } from "../services/postsService";
import Swal from "sweetalert2";
import defaultUser from "../assets/user.png";
import { useLoader } from "../context/LoaderContext";


export default function BlogListPage() {
    const [posts, setPosts] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate();
    const [deletingId, setDeletingId] = useState(null);
    const { setLoading } = useLoader();


    useEffect(() => {
        setLoading(true);

        const unsub = subscribeToPosts((postsData) => {
            setPosts(postsData);
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        });

        return () => unsub && unsub();
    }, []);


    function handleAddNew() {
        if (user) navigate("/add");
        else navigate("/login");
    }

    function formatDateTime(dateOrTs) {
        if (!dateOrTs) return "";
        const d = dateOrTs instanceof Date ? dateOrTs : (dateOrTs.toDate ? dateOrTs.toDate() : new Date(dateOrTs));
        if (isNaN(d.getTime())) return "";
        return d.toLocaleString(undefined, {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "numeric",
            minute: "2-digit"
        });
    }

    async function handleRemove(id) {
        const result = await Swal.fire({
            title: "Delete Post?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",

            background: "#ffffff",
            color: "#000",
            confirmButtonColor: "#000",
            cancelButtonColor: "#555",
            buttonsStyling: true,

            customClass: {
                popup: "rounded-xl shadow-lg",
                confirmButton: "rounded-lg px-5 py-2",
                cancelButton: "rounded-lg px-5 py-2",
            },
        });

        if (!result.isConfirmed) return;

        try {
            setDeletingId(id);
            await deletePost(id);

            Swal.fire({
                title: "Deleted!",
                text: "The post has been removed.",
                icon: "success",
                timer: 1200,
                showConfirmButton: false,
                background: "#ffffff",
                color: "#000"
            });

        } catch (err) {
            console.error("Delete failed:", err);

            Swal.fire({
                title: "Error",
                text: err.message || "Delete failed",
                icon: "error",
                background: "#ffffff",
                color: "#000"
            });

        } finally {
            setDeletingId(null);
        }
    }


    return (
        <>
            <div className="hero-section px-6 md:px-12">
                <div className="hero-info space-y-2 text-sm md:text-base text-[var(--muted)]">
                    <div>EXPLORE A WORLD OF IDEAS, STORIES, AND INSIGHTS</div>
                    <div>YOUR DAILY SOURCE FOR NEWS, ARTICLES, AND COMMENTARY</div>
                    <div>FROM CURIOUS READERS TO PASSIONATE WRITERS</div>
                </div>
                <div className="hero-title">BLOGS</div>
            </div>

            <div className="bottom-section px-4 md:px-12">
                <div className="bottom-content max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="bottom-text">
                        <h2 className="text-xl font-semibold">ADD A POST</h2>
                        <p className="text-[var(--muted)] mt-1">
                            HAVE A STORY TO SHARE OR AN IDEA TO EXPLORE? CLICK THE BUTTON TO START WRITING AND PUBLISH YOUR OWN ARTICLE.
                        </p>
                    </div>

                    <button onClick={handleAddNew} className="bottom-cta">
                        ADD NEW
                    </button>
                </div>
            </div>

            <hr className="divider border-t border-[#222] my-6" />

            <section className="blog-feed px-6 md:px-12">
                <div className="blog-title max-w-5xl mx-auto">
                    <h2 className="text-2xl font-bold mb-1">LATEST BLOGS</h2>
                    <p className="text-[var(--muted)]">
                        A SPACE FOR INSIGHTFUL ARTICLES, IDEAS, AND UPDATES.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto mt-6 space-y-6">
                    {posts.length === 0 ? (
                        <p className="text-[var(--muted)]">No posts yet — be the first to publish.</p>
                    ) : (
                        posts.map((p) => {
                            const isOwner = user && p.authorId && user.uid === p.authorId;

                            return (
                                <article key={p.id} className="blog-slider mt-6">
                                    <div className="blog-slider__wrp">

                                        <div className={`blog-slider__item ${!p.imageUrl ? 'no-image' : ''}`}>

                                            {p.imageUrl ? (
                                                <div className="blog-slider__img">
                                                    <img
                                                        src={p.imageUrl}
                                                        alt={p.title}
                                                        onError={(e) => {

                                                            const container = e.currentTarget.parentElement;
                                                            if (container) container.style.display = "none";


                                                            const item = e.currentTarget.closest('.blog-slider__item');
                                                            if (item) item.classList.add('no-image');
                                                        }}
                                                    />
                                                </div>
                                            ) : null}

                                            <div className="blog-slider__content">

                                                <div className="blog-slider__title">{p.title}</div>

                                                <div className="blog-slider__text mt-2">{p.content}</div>

                                                <div className="flex items-center gap-3 mt-4">
                                                    <img
                                                        src={p.authorPhoto || defaultUser}
                                                        alt={p.authorName || "Author"}
                                                        className="authorImg rounded-full object-cover"
                                                        onError={(e) => { e.currentTarget.src = defaultUser; }}
                                                    />
                                                    <div className="flex flex-col text-sm">
                                                        <span className="authorName text-white text-sm">{p.authorEmail || "Unknown Author"}</span>

                                                    </div>
                                                    <span className="date ml-auto text-[var(--muted)] text-sm">
                                                        {p.createdAt ? formatDateTime(p.createdAt) : ""}
                                                    </span>
                                                </div>

                                                {isOwner && (
                                                    <div className="blog-slider__buttons mt-4">
                                                        <button className="blog-slider__button btn-edit" onClick={() => navigate(`/edit/${p.id}`)}>Edit</button>
                                                        <button className="blog-slider__button btn-remove" onClick={() => handleRemove(p.id)} disabled={deletingId === p.id}>
                                                            {deletingId === p.id ? "Deleting..." : "Remove"}
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            );
                        })
                    )}
                </div>
            </section>
        </>
    );
}
