import { generateCampaign } from './openai';

async function testOpenAIIntegration() {
  const testProduct = {
    name: "Test Product",
    description: "This is a test product for OpenAI integration",
    category: "Test Category",
    price: 99.99,
    image_url: "https://example.com/test-product.jpg"
  };

  try {
    console.log("Starting OpenAI integration test...");
    const result = await generateCampaign(testProduct, "Facebook", "English");
    console.log("Campaign generated successfully:");
    console.log(result.content);
  } catch (error) {
    console.error("Error in OpenAI integration test:", error);
  }
}

testOpenAIIntegration();