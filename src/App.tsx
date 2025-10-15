import { useState } from 'react';
import { Container, Title, Textarea, Button, FileInput, Text, Loader } from '@mantine/core';
import axios from 'axios';
import '@mantine/core/styles.css';

export default function App() {
  const [file] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!file || !jobDescription) return alert('Please upload a CV and enter a job description.');

    const formData = new FormData();
    formData.append('cv', file);
    formData.append('jobDescription', jobDescription);

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8000/api/generate-cover-letter', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(res.data.coverLetter);
    } catch (err) {
      console.error(err);
      alert('Error generating cover letter.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="sm" mt="xl">
      <Title order={2}>AI Cover Letter Generator</Title>
      <FileInput
        label="Upload your CV (PDF)"
        placeholder="Select file"
        // onChange={setFile}
        accept="application/pdf"
        mt="md"
      />
      <Textarea
        label="Job Description"
        placeholder="Paste the job ad here"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.currentTarget.value)}
        autosize
        minRows={4}
        mt="md"
      />
      <Button mt="md" fullWidth onClick={handleSubmit} disabled={loading}>
        {loading ? <Loader size="xs" /> : 'Generate Cover Letter'}
      </Button>

      {result && (
        <Text mt="xl" style={{ whiteSpace: 'pre-wrap' }}>
          {result}
        </Text>
      )}
    </Container>
  );
}
