<script lang="ts">
import AlienTime from '../utils/alienTime'
import { formatDate } from '../utils/u'

export default {
  data() {
    return {
      currentTime: new Date(),
      alienTime: new AlienTime().getAlienDate(),
      newDate: '',
      newTime: '',
      errorMessage: ''
    }
  },
  computed: {
    formattedEarthTime() {
      return formatDate(this.currentTime)
    },
    formattedAlienTime() {
      return formatDate(this.alienTime)
    }
  },
  methods: {
    setDateTime() {
      const newDateTime = new Date(`${this.newDate}T${this.newTime}`)
      console.log('--------newDateTime', newDateTime)
      if (isNaN(newDateTime.getTime())) {
        this.errorMessage = 'Invalid date or time. Please enter valid values.'
      } else {
        this.currentTime = newDateTime
        this.errorMessage = ''
      }
    },
    updateCurrentTime() {
      this.currentTime = new Date()
    },
    updateAlienTime() {
      this.alienTime = new AlienTime().getAlienDate()
    }
  },
  mounted() {
    this.updateCurrentTime()
    this.updateAlienTime()
    setInterval(this.updateAlienTime, 500)
    setInterval(this.updateCurrentTime, 1000)
  }
}
</script>

<template>
  <div class="container">
    <div class="time-container">
      <div class="time-entry">
        <p class="time-title">Alien Time:</p>
        <time class="alien-time">{{ formattedAlienTime }}</time>
      </div>
    </div>
    <time class="current-time">Earth time: {{ formattedEarthTime }}</time>
    <div class="set-time">
      <h2>Set Date and Time</h2>
      <form @submit.prevent="setDateTime">
        <div class="input-group">
          <label for="date">Date:</label>
          <input type="date" v-model="newDate" required />
        </div>
        <div class="input-group">
          <label for="time">Time:</label>
          <input type="time" v-model="newTime" required />
        </div>
        <button type="submit">Set Date and Time</button>
      </form>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.time-title {
  color: #6b7280;
}

.current-time,
.set-time {
  margin-bottom: 20px;
  color: #0f172a;
}

h2 {
  margin-bottom: 10px;
}

p {
  font-size: 18px;
  color: #333;
}

.input-group {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: calc(100% - 20px);
  padding: 8px 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px 15px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  font-size: 14px;
}

.time-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.time-entry {
  background-color: #f0f0f0;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.time-title {
  margin: 0;
  color: #007bff;
  font-size: 18px;
}

.alien-time {
  display: block; /* Each time element on a new line */
  margin-top: 5px;
  font-size: 2rem;
  color: #333;
}

.current-time {
  display: block; /* Each time element on a new line */
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
  color: #6b7280;
  font-weight: bolder;
}
</style>
