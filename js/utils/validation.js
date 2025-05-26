// js/utils/validation.js

// Perbaiki logika ini menjadi AND (&&)
const isInputFullfilled = (...inputs) => {
  return inputs.every((input) => input !== null && input !== undefined && String(input).trim() !== "");
};
