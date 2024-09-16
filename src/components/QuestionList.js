import React from "react";

function QuestionList({ questions, deleteQuestion, onEditQuestion }) {
  return (
    <section>
      <h1>Question List</h1>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <p>{question.prompt}</p>
            <select
              aria-label="Correct Answer"
              defaultValue={question.correctIndex}
              disabled
            >
              {question.answers.map((answer, index) => (
                <option key={index} value={index}>
                  {answer}
                </option>
              ))}
            </select>
            <button onClick={() => onEditQuestion(question)}>Edit</button>
            <button onClick={() => deleteQuestion(question.id)}>Delete Question</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
