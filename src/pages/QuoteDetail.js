import { Fragment, useEffect } from "react";
import { useParams, useRouteMatch, Route, Link } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HightlightedQuote from "../components/quotes/HighlightedQuote";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHTTP from "../hooks/useHTTP";
import { getSingleQuote } from "../lib/api";

const QuoteDetail = () => {
    const {
        sendRequest,
        status,
        data: currentQuote,
        error,
    } = useHTTP(getSingleQuote, true);
    const params = useParams();
    const match = useRouteMatch();

    useEffect(() => {
        sendRequest(params.quoteId);
    }, [sendRequest, params.quoteId]);

    if (status === "pending") {
        return (
            <div className="centered">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return <p className="center focused">{error}</p>;
    }

    if (status === "completed" && !currentQuote.text) {
        return <NoQuotesFound />;
    }

    return (
        <Fragment>
            <HightlightedQuote
                text={currentQuote.text}
                author={currentQuote.author}
            />
            <Route path={`${match.path}`} exact>
                <div className="centered">
                    <Link to={`${match.url}/comments`} className="btn--flat">
                        Load comments
                    </Link>
                </div>
            </Route>
            <Route path={`${match.path}/comments`}>
                <Comments />
            </Route>
        </Fragment>
    );
};

export default QuoteDetail;
