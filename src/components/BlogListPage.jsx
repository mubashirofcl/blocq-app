import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 

function HeroSection() {
    return (
        <div className="hero-section">
            <div className="hero-info">
                <div>EXPLORE A WORLD OF IDEAS, STORIES, AND INSIGHTS</div>
                <div>YOUR DAILY SOURCE FOR NEWS, ARTICLES, AND COMMENTARY</div>
                <div>FROM CURIOUS READERS TO PASSIONATE WRITERS</div>
            </div>
            <div className="hero-title">BLOGS</div>
        </div>
    );
}

function AddPostCard() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleAddNew = () => {
        if (user) {
            navigate("/add");
        } else {
            navigate("/login");
        }
    };

    return (
        <div className="bottom-section">
            <div className="bottom-content">
                <div className="bottom-text">
                    <h2>ADD A POST</h2>
                    <p>
                        HAVE A STORY TO SHARE OR AN IDEA TO EXPLORE? CLICK THE BUTTON TO
                        START WRITING AND PUBLISH YOUR OWN ARTICLE.
                    </p>
                </div>
                <button onClick={handleAddNew} className="bottom-cta">
                    ADD NEW
                </button>
            </div>
        </div>
    );
}

function BlogCard({ post, user, onEdit, onRemove }) {
    const isOwner = user && post.authorId && user.uid === post.authorId;

    return (
        <div className="blog-slider">
            <div className="blog-slider__wrp">
                <div className="blog-slider__item">
                    <div className="blog-slider__img">
                        <img src={post.img} alt={post.title} />
                    </div>
                    <div className="blog-slider__content">
                        <span className="blog-slider__code">{post.date}</span>
                        <div className="blog-slider__title">{post.title}</div>
                        <div className="blog-slider__text">{post.text}</div>

                        {isOwner && (
                            <div className="blog-slider__buttons">
                                <button className="blog-button btn-edit" onClick={() => onEdit(post.id)}>
                                    Edit
                                </button>
                                <button className="blog-button btn-remove" onClick={() => onRemove(post.id)}>
                                    Remove
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- Blog Feed (on Blog List Page) ---
export default function BlogListPage() {
    const { user } = useAuth();
    const navigate = useNavigate();

    // Dummy data for blog posts.
    // NOTE: add `authorId: "<some-uid>"` to a post to test Edit/Delete visibility.
    const posts = [
        {
            id: "p1",
            // authorId: "uid_abc123", // <-- add this equal to your test user uid to see owner buttons
            date: "10 November 2025",
            title: "My First Blog Post",
            text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae voluptate repellendus magni illo ea animi?",
            img: "https://via.placeholder.com/800x600/111111/FFFFFF?text=Blog+Image+1"
        },
        {
            id: "p2",
            // authorId: "uid_xyz789",
            date: "11 November 2025",
            title: "The Art of Writing",
            text: "Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
            img: "https://via.placeholder.com/800x600/222222/FFFFFF?text=Blog+Image+2"
        },
        {
            id: "p3",
            // authorId: "uid_abc123",
            date: "12 November 2025",
            title: "Creative Inspiration",
            text: "Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci.",
            img: "https://via.placeholder.com/800x600/111111/FFFFFF?text=Blog+Image+3"
        },
        {
            id: "p4",
            // authorId: "uid_other",
            date: "13 November 2025",
            title: "Tech Trends in 2025",
            text: "Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam.",
            img: "https://via.placeholder.com/800x600/222222/FFFFFF?text=Blog+Image+4"
        }
    ];

    function handleEdit(id) {
        navigate(`/edit/${id}`);
    }

    function handleRemove(id) {
        if (!confirm("Delete this post? This cannot be undone.")) return;
        // Replace with your deletePost service when wired:
        // import { deletePost } from "../services/postsService";
        // deletePost(id).catch(err => alert(err.message));
        alert(`call delete handler for id: ${id} — replace with deletePost(id)`);
    }

    return (
        <>
            <HeroSection />
            <AddPostCard />
            <hr className="divider" />
            <section className="blog-feed">
                <div className="blog-title">
                    <h2>LATEST BLOGS</h2>
                    <p>
                        A SPACE FOR INSIGHTFUL ARTICLES, IDEAS, AND UPDATES. <br />
                        EXPLORE A WIDE RANGE OF TOPICS AND STAY INFORMED WITH FRESH, WELL-CURATED CONTENT.
                    </p>
                </div>

                <div style={{ paddingTop: "3rem", width: "100%" }}>
                    {posts.map((post) => (
                        <BlogCard key={post.id} post={post} user={user} onEdit={handleEdit} onRemove={handleRemove} />
                    ))}
                </div>
            </section>
        </>
    );
}
