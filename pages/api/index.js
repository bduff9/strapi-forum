import axios from "axios";
const url = "http://localhost:1337/strapi-forums";

export const readForum = () => axios.get(url);

export const createQuestion = (newQuestion) => axios.post(url, newQuestion);

export const createAnswer = (id, answers, username) => axios.put(`${url}/${id}`, {
		Answers: answers,
		Answername: username,
	});
