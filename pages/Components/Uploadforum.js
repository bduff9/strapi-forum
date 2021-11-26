import { useSession } from 'next-auth/client';
import Link from "next/Link";
import { useRouter } from 'next/dist/client/router';
import { React, useState } from "react";

import { createQuestion } from "../api";

import style from "../../styles/Home.module.css";

function Uploadforum() {
	const [session] = useSession();
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const router = useRouter();

	const sendData = async (event) => {
		event.preventDefault();
		const newQuestion = {
			Title: name,
			Questions: description,
			Answers: [],
			Username: session.user.name,
		};
		await createQuestion(newQuestion);
		router.push('/');
	};

	return (
		<div className={style.uploadpage}>
			<div className={style.topcont}>
				<h1>Ask a question</h1>
				<Link href="/">
					<button>Forum</button>
				</Link>
			</div>
			<div className={style.formcont}>
				<form className={style.uploadform}>
				<input
                type="text"
                placeholder="Enter your title"
                maxLength="74"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <textarea
                type="text"
                placeholder="Enter your description"
                rows="8"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
    <button onClick={sendData}>Submit Question</button>
				</form>
			</div>
		</div>
	);
};

export default Uploadforum;
