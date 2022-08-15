class UserDTO {
    email;
    id;
    active;

    constructor(model) {
        this.email = model.email;
        this.active = model.active;
        this.id = model._id;
    }
}

export default UserDTO;