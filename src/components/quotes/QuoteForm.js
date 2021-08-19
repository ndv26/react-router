import { useRef, useState, Fragment } from "react";
import { Prompt } from "react-router-dom";
import classes from "./QuoteForm.module.css";
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";

const QuoteForm = (props) => {
    const [isEntering, setIsEntering] = useState(false);
    const authorInputRef = useRef();
    const textInputRef = useRef();

    function submitFormHandler(event) {
        event.preventDefault();

        const enteredAuthor = authorInputRef.current.value;
        const enteredText = textInputRef.current.value;

        // optional: Could validate here

        props.onAddQuote({ author: enteredAuthor, text: enteredText });
    }

    const formFocusHandler = () => {
        setIsEntering(true);
    };

    const finishEnteringHandler = () => {
        setIsEntering(false);
    };

    return (
        <Fragment>
            {/* {Used to prompt the user before navigating away from a page. 
                When your application enters a state that should prevent the user from navigating away 
                (like a form is half-filled out), render a <Prompt></Prompt>} */}
            <Prompt
                when={isEntering}
                message="Are your sure you want to leave?"
            />
            <Card>
                <form
                    className={classes.form}
                    onFocus={formFocusHandler}
                    onSubmit={submitFormHandler}
                >
                    {props.isLoading && (
                        <div className={classes.loading}>
                            <LoadingSpinner />
                        </div>
                    )}

                    <div className={classes.control}>
                        <label htmlFor="author">Author</label>
                        <input type="text" id="author" ref={authorInputRef} />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor="text">Text</label>
                        <textarea
                            id="text"
                            rows="5"
                            ref={textInputRef}
                        ></textarea>
                    </div>
                    <div className={classes.actions}>
                        <button className="btn" onClick={finishEnteringHandler}>
                            Add Quote
                        </button>
                    </div>
                </form>
            </Card>
        </Fragment>
    );
};

export default QuoteForm;
