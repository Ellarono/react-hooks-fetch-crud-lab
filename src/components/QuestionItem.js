import React, { useState } from "react";

function QuestionItem({ question, deleteQuestion, updateQuestion }) {
  const [answer, setAnswer] = useState(question.answer);

  const handleChange = (e) => {
    setAnswer(e.target.value);
    updateQuestion(question.id, { ...question, answer: e.target.value });
  };

  return (
    <li>
      <p>{question.question}</p>
      <select value={answer} onChange={handleChange}>
        {/* Assuming answer options are predefined */}
        <option value="Answer 1">Answer 1</option>
        <option value="Answer 2">Answer 2</option>
        <option value="Answer 3">Answer 3</option>
      </select>
      <button onClick={() => deleteQuestion(question.id)}>Delete</button>
    </li>
  );
}

export default QuestionItem;
