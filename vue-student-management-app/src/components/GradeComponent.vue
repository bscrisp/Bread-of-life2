<template>
    <div class="row">
        <div class="col-md-12">
            <h2>Grades for: {{Student.lastName}}, {{Student.firstName}}</h2>
            <table class="table table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th>Course</th>
                        <th>Grade</th>
                        <th>Letter Grade</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="grade in Grades" :key="grade._id">
                        <td>{{ grade.courseNumber }}</td>
                        <td>{{ grade.grade }}</td>
                        <td>{{ grade.letterGrade }}</td>
                        <td>
                            <router-link :to="{name: 'editGrade', params: { id: grade._id }}" class="btn btn-success">Edit
                            </router-link>
                        <button @click.prevent="deleteGrade(grade._id)" class="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
      
            <form @submit.prevent="handleSubmitForm" v-if="isShow">
                <div class="form-group">
                    <label>Course Number</label>
                    <input type="text" class="form-control" v-model="grade.courseNumber" required>
                </div>
                <div class="form-group">
                    <label>Grade</label>
                    <input type="text" class="form-control" v-model="grade.grade" required>
                </div>
                <GradeSelector v-bind:letterGrade="grade.letterGrade" @changeSelection="ChangeT($event)"/>
           


                
                <button class="btn btn-danger mt-3">Create</button>
            </form>

            <button @click="isShow = !isShow" class="btn btn-primary mt-3" v-if="!isShow" >Add Grade</button>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
    import GradeSelector from '@/components/SelectorComponent.vue';
    import axios from "axios";

    export default {
        components: {
            GradeSelector 
        },
        data() {
            return {
                Grades: [],
                Student: {},
                isShow: false,
                grade: {
                   courseNumber: '',
                   grade: '',
                   letterGrade: '',
                   studentID: this.$route.params.id
                  }
            }
        },
        // this is using created hook 
        created() {
            let apiURL = `http://localhost:3000/student-grade/${this.$route.params.id}`;
            axios.get(apiURL).then(res => {
                this.Grades = res.data;
            }).catch(error => {
                console.log(error)
            });

            let apiURL1 = `http://localhost:3000/students/${this.$route.params.id}`;
            axios.get(apiURL1).then(res => {
                this.Student = res.data;
            }).catch(error => {
                console.log(error)
            });
        },
        methods: {
            ChangeT(selectedLetterGrade) {
                this.grade.letterGrade = selectedLetterGrade;
            },
            deleteGrade(id){
                let apiURL = `http://localhost:3000/grade/${id}`;
                let indexOfArrayItem = this.Grades.findIndex(i => i._id === id);

                if (window.confirm("Do you really want to delete?")) {
                    axios.delete(apiURL).then(() => {
                        this.Grades.splice(indexOfArrayItem, 1);
                    }).catch(error => {
                        console.log(error)
                    });
                }
            },
            handleSubmitForm() {
                let apiURL = 'http://localhost:3000/grade';
                
                axios.post(apiURL, this.grade).then(() => {
                //  this.Grades.push(this.grade);
                  this.grade = {
                   courseNumber: '',
                   grade: '',
                   letterGrade: '',
                   studentID: this.$route.params.id
                  }
                }).catch(error => {
                    console.log(error)
                });
            }
            
        }
    }
</script>



<style>
    .btn-success {
        margin-right: 10px;
    }
</style>
