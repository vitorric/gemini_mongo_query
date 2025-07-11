import axios from 'axios';

export const postPrompt = async (question: string): Promise<{ query: string | null, answer: string | null }> => {
    const response = await axios({
        method: 'POST',
        url: 'http://localhost:3010/prompt',
        data: { question }
    })
    return response?.data;
}