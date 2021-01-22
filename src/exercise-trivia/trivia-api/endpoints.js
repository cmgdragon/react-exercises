import { API_KEY, ENDPOINT } from './api-constants';

export const getQuestions = async (nQuestions, tag) => {

    try {
        
        const request = fetch(`${ENDPOINT}/questions?${tag === 'Any' ? '' : `tags=${tag}`}&limit=${nQuestions}&apiKey=${API_KEY}`)
        const response = (await request).json();

        return response;

    } catch (error) {
        console.log(`Error: ${error}`);
    }

}