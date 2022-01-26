import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";

import likeIcon from "../../icons/like.png";
import dislikeIcon from "../../icons/dislike.png";

function MovieList() {
    const [movies, setMovies] = useState([]);
    const [searchMovie, setSeachMovie] = useState("");

    useEffect(() => {
        fetch(`http://localhost:8080/feed/posts`)
            .then((res) => res.json())
            .then((data) => {
                setMovies(data.posts);

            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    function filterMovies() {
        fetch(`http://localhost:8080/feed/postsSorted`)
            .then((res) => res.json())
            .then((data) => {
                setMovies(data.posts);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    function getMovie() {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: "City of God" }),
        };

        fetch(`http://localhost:8080/feed/post`, requestOptions)
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    movies: data.posts,
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    function detectChange() {
        let searchMovieName =
            document.getElementById("exampleInputAmount").value;
        setSeachMovie(searchMovieName);
    }

    function searchAction() {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: searchMovie }),
        };

        fetch(`http://localhost:8080/feed/post`, requestOptions)
            .then((res) => res.json())
            .then((data) => {
                setMovies([data.post]);
            })
            .catch((err) => {
                alert('Movie not found.')
                console.error(err);
            });
    }

    return (
        <div>
            <section className="fullscreen_bg">
                <Header />
                <section className="container">
                    <section className="input-group searchContainer">
                        <input
                            type="text"
                            className="form-control"
                            value={searchMovie}
                            onChange={detectChange}
                            id="exampleInputAmount"
                            placeholder="Search Movie "
                        />
                        <div
                            className="input-group-addon searchbtn"
                            onClick={searchAction}
                        >
                            {" "}
                            <i className="glyphicon glyphicon-search"></i>{" "}
                            Search
                        </div>
                    </section>
                    <button className="filterButton" onClick={filterMovies}>
                        Top 10 Movies
                    </button>
                    <div className="row movieList display-flex">
                        {movies.map((res, key) => {
                            return (
                                <div
                                    className="col-xs-6 col-md-4 movieBlock"
                                    key={key}
                                >
                                    <div className="panel panel-success">
                                        <div className="panel-heading">
                                            <h2 className="panel-title">
                                                {res.name}
                                            </h2>
                                        </div>
                                        <div className="panel-body">
                                            <img
                                                alt={res.name}
                                                src={res.moviePoster}
                                                className="img-responsive"
                                            />
                                        </div>
                                        <div className="panel-footer text-center">
                                            <h3 className="panel-title">
                                                Genre:{res.genre}
                                            </h3>
                                            <div className="votesBlocks">
                                                <button
                                                  
                                                    className="voteBack"
                                                >
                                                    <img
                                                        className="votesBlocks"
                                                        src={likeIcon}
                                                        alt="Upvotes"
                                                        width="30px"
                                                        title="Upvotes"
                                                    />
                                                </button>
                                                <h3
                                                    id="upvoteId"
                                                    className="votesBlocks"
                                                >
                                                    {res.upvote}
                                                </h3>
                                            </div>
                                            <div
                                                className="votesBlocks"
                                                style={{ margin: "0px 30px" }}
                                            >
                                                <button
                                               
                                                    className="voteBack"
                                                >
                                                    <img
                                                        className="votesBlocks"
                                                        src={dislikeIcon}
                                                        alt="Downvotes"
                                                        width="30px"
                                                        title="Downvotes"
                                                    />
                                                </button>
                                                <h3
                                                    id="downvoteId"
                                                    className="votesBlocks"
                                                >
                                                    {res.downvote}
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="panel-footer text-center">
                                            <Link to={"/post/" + res._id}>
                                                <button className="btn btn-success btn-block">
                                                    {" "}
                                                    View Detail{" "}
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
                <Footer />
            </section>
        </div>
    );
}
export default MovieList;
