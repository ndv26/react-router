import { Fragment, useEffect } from "react";
import QuoteList from "../components/quotes/QuoteList";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import useHTTP from "../hooks/useHTTP";
import { getAllQuotes } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const AllQuotes = () => {
    const {
        sendRequest,
        data: quotes,
        status,
        error,
    } = useHTTP(getAllQuotes, true);

    useEffect(() => {
        sendRequest();
    }, [sendRequest]);

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

    if (status === "completed" && (!quotes || quotes.length === 0)) {
        return <NoQuotesFound />;
    }

    return (
        <Fragment>
            <QuoteList quotes={quotes} />
        </Fragment>
    );
};

export default AllQuotes;
