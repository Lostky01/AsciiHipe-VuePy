<template>
  <section class="section">
    <div class="container mt-5 p-5">
      <h1>Ascii scraper</h1>
      <div class="container">
        <form @submit.prevent="convertText">
          <div class="form-group">
            <label for="inputText">Input the text you want to convert</label>
            <input
              type="text"
              class="form-control"
              id="inputText"
              v-model="text"
              placeholder=""
            />
          </div>
          <div class="form-group">
            <label for="inputNumber">Input the number of cipher</label>
            <input
              type="number"
              class="form-control"
              id="inputNumber"
              v-model="ciph_num"
              placeholder=""
            />
          </div>
          <button
            type="submit"
            class="btn btn-primary mt-3"
            style="background-color: cornflowerblue; width: 100%"
          >
            Submit
          </button>
        </form>
        <div class="form-group mt-5">
          <label for="TextAreaResult">Result</label>
          <textarea
            class="form-control"
            id="TextAreaResult"
            rows="3"
            v-model="result"
            readonly
          ></textarea>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      text: "",
      ciph_num: "",
      result: "",
    };
  },
  methods: {
    async convertText() {
      try {
        console.log("Converting text...");
        const pyodide = await loadPyodide();
        console.log("Pyodide loaded successfully");

        const pythonCode = `
          def shift_cipher(text, ciph_num):
            result = ''
            for char in text:
              if char.isupper():
                result += chr((ord(char) - 65 + ciph_num) % 26 + 65)
              elif char.islower():
                result += chr((ord(char) - 97 + ciph_num) % 26 + 97)
              else:
                result += char
            return result
  
          text = '${this.text}'
          ciph_num = ${this.ciph_num}
          decoded_love = shift_cipher(text, ciph_num)
          ascii_char = [ord(i) for i in decoded_love]
          deprecated_ascii = ascii_char[0]
          result = ''
          for i in ascii_char:
            if i == deprecated_ascii:
              result += "wo ai ni " + chr(i)
            else:
              result += chr(i)
          result
        `;

        console.log("Running Python code...");
        this.result = await pyodide.runPythonAsync(pythonCode);
        console.log("Python code executed successfully");
      } catch (error) {
        console.error("Error during text conversion:", error);
      }
    },
  },
};

async function loadPyodide() {
  if (window.pyodide) return window.pyodide;

  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.1/full/pyodide.js';
  document.body.appendChild(script);

  return new Promise((resolve, reject) => {
    script.onload = async () => {
      try {
        const pyodide = await window.loadPyodide();
        resolve(pyodide);
      } catch (error) {
        reject(error);
      }
    };
    script.onerror = (error) => reject(error);
  });
}
</script>

<style>
@import url("https://fonts.cdnfonts.com/css/unbounded");
input.form-control {
  background-color: rgb(82, 80, 80) !important;
  border: 0 !important;
}
label {
  color: white !important;
  font-family: "Unbounded", sans-serif;
}
h1 {
  font-family: "Unbounded", sans-serif;
  color: white !important;
}
body {
  background-color: rgb(82, 80, 80) !important;
}
.container {
  border-radius: 20px;
  background-color: rgb(55, 55, 55) !important;
}
</style>
