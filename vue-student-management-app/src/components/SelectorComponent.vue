<template>
  <div class="form-group">
    <label>Letter Grade</label>
    <div id="v-model-select">
      <select class="form-control" v-model="letterGrade" @change='passEvent'>
        <option disabled value="">Please select one</option>
        <option v-for="selection in Selection" :key="selection._id">
          {{ selection.letterGrade }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      Selection: [],
      selected: "",
      letterGrade: ''
    };
  },
  created() {

    let apiURL = `http://localhost:3000/selections`;

    axios.get(apiURL).then((res) => {
      this.Selection = res.data;
    });
  },
  methods:{
    passEvent()
    {
      this.$emit('changeSelection', this.letterGrade)
    }
  }
};
</script>