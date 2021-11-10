<template>
    <div class="row">
        <div class="col-md-12">
            <table class="table table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Student ID</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="student in Students" :key="student._id">
                        <td>{{ student.firstName }}</td>
                        <td>{{ student.lastName }}</td>
                        <td>{{ student.studentID }}</td>
                        <td>{{ student.email }}</td>
                        <td>{{ student.phoneNumber }}</td>
                        <td>
                            <router-link :to="{name: 'edit', params: { id: student._id }}" class="btn btn-success ">Edit
                            </router-link>
                            <router-link :to="{name: 'grades', params: { id: student.studentID }}" class="btn btn-info">Grades 
                            </router-link>
                        <button @click.prevent="deleteStudent(student._id)" class="btn btn-danger mx-2">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        data() {
            return {
                Students: []
            }
        },
        // this is using created hook 
        created() {
            let apiURL = 'http://localhost:3000/students';
            axios.get(apiURL).then(res => {
                this.Students = res.data;
            }).catch(error => {
                console.log(error)
            });
        },
        methods: {
            deleteStudent(id){
                console.log(id)
                let apiURL = `http://localhost:3000/student/${id}`;
                let indexOfArrayItem = this.Students.findIndex(i => i._id === id);

                if (window.confirm("Do you really want to delete?")) {
                    axios.delete(apiURL).then(() => {
                        this.Students.splice(indexOfArrayItem, 1);
                    }).catch(error => {
                        console.log(error)
                    });
                }
            }
        }
    }
</script>



<style>
    .btn-success {
        margin-right: 10px;
    }
</style>
