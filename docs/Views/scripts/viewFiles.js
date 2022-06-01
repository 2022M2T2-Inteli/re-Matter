const fetchUsers = () => {
    axios.get('http://127.0.0.1:5555')
        .then(response => {
            const users = response;
            console.log(`GET list users`, users);
        })
        .catch(error => console.error(error));
};

fetchUsers();
