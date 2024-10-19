import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export interface Product {
  name: string;
  description: string;
  category: string;
  price: number;
  image_url: string;
}

export interface GeneratedCampaign {
  content: string;
}

export const generateCampaign = async (product: Product, platform: string, language: string): Promise<GeneratedCampaign> => {
  try {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OpenAI API key is not set');
    }

    console.log('Generating campaign for:', product.name, 'on', platform, 'in', language);

    const prompt = `You are now a Marketing Manager with over 10 years experience in Marketing B2C products. Write me a social media caption for my product that is perfect for ${platform}.

    Product Name: ${product.name}
    Description: ${product.description}
    Category: ${product.category}
    Price: $${product.price.toFixed(2)}
    Platform: ${platform}

    Write it in ${language}.`;

    console.log('Sending request to OpenAI API...');
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    console.log('Received response from OpenAI API');
    const generatedContent = response.choices[0].message.content;
    if (!generatedContent) {
      throw new Error('No content generated');
    }

    console.log('Generated content:', generatedContent);
    return { content: generatedContent };
  } catch (error) {
    console.error('Error generating campaign:', error);
    throw error;
  }
};