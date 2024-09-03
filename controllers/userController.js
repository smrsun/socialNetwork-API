

const userController = {
    function getUsers(req, res) {
        // request from our database
        User.find({})
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
    }
}

