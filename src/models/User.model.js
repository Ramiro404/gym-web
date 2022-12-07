class User {
    constructor(
        id,
        email,
        create_at,
        branch_office_id,
        employee_id,
    ) {
        this.id = id;
        this.email = email;
        this.create_at = create_at;
        this.branch_office_id = branch_office_id;
        this.employee_id = employee_id;
    }
}
export { User }