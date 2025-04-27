import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
	return axios.get(baseUrl);
};

const create = (newObject) => {
	return axios.post(baseUrl, newObject);
};

const update = (id, newObject) => {
	return axios.put(`${baseUrl}/${id}`, newObject);
};

const remove = (id) => {
	const request = axios.delete(`${baseUrl}/${id}`);
	return request.then((response) => {
		return response.data;
	});
};

export default {
	remove: remove,
	getAll: getAll,
	create: create,
	update: update,
};
