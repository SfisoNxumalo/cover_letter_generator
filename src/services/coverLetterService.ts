import axios from "axios";
import { generateCoverLetterEndpoint } from "../endpoints/endpoints";

export async function generateCoverLetter(formData: FormData): Promise<string> {
  try {
    const res = await axios.post(generateCoverLetterEndpoint, formData, 
      { headers: { 'Content-Type': 'multipart/form-data' }, }
    );

    return res.data.coverLetter;
  } catch (error) {
    console.error("Error generating cover letter:", error);
    throw error;
  }
}