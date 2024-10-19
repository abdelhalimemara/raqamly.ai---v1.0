import React from 'react';
import { BarChart, Image, Package, Megaphone, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard: React.FC = () => {
  // Mock data for the chart
  const chartData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 4500 },
    { name: 'May', value: 6000 },
    { name: 'Jun', value: 5500 },
  ];

  // Mock data for the table
  const tableData = [
    { date: '2023-06-01', facebook: 1200, instagram: 800, twitter: 400 },
    { date: '2023-06-02', facebook: 1500, instagram: 900, twitter: 600 },
    { date: '2023-06-03', facebook: 1300, instagram: 1000, twitter: 500 },
    { date: '2023-06-04', facebook: 1400, instagram: 1100, twitter: 700 },
    { date: '2023-06-05', facebook: 1600, instagram: 1200, twitter: 800 },
    { date: '2023-06-06', facebook: 1700, instagram: 1300, twitter: 900 },
    { date: '2023-06-07', facebook: 1800, instagram: 1400, twitter: 1000 },
  ];

  // Mock data for top performing campaigns and products
  const topCampaigns = [
    { name: 'Summer Sale', performance: 95 },
    { name: 'New Product Launch', performance: 88 },
    { name: 'Holiday Special', performance: 82 },
  ];

  const topProducts = [
    { name: 'Product A', sales: 1200 },
    { name: 'Product B', sales: 950 },
    { name: 'Product C', sales: 820 },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold mb-8">Dashboard</h2>
      
      {/* First row: Number cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard icon={Image} title="Images Generated" value="1,234" />
        <DashboardCard icon={Package} title="Products Uploaded" value="567" />
        <DashboardCard icon={Megaphone} title="Campaigns Launched" value="89" />
        <DashboardCard icon={DollarSign} title="Estimated Revenue" value="$123,456" />
      </div>

      {/* Second row: Chart and Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Campaign Sales Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#B5FF81" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Table */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Last 7 Days Sales</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Facebook</th>
                  <th className="px-4 py-2 text-left">Instagram</th>
                  <th className="px-4 py-2 text-left">Twitter</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="px-4 py-2">{row.date}</td>
                    <td className="px-4 py-2">${row.facebook}</td>
                    <td className="px-4 py-2">${row.instagram}</td>
                    <td className="px-4 py-2">${row.twitter}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Third row: Top Performing Campaigns and Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Top Performing Campaigns</h3>
          <ul className="space-y-4">
            {topCampaigns.map((campaign, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{campaign.name}</span>
                <span className="font-semibold text-green-600">{campaign.performance}% success</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Top Performing Products</h3>
          <ul className="space-y-4">
            {topProducts.map((product, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{product.name}</span>
                <span className="font-semibold text-blue-600">{product.sales} sales</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const DashboardCard: React.FC<{ icon: React.ElementType; title: string; value: string }> = ({ icon: Icon, title, value }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <Icon size={24} className="text-highlight" />
      </div>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
};

export default Dashboard;