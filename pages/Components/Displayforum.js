import Link from "next/link";
import {signIn, signOut, useSession} from 'next-auth/client';
import React, { useState } from "react";

import { createAnswer } from '../api/index';

import style from "../../styles/Home.module.css";

function Displayforum({ fetchData, response }) {
	const [session, loadingSession] = useSession();
	const [show, setShow] = useState(false);
	const [answer, setAnswer] = useState('');

	const submitAnswer = async ({ id, Answers }) => {
		if (!answer) return;

		try {
			await createAnswer(id, [...Answers, [session.user.name, answer]], session.user.name);
			setAnswer('');
			await fetchData();
		} catch (error) {
			console.error(error);
		}
	};

	if (loadingSession) {
		return <p>logging in</p>;
	}

	return (
		<div>
			{!session ? (
            <>
              <h1>Sign in to access forum</h1>
              <button onClick={() => signIn()}>Sign In</button>
            </>
          ) : (
     <>
			<div className={style.topcont}>
				<h1 className={style.heading}>Display forum</h1>
				<div>
					<Link href="/upload">
						<a>Ask a question</a>
					</Link>
					<button onClick={() => signOut()}>Signout</button>
				</div>
			</div>
			<h2 className={style.subheading}>Questions</h2>
			{response.map((response) => (
      <div key={response.id}>
      <div className={style.userinfo}>
			<p>Posted By: {response.Username}</p>
			</div>
			<div className={style.questioncont}>
			<p className={style.question}>{response.Questions}</p>
			</div>
			<div className={style.answercont}>
				<h2 className={style.subheading}>Answers</h2>
				<div className={style.inputanswer}>
					<form>
					<textarea
                      type="text"
                      placeholder="Enter your answer"
                      rows="5"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                    />
     <button onClick={async (event) => {
			 event.preventDefault();
                      await submitAnswer(response);
                    }}>Post</button>
					</form>
				</div>
				<button className={style.showanswer} onClick={() => setShow(!show)}>
					{show ? "Hide Answers" : "Show Answers"}
				</button>
				{show ? (
					<div className={style.answers}>
						{response.Answers.map((answer) => (
								<div className={style.eachanswer} key={answer[1]}>
									<p className={style.username}>{answer[0]}</p>
									<p className={style.answertext}>{answer[1]}</p>
								</div>
							))}
            </div>
          ) : null}
        </div>
      </div>
      ))}
			</>
			)}
		</div>
	);
}

export default Displayforum;
