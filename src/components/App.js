import React, { useState, useEffect } from "react";
import QuestionList from "./QuestionList";
import QuestionForm from "./QuestionForm";
import AdminNavBar from "./AdminNavBar";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState("List");
  const [editingQuestion, setEditingQuestion] = useState(null);

  useEffect(() => {
    // Fetch initial questions
    const fetchQuestions = async () => {
      const response = await fetch("http://localhost:4000/questions");
      const data = await response.json();
      setQuestions(data);
    };

    fetchQuestions();
  }, []);

  const addQuestion = async (question) => {
    const response = await fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(question),
    });
    const newQuestion = await response.json();
    setQuestions([...questions, newQuestion]);
  };

  const deleteQuestion = async (id) => {
    await fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    });
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const updateQuestion = async (id, updatedQuestion) => {
    await fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedQuestion),
    });
    setQuestions(questions.map((q) => (q.id === id ? updatedQuestion : q)));
    setEditingQuestion(null);
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
    if (page === "Form") {
      setEditingQuestion(null); // Reset the editing question when switching to form
    }
  };

  return (
    <div>
      <AdminNavBar onChangePage={handleChangePage} />
      {currentPage === "Form" ? (
        <QuestionForm
          addQuestion={addQuestion}
          updateQuestion={editingQuestion ? updateQuestion : null}
          question={editingQuestion}
        />
      ) : (
        <QuestionList
          questions={questions}
          deleteQuestion={deleteQuestion}
          onEditQuestion={(question) => {
            setEditingQuestion(question);
            setCurrentPage("Form");
          }}
        />
      )}
    </div>
  );
}

export default App;
