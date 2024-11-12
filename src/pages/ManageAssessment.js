import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Card, CardContent, Snackbar, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

const ManageAssessment = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [choices, setChoices] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const [message, setMessage] = useState('');
  const [saved, setSaved] = useState(false);
  const [jobId, setJobId] = useState(""); 

  useEffect(() => {
    const storedJobId = window.location.pathname.split('/').pop();
    setJobId(storedJobId);

    const storedQuestions = JSON.parse(localStorage.getItem('questions')) || [];
    const jobQuestions = storedQuestions.filter(q => q.jobId === storedJobId);
    setQuestions(jobQuestions);
  }, [jobId]);

  useEffect(() => {
    const storedQuestions = JSON.parse(localStorage.getItem('questions')) || [];
    const updatedQuestions = storedQuestions.filter(q => q.jobId !== jobId);
    localStorage.setItem('questions', JSON.stringify([...updatedQuestions, ...questions]));

    const storedJobs = JSON.parse(localStorage.getItem('jobs')) || [];
    const updatedJobs = storedJobs.map(job => {
      if (job.id === jobId) {
        job.questionCount = questions.length;
      }
      return job;
    });
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));
  }, [questions, jobId]);

  const resetFields = () => {
    setNewQuestion('');
    setChoices(['', '', '', '']);
    setCorrectAnswer('');
    setIsEditing(false);
    setCurrentQuestionId(null);
  };

  const handleSaveQuestion = () => {
    if (newQuestion.trim() && correctAnswer.trim()) {
      const storedQuestions = JSON.parse(localStorage.getItem('questions')) || [];
      const isDuplicate = storedQuestions.some(q => q.text === newQuestion);

      if (isDuplicate) {
        setMessage('This question already exists!');
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        return;
      }

      const questionData = {
        id: isEditing ? currentQuestionId : uuidv4(),
        text: newQuestion,
        type: 'MULTIPLE_CHOICE',
        choices,
        correctAnswer,
        jobId,
      };

      setQuestions(prev => isEditing ? prev.map(q => (q.id === currentQuestionId ? questionData : q)) : [...prev, questionData]);
      setMessage(isEditing ? 'Question updated!' : 'Question saved!');
      setSaved(true);
      resetFields();
      setTimeout(() => setSaved(false), 3000);
    } else {
      setMessage('Please enter a valid question and correct answer!');
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const handleEditClick = (question) => {
    setIsEditing(true);
    setCurrentQuestionId(question.id);
    setNewQuestion(question.text);
    setChoices(question.choices);
    setCorrectAnswer(question.correctAnswer);
  };

  const handleDeleteQuestion = (id) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
    setMessage('Question deleted!');
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleCloseSnackbar = () => setSaved(false);

  const addChoice = () => setChoices([...choices, '']);

  const removeChoice = (index) => {
    const updatedChoices = choices.filter((_, i) => i !== index);
    setChoices(updatedChoices);
    if (correctAnswer === choices[index]) setCorrectAnswer('');
  };

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', marginTop:'20px', padding: '30px', backgroundColor: '#f9f9f9', borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h4" color="primary" gutterBottom>Manage Assessment</Typography>
      <Typography variant="subtitle1" color="textSecondary" sx={{ mb: 3 }}>Total Questions: {questions.length}</Typography>

      <TextField
        fullWidth
        variant="outlined"
        label="New Question"
        value={newQuestion}
        onChange={(e) => setNewQuestion(e.target.value)}
        sx={{ mb: 2 }}
      />

      {choices.map((choice, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            label={`Choice ${index + 1}`}
            value={choice}
            onChange={(e) => {
              const updatedChoices = [...choices];
              updatedChoices[index] = e.target.value;
              setChoices(updatedChoices);
            }}
            sx={{ mr: 1 }}
          />
          {choices.length > 2 && (
            <Button variant="outlined" color="error" onClick={() => removeChoice(index)} sx={{ minWidth: 50 }}>
              Remove
            </Button>
          )}
        </Box>
      ))}

      <Button variant="outlined" onClick={addChoice} sx={{ mb: 2 }}>
        Add More Choices
      </Button>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Correct Answer</InputLabel>
        <Select
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          label="Correct Answer"
          sx={{ color: correctAnswer ? 'green' : 'inherit' }}
        >
          {choices.map((choice, index) => (
            <MenuItem key={index} value={choice}>{choice}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button variant="contained" color="primary" onClick={handleSaveQuestion} sx={{ mt: 2, mb: 3, width: '100%' }}>
        {isEditing ? 'Update Question' : 'Save Question'}
      </Button>

      <Box>
        <Typography variant="h5" color="primary" sx={{ mb: 2 }}>Existing Questions:</Typography>
        {questions.map((question) => (
          <Card key={question.id} sx={{ mb: 2, borderRadius: 2, boxShadow: 1 }}>
            <CardContent>
              <Typography variant="h6">{question.text}</Typography>
              <Typography variant="caption" color="textSecondary">Type: {question.type}</Typography>
              <Box sx={{ mt: 1 }}>
                {question.choices.map((choice, idx) => (
                  <Typography key={idx} variant="body2">{idx + 1}. {choice}</Typography>
                ))}
                <Typography variant="body2" color="green" sx={{ mt: 1 }}>Correct Answer: {question.correctAnswer}</Typography>
              </Box>
              <Button variant="contained" color="secondary" onClick={() => handleEditClick(question)} sx={{ mt: 1 }}>
                Edit
              </Button>
              <Button variant="contained" color="error" onClick={() => handleDeleteQuestion(question.id)} sx={{ mt: 1, ml: 2 }}>
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Snackbar open={saved} autoHideDuration={3000} onClose={handleCloseSnackbar} message={message} />
    </Box>
  );
};

export default ManageAssessment;




// import React, { useState, useEffect } from 'react';
// import { Box, Typography, TextField, Button, Card, CardContent, Snackbar, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
// import { v4 as uuidv4 } from 'uuid';

// const ManageAssessment = () => {
//   const [questions, setQuestions] = useState([]); // State for storing questions
//   const [newQuestion, setNewQuestion] = useState('');
//   const [choices, setChoices] = useState(['', '', '', '']);
//   const [correctAnswer, setCorrectAnswer] = useState('');
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentQuestionId, setCurrentQuestionId] = useState(null);
//   const [message, setMessage] = useState('');
//   const [saved, setSaved] = useState(false);
//   const [jobId, setJobId] = useState(""); // To track the current job ID (passed from AssessmentPage)

//   // Get jobId from URL and set questions accordingly
//   useEffect(() => {
//     const storedJobId = window.location.pathname.split('/').pop(); // Get jobId from URL
//     setJobId(storedJobId);

//     // Fetch questions from localStorage for this job
//     const storedData = JSON.parse(localStorage.getItem('questions')) || {};
//     const jobQuestions = storedData[storedJobId] || []; // Get questions for the specific jobId
//     setQuestions(jobQuestions);
//   }, []);

//   // Save questions to localStorage after every update
//   useEffect(() => {
//     const storedData = JSON.parse(localStorage.getItem('questions')) || {};
    
//     // Update the list of questions for the current jobId
//     storedData[jobId] = questions;
    
//     // Save back to localStorage
//     localStorage.setItem('questions', JSON.stringify(storedData));
//   }, [questions, jobId]);

//   const resetFields = () => {
//     setNewQuestion('');
//     setChoices(['', '', '', '']);
//     setCorrectAnswer('');
//     setIsEditing(false);
//     setCurrentQuestionId(null);
//   };

//   const handleSaveQuestion = () => {
//     if (newQuestion.trim() && correctAnswer.trim()) {
//       const questionData = {
//         id: isEditing ? currentQuestionId : uuidv4(),
//         text: newQuestion,
//         type: 'MULTIPLE_CHOICE',
//         choices,
//         correctAnswer,
//         jobId, // Add jobId to associate the question with a job
//       };
  
//       // Fetch current questions from localStorage and group by jobId
//       const storedAssessments = JSON.parse(localStorage.getItem('assessments')) || {};
  
//       // Check if the question already exists for the current job
//       const jobQuestions = storedAssessments[jobId] || [];
  
//       // Check for duplicates (questions with the same text)
//       const isDuplicate = jobQuestions.some(q => q.text === newQuestion.trim());
//       if (isDuplicate) {
//         setMessage('This question already exists for this job.');
//         setSaved(true);
//         setTimeout(() => {
//           setSaved(false);
//           setMessage('');
//         }, 3000);
//         return; // Stop saving if the question is a duplicate
//       }
  
//       // If editing, update the question in the job's list
//       if (isEditing) {
//         const updatedQuestions = jobQuestions.map(q =>
//           q.id === currentQuestionId ? { ...q, ...questionData } : q
//         );
//         storedAssessments[jobId] = updatedQuestions;
//         setMessage('Question updated!');
//       } else {
//         // If adding a new question, push it to the job's list
//         storedAssessments[jobId] = [...jobQuestions, questionData];
//         setMessage('Question saved!');
//       }
  
//       // Save the updated assessments back to localStorage
//       localStorage.setItem('assessments', JSON.stringify(storedAssessments));
  
//       // Update the state and reset fields
//       setQuestions(prevQuestions => [...prevQuestions, questionData]);
//       setSaved(true);
//       resetFields();
  
//       setTimeout(() => {
//         setSaved(false);
//         setMessage('');
//       }, 3000);
//     } else {
//       setMessage('Please enter a valid question and correct answer!');
//       setSaved(true);
//       setTimeout(() => {
//         setSaved(false);
//         setMessage('');
//       }, 3000);
//     }
//   };

//   const handleEditClick = (question) => {
//     setIsEditing(true);
//     setCurrentQuestionId(question.id);
//     setNewQuestion(question.text);
//     setChoices(question.choices);
//     setCorrectAnswer(question.correctAnswer);
//   };

//   const handleDeleteQuestion = (id) => {
//     setQuestions(prevQuestions => prevQuestions.filter(q => q.id !== id));
//     setMessage('Question deleted!');
//     setSaved(true);
//     setTimeout(() => {
//       setSaved(false);
//       setMessage('');
//     }, 3000);
//   };

//   const handleCloseSnackbar = () => {
//     setSaved(false);
//   };

//   return (
//     <Box sx={{ padding: 3, width: '80%', maxWidth: '900px', margin: '0 auto' }}>
//       <Typography variant="h4" gutterBottom align="center" sx={{ color: 'primary.main' }}>Manage Assessment</Typography>
//       <Typography variant="h6" sx={{ marginBottom: 2, color: 'primary.main' }}>Total Questions: {questions.length}</Typography>

//       <TextField
//         fullWidth
//         variant="outlined"
//         label="New Question"
//         value={newQuestion}
//         onChange={(e) => setNewQuestion(e.target.value)}
//         sx={{ marginBottom: 2 }}
//       />

//       {choices.map((choice, index) => (
//         <TextField
//           key={index}
//           fullWidth
//           variant="outlined"
//           label={`Choice ${index + 1}`}
//           value={choice}
//           onChange={(e) => {
//             const updatedChoices = [...choices];
//             updatedChoices[index] = e.target.value;
//             setChoices(updatedChoices);
//           }}
//           sx={{ marginBottom: 1 }}
//         />
//       ))}

//       <FormControl fullWidth sx={{ marginBottom: 2 }}>
//         <InputLabel>Correct Answer</InputLabel>
//         <Select
//           value={correctAnswer}
//           onChange={(e) => setCorrectAnswer(e.target.value)}
//           label="Correct Answer"
//         >
//           {choices.map((choice, index) => (
//             <MenuItem key={index} value={choice}>{choice}</MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleSaveQuestion}
//         sx={{
//           marginTop: 2,
//           width: '100%',
//           backgroundColor: 'primary.main',
//           '&:hover': {
//             backgroundColor: 'primary.dark'
//           }
//         }}
//       >
//         {isEditing ? 'Update Question' : 'Save Question'}
//       </Button>

//       <Box sx={{ marginTop: 3 }}>
//         <Typography variant="h6" sx={{ marginBottom: 2, color: 'primary.main' }}>Existing Questions:</Typography>
//         {questions.map((question) => (
//           <Card key={question.id} sx={{ marginBottom: 2, boxShadow: 3 }}>
//             <CardContent>
//               <Typography variant="h6" sx={{ color: 'primary.main' }}>{question.text}</Typography>
//               <Typography variant="body2" sx={{ marginTop: 1, color: '#888' }}>Type: {question.type}</Typography>
//               <Box sx={{ marginTop: 1 }}>
//                 {question.choices.map((choice, idx) => (
//                   <Typography key={idx} variant="body2" sx={{ color: '#555' }}>{idx + 1}. {choice}</Typography>
//                 ))}
//                 <Typography variant="body2" sx={{ marginTop: 1, color: 'primary.main' }}>Correct Answer: {question.correctAnswer}</Typography>
//               </Box>
//               <Box sx={{ marginTop: 2 }}>
//                 <Button 
//                   variant="outlined" 
//                   color="primary" 
//                   onClick={() => handleEditClick(question)} 
//                   sx={{ marginRight: 1, padding: '8px 16px', color: 'primary.main' }}
//                 >
//                   Edit
//                 </Button>
//                 <Button 
//                   variant="outlined" 
//                   color="error" 
//                   onClick={() => handleDeleteQuestion(question.id)} 
//                   sx={{ padding: '8px 16px', color: '#D32F2F' }}
//                 >
//                   Delete
//                 </Button>
//               </Box>
//             </CardContent>
//           </Card>
//         ))}
//       </Box>

//       <Snackbar open={saved} autoHideDuration={3000} onClose={handleCloseSnackbar} message={message} />
//     </Box>
//   );
// };

// export default ManageAssessment;




















//                 // <Button 
//                 //   variant="outlined" 
//                 //   color="error" 
//                 //   onClick={() => handleDeleteQuestion(question.id)} 
//                 //   sx={{ padding: '8px 16px' }}
//                 // >
//                 //   Delete
//                 // </Button>