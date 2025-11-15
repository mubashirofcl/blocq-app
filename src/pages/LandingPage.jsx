import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
    return (
        <>
            <div className="hero-section">
                <div className="hero-info">
                    <div>EXPLORE A WORLD OF IDEAS, STORIES, AND INSIGHTS</div>
                    <div>YOUR DAILY SOURCE FOR NEWS, ARTICLES, AND COMMENTARY</div>
                    <div>FROM CURIOUS READERS TO PASSIONATE WRITERS</div>
                </div>
                <div className="hero-title">BLOCQ</div>
            </div>

            <div className="bottom-section">
                <div className="bottom-content">
                    <div className="bottom-text">
                        <h2>Welcome to</h2>
                        <p>
                            <b>BLOCQ</b> , WHERE YOUR IDEAS, STORIES, AND VOICE COME ALIVE.
                        </p>
                    </div>
                    <Link to="/blogs" className="bottom-cta">View All Blogs</Link>
                </div>
            </div>
        </>
    );
}