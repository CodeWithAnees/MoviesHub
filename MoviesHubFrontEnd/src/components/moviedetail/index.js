import React, { useEffect, useState } from "react";
import Header from "../header";
import Footer from "../footer";

import likeIcon from "../../icons/like.png";
import dislikeIcon from "../../icons/dislike.png";

function MovieDetail(props) {
    const [movie, setMovie] = useState({});
    const movieId = props.match.params.movieId;
    const [validMovieId, setValidMovieId] = useState(false);

    useEffect(() => {
        console.log(movieId);

        fetch(`http://localhost:8080/feed/post/${movieId}`)
            .then((res) => res.json())
            .then((data) => {
                setMovie(data.post);
                setValidMovieId(true);
            })
            .catch((err) => {
                console.error(err);
                this.setState({
                    validMovieId: false,
                });
            });
    }, []);

    async function getUpvote() {
        let up = document.getElementById("upvoteId").innerHTML;
        let numUp = parseInt(up);
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ upvote: numUp + 1 }),
        };
        await fetch(
            `http://localhost:8080/feed/post/${movieId}`,
            requestOptions
        )
            .then((res) => res.json())
            .then((data) => {
                setMovie(data.post);
                setValidMovieId(true);
            })
            .catch((err) => {
                console.error(err);
            });
        console.log("laod sdfsdfsdf");
    }

    async function getDownvote() {
        let up = document.getElementById("downvoteId").innerHTML;
        let numUp = parseInt(up);
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ downvote: numUp + 1 }),
        };
        await fetch(
            `http://localhost:8080/feed/postDown/${movieId}`,
            requestOptions
        )
            .then((res) => res.json())
            .then((data) => {
                setMovie(data.post);
                setValidMovieId(true);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    console.log(movie);
    return (
        <div>
            <section className="fullscreen_bg">
                <Header />
                <div className="container" style={{color: '#a9a3a3'}}>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <img
                            src={movie.moviePoster}
                            alt={movie.name}
                            className="img-responsive"
                        />
                    </div>
                    <div className="col-md-8 col-sm-6 col-xs-12">
                        <div>
                            <div className="row">
                                <div className="col-xs-12">
                                    <h1 className="text-left">{movie.name}</h1>
                                    <h3>Details : {movie.details}</h3>
                                </div>
                                <div className="col-xs-12">
                                    <h3>Genre : {movie.genre}</h3>
                                </div>
                                <div className="col-xs-12">
                                    <h3>Released : {movie.release_date}</h3>
                                </div>
                                <div className="col-xs-12">
                                    <h3>Reviews : {movie.reviews}</h3>
                                </div>
                                <div className="col-xs-12">
                                    <div className="votesBlocks">
                                        <button onClick={getUpvote}  className="voteBack">
                                            <img  className="votesBlocks"
                                                src={likeIcon}
                                                alt="Upvotes"
                                                width="40px"
                                                title="Upvotes"
                                            />
                                        </button>
                                        <h3 id="upvoteId"  className="votesBlocks">{movie.upvote}</h3>
                                    </div>
                                    <div className="votesBlocks" style={{margin: "0px 30px"}}>
                                        <button onClick={getDownvote} className="voteBack">
                                            <img  className="votesBlocks"
                                                src={dislikeIcon}
                                                alt="Downvotes"
                                                width="40px"
                                                title="Downvotes"
                                            />
                                        </button>
                                        <h3 id="downvoteId"  className="votesBlocks">
                                            {movie.downvote}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </section>
        </div>
    );
}

export default MovieDetail;
