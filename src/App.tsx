import { useState } from 'react';
import { Container, Title, Textarea, Button, FileInput, Text, Loader } from '@mantine/core';
import '@mantine/core/styles.css';
import { generateCoverLetter } from './services/coverLetterService';

export default function App() {
  const [file, setFile] = useState<File | null>(null);
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
      const result = await generateCoverLetter(formData);
      setResult(result);
    } catch {
      alert("Failed to generate cover letter.");
    }
  };

  return (
    <Container size="sm" mt="xl">
      <Title order={2}>AI Cover Letter Generator</Title>
      <FileInput
        label="Upload your CV (PDF)"
        placeholder="Select file"
        onChange={setFile}
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
