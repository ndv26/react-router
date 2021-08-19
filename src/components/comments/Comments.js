import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import classes from "./Comments.module.css";
import useHTTP from "../../hooks/useHTTP";
import { getAllComments } from "../../lib/api";
import NewCommentForm from "./NewCommentForm";
import CommentList from "./CommentList";
import LoadingSpinner from "../UI/LoadingSpinner";

const Comments = () => {
    const [isAddingComment, setIsAddingComment] = useState(false);
    const params = useParams();
    const {
        sendRequest,
        data: loadedComments,
        status,
    } = useHTTP(getAllComments);

    const { quoteId } = params;

    useEffect(() => {
        sendRequest(quoteId);
    }, [quoteId, sendRequest]);

    const startAddCommentHandler = () => {
        setIsAddingComment(true);
    };

    const addedCommentHandler = useCallback(() => {
        sendRequest(quoteId);
    }, [sendRequest, quoteId]);

    let comments;

    if (status === "pending") {
        comments = (
            <div className="centered">
                <LoadingSpinner />
            </div>
        );
    }

    if (
        status === "completed" &&
        (loadedComments || loadedComments.length > 0)
    ) {
        comments = <CommentList comments={loadedComments} />;
    }

    if (
        status === "completed" &&
        (loadedComments.length === 0 || !loadedComments)
    ) {
        comments = <p>No comments found.</p>;
    }

    return (
        <section className={classes.comments}>
            <h2>User Comments</h2>
            {!isAddingComment && (
                <button className="btn" onClick={startAddCommentHandler}>
                    Add a Comment
                </button>
            )}
            {isAddingComment && (
                <NewCommentForm
                    quoteId={params.quoteId}
                    onAddedComment={addedCommentHandler}
                />
            )}
            {comments}
        </section>
    );
};

export default Comments;
