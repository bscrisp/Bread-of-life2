<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center">Create Student</h3>
            <form @submit.prevent="handleSubmitForm">
                <div class="form-group">
                    <label>First Name</label>
                    <input type="text" class="form-control" v-model="student.firstName" required>
                </div>
                <div class="form-group">
                    <label>Last Name</label>
                    <input type="text" class="form-control" v-model="student.lastName" required>
                </div>

                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-control" v-model="student.email" required>
                </div>

                <div class="form-group">
                    <label>Phone Number</label>
                    <input type="tel" class="form-control" pattern="^\d{3}-\d{3}-\d{4}$" v-model="student.phoneNumber" 
                    placeholder="XXX-XXX-XXXX" aria-describedby="phoneHelpBlock" required>
                    <small id="phoneHelpBlock" class="form-text text-muted">
                            10 digit phone number should be entered with dashes
                    </small>
                </div>

                <div class="form-group">
                    <label>Student ID</label>
                    <input type="text" class="form-control" v-model="student.studentID" required>
                </div>
                <p v-if="errors.length">
                    <b>Please correct the following error(s):</b>
                    <ul>
                        <li v-for="error in errors" :key="error">{{ error }} </li>
                    </ul>
                </p>
                <button class="btn btn-danger mt-3">Create</button>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        data() {
            return {
                errors: [],
                student: {
                   firstName: '',
                   lastName: '',
                   email: '',
                   phoneNumber: '',
                   studentID: ''
                }
            }
        },
        methods: {
            handleSubmitForm() {
                //first validation
                this.errors = [];

                if (!this.student.phoneNumber) {
                    this.errors.push("Phone number required.");
                }
    
                let apiURL = 'http://localhost:3000/student';
                
                axios.post(apiURL, this.student).then(() => {
                    //changing the view to the list
                  this.$router.push('/view')
                  this.student = {
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: '',
                    studentID: ''
                  }
                }).catch(error => {
                    this.errors.push("Error in form submission. " + error.response.data);
                    
                });
            }
        }
           
    }
</script>
