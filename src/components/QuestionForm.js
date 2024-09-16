import React, { useState } from "react";

function QuestionForm({ addQuestion, question = null, updateQuestion = null }) {
  const [formData, setFormData] = useState(
    question || {
      prompt: "",
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
      correctIndex: "0",
    }
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newQuestion = {
      prompt: formData.prompt,
      answers: [
        formData.answer1,
        formData.answer2,
        formData.answer3,
        formData.answer4,
      ],
      correctIndex: parseInt(formData.correctIndex, 10),
    };

    if (updateQuestion) {
      updateQuestion(question.id, newQuestion);
    } else {
      addQuestion(newQuestion);
    }

    setFormData({
      prompt: "",
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
      correctIndex: "0",
    });
  };

  return (
    <section>
      <h1>{updateQuestion ? "Edit Question" : "New Question"}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            name="prompt"
            type="text"
            value={formData.prompt}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 1:
          <input
            name="answer1"
            type="text"
            value={formData.answer1}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 2:
          <input
            name="answer2"
            type="text"
            value={formData.answer2}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 3:
          <input
            name="answer3"
            type="text"
            value={formData.answer3}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 4:
          <input
            name="answer4"
            type="text"
            value={formData.answer4}
            onChange={handleChange}
          />
        </label>
        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleChange}
          >
            <option value="0">Answer 1</option>
            <option value="1">Answer 2</option>
            <option value="2">Answer 3</option>
            <option value="3">Answer 4</option>
          </select>
        </label>
        <button type="submit">
          {updateQuestion ? "Update Question" : "Add Question"}
        </button>
      </form>
    </section>
  );
}

export default QuestionForm;
