import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { CompanyDetails } from './company-profile-tailwind';

export const Home = () => {
  const [companyName, setCompanyName] = useState('');
  const [website, setWebsite] = useState('');
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,setError] = useState("")
  const navigate = useNavigate();

  useEffect(()=>{
    const res =onAuthStateChanged(auth,(user)=>{
      if(!user){
        navigate('/login');
      }
    })
    return res
  })

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    setCompanyData(null)
    try {
      const domain = website ? new URL(website).host : "" 
      const response = await fetch(
        `${import.meta.env.VITE_API_ENDPOINT}?company=${encodeURIComponent(companyName)}&website=${encodeURIComponent(domain)}`
      );
      const data = await response.json();
      if(!data.status || data.status != 200){
        setCompanyData(null);
        if(data.message){
          setError(data.message)
          return
        }
        setError(data.error)
        return
      }
      setCompanyData(data);
      setError("")
    } catch (error) {
      setError("Something went wrong")
      console.error('Error fetching company data:', error);
    } finally{
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">Company Details</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Company Name
              </label>
              <input
                type="text"
                className="w-full p-2 bg-gray-700 rounded border border-gray-600 text-white"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Website
              </label>
              <input
                type='url'
                className="w-full p-2 bg-gray-700 rounded border border-gray-600 text-white"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Fetching...' : 'Get Company Details'}
            </button>
          </form>
        </div>
        {error}
        {companyData && <CompanyDetails company={companyData} />}

      </div>
    </div>
  );
};
