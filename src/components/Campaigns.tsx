import React, { useState, useEffect } from 'react';
import { Megaphone, Facebook, Instagram, Twitter, Edit2, Download, Tag, Globe } from 'lucide-react';
import { generateCampaign, GeneratedCampaign } from '../utils/openai';
import { supabase } from '../lib/supabaseClient';

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image_url: string;
}

const Campaigns: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('english');
  const [generatedCampaign, setGeneratedCampaign] = useState<GeneratedCampaign | null>(null);
  const [editedContent, setEditedContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setProducts(data || []);
    } catch (error: any) {
      console.error('Error fetching products:', error);
      setError(`Failed to fetch products: ${error.message || 'Unknown error'}`);
    }
  }

  const handleCreateCampaign = async () => {
    if (!selectedProduct || !selectedPlatform) {
      setError('Please select a product and a platform');
      return;
    }

    setIsLoading(true);
    setGeneratedCampaign(null);
    setError(null);
    try {
      console.log('Starting campaign generation...');
      const campaign = await generateCampaign(selectedProduct, selectedPlatform, selectedLanguage);
      console.log('Campaign generated successfully:', campaign);
      setGeneratedCampaign(campaign);
      setEditedContent(campaign.content);
    } catch (error: any) {
      console.error('Error generating campaign:', error);
      setError(`Failed to generate campaign: ${error.message || 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold mb-8">Create Campaign</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-4">Select Product</h3>
          <select
            className="w-full p-2 border rounded"
            onChange={(e) => setSelectedProduct(products.find(p => p.id === e.target.value) || null)}
          >
            <option value="">Choose a product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>{product.name}</option>
            ))}
          </select>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Select Platform</h3>
          <div className="flex space-x-4">
            {['Facebook', 'Instagram', 'Twitter'].map((platform) => (
              <button
                key={platform}
                onClick={() => setSelectedPlatform(platform)}
                className={`flex items-center justify-center p-2 rounded-full ${
                  selectedPlatform === platform ? 'bg-highlight text-black' : 'bg-gray-200'
                }`}
              >
                {platform === 'Facebook' && <Facebook size={24} />}
                {platform === 'Instagram' && <Instagram size={24} />}
                {platform === 'Twitter' && <Twitter size={24} />}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Select Language</h3>
          <select
            className="w-full p-2 border rounded"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            <option value="english">English</option>
            <option value="arabic">Arabic</option>
          </select>
        </div>
      </div>

      {selectedProduct && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Selected Product</h3>
          <p><strong>Name:</strong> {selectedProduct.name}</p>
          <p><strong>Description:</strong> {selectedProduct.description}</p>
          <p><strong>Category:</strong> {selectedProduct.category}</p>
          <p><strong>Price:</strong> ${selectedProduct.price.toFixed(2)}</p>
        </div>
      )}

      <button
        onClick={handleCreateCampaign}
        disabled={!selectedProduct || !selectedPlatform || isLoading}
        className="bg-highlight text-black font-semibold py-2 px-4 rounded hover:bg-opacity-80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Generating...' : 'Generate Campaign'}
      </button>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {generatedCampaign && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Generated Campaign</h3>
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full h-40 p-2 border rounded"
          />
          <div className="flex justify-end space-x-4 mt-4">
            <button className="flex items-center bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition-colors">
              <Edit2 size={20} className="mr-2" />
              Edit
            </button>
            <button className="flex items-center bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 transition-colors">
              <Download size={20} className="mr-2" />
              Export
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Campaigns;