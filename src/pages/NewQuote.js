import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import QuoteFrom from "../components/quotes/QuoteForm";
import useHTTP from "../hooks/useHTTP";
import { addQuote } from "../lib/api";

const NewQuote = () => {
    const { sendRequest, status } = useHTTP(addQuote);
    const history = useHistory();

    useEffect(() => {
        if (status === "completed") {
            history.push("/quotes");
        }
    }, [status, history]);

    const addNewQuoteHandler = (quoteData) => {
        sendRequest(quoteData);
        // redirect to all quotes page when adding a new quote
    };

    return (
        <QuoteFrom
            isLoading={status === "pending"}
            onAddQuote={addNewQuoteHandler}
        />
    );
};

export default NewQuote;
