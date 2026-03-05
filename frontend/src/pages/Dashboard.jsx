import { useState } from "react";
import API from "../api/api";

export default function Dashboard() {

  const [questionFile,setQuestionFile] = useState(null);
  const [referenceFile,setReferenceFile] = useState(null);

  const [questions,setQuestions] = useState([]);
  const [answers,setAnswers] = useState([]);

  const [questionnaireId,setQuestionnaireId] = useState("");

  const uploadQuestionnaire = async () => {

    if(!questionFile){
      alert("Please select questionnaire file");
      return;
    }

    try{

      const formData = new FormData();
      formData.append("file",questionFile);

      const res = await API.post(
        "/questionnaire/upload",
        formData,
        {
          headers:{
            "Content-Type":"multipart/form-data"
          }
        }
      );

      console.log("Upload response:",res.data);

      setQuestions(res.data.questions || []);
      setQuestionnaireId(res.data.questionnaire?._id);

      alert("Questionnaire uploaded successfully");

    }catch(error){

      console.error("Questionnaire upload error:",error);

      alert("Questionnaire upload failed");

    }

  };


  const uploadReference = async () => {

    if(!referenceFile){
      alert("Please select reference file");
      return;
    }

    try{

      const formData = new FormData();
      formData.append("file",referenceFile);

      await API.post(
        "/reference/upload",
        formData,
        {
          headers:{
            "Content-Type":"multipart/form-data"
          }
        }
      );

      alert("Reference document uploaded");

    }catch(error){

      console.error(error);

      alert("Reference upload failed");

    }

  };


  const generateAnswers = async () => {

    if(!questionnaireId){
      alert("Upload questionnaire first");
      return;
    }

    try{

      const res = await API.post("/answers/generate",{
        questionnaireId
      });

      console.log("Answers:",res.data);

      setAnswers(res.data);

      alert("Answers generated successfully");

    }catch(error){

      console.error("Answer generation error:",error);

      alert("Answer generation failed");

    }

  };


  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>


      <div className="mb-6">

        <h2 className="font-semibold mb-2">
          Upload Questionnaire
        </h2>

        <input
          type="file"
          onChange={(e)=>setQuestionFile(e.target.files[0])}
        />

        <button
          onClick={uploadQuestionnaire}
          className="ml-3 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Upload
        </button>

      </div>


      <div className="mb-6">

        <h2 className="font-semibold mb-2">
          Upload Reference Document
        </h2>

        <input
          type="file"
          onChange={(e)=>setReferenceFile(e.target.files[0])}
        />

        <button
          onClick={uploadReference}
          className="ml-3 bg-green-500 text-white px-4 py-2 rounded"
        >
          Upload
        </button>

      </div>


      <div className="mb-6">

        <button
          onClick={generateAnswers}
          className="bg-purple-600 text-white px-6 py-2 rounded"
        >
          Generate Answers
        </button>

      </div>


      <div>

        <h2 className="text-xl font-semibold mb-4">
          Extracted Questions
        </h2>

        {questions.map((q,i)=>(
          <div key={i} className="bg-gray-100 p-3 mb-2 rounded">
            {q}
          </div>
        ))}

      </div>


      <div className="mt-10">

        <h2 className="text-xl font-semibold mb-4">
          Generated Answers
        </h2>

        {answers.map((a,i)=>(
          <div key={i} className="bg-white p-4 mb-4 rounded shadow">

            <p className="font-semibold">{a.question}</p>

            <p className="mt-2">{a.answer}</p>

            <p className="text-sm text-gray-500 mt-2">
              Citation: {a.citation}
            </p>

          </div>
        ))}

      </div>

    </div>

  );

}