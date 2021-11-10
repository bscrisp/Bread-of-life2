<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <!-- Update Student content -->
      <h3 class="text-center">Update Grade</h3>
      <form @submit.prevent="handleUpdateForm">
        <div class="form-group">
          <label>Course Number</label>
          <input
            type="text"
            class="form-control"
            v-model="grade.courseNumber"
            required
          />
        </div>

        <div class="form-group">
          <label>Grade</label>
          <input
            type="text"
            class="form-control"
            v-model="grade.grade"
            required
          />
        </div>

        <div class="form-group">
          <label>Letter Grade</label>
          <div id="v-model-select">
            <select class="form-control" v-model="grade.letterGrade">
              <option disabled value="">Please select one</option>
              <option v-for="selection in Selection" :key="selection._id">
                {{ selection.letterGrade }}
              </option>
            </select>
            <span>Selected: {{ selected }}</span>
          </div>
        </div>

        <button class="btn btn-danger mt-3">Update</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      grade: {},
      Selection: [],
      selected: "",
    };
  },
  created() {
    let apiURL = `http://localhost:3000/grade/${this.$route.params.id}`;

    axios.get(apiURL).then((res) => {
      this.grade = res.data;
    });

    let apiURL1 = `http://localhost:3000/selections`;

    axios.get(apiURL1).then((res) => {
      this.Selection = res.data;
    });
  },
  methods: {
    handleUpdateForm() {
      let apiURL = `http://localhost:3000/grade/${this.$route.params.id}`;

      axios
        .put(apiURL, this.grade)
        .then((res) => {
          console.log(res);
          this.$router.push("/view");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>