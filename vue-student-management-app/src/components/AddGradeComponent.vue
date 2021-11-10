<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center">Create Grade</h3>
            <form @submit.prevent="handleSubmitForm">
                <div class="form-group">
                    <label>Course Number</label>
                    <input type="text" class="form-control" v-model="grade.courseNumber" required>
                </div>
                <div class="form-group">
                    <label>Grade</label>
                    <input type="text" class="form-control" v-model="grade.grade" required>
                </div>

                
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
                grade: {
                   courseNumber: '',
                   grade: '',
                   letterGrade: ''
                },
                
            }
        },
        methods: {
            handleSubmitForm() {
                let apiURL = 'http://localhost:3000/grade';
                
                axios.post(apiURL, this.grade).then(() => {
                    //chnaging the view to the list
                  this.$router.push('/view')
                  this.grade = {
                   courseNumber: '',
                   grade: '',
                   letterGrade: ''
                  }
                }).catch(error => {
                    console.log(error)
                });
            }
        }
           
    }
</script>
