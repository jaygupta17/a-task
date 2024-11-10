import { MapPin, Globe, Users, Building2, Calendar, Tag, DollarSign, Briefcase, Twitter, Facebook, Linkedin } from 'lucide-react';

export interface Company {
  status: number;
  name: string;
  display_name: string;
  size: string;
  employee_count: number;
  id: string;
  founded: number;
  industry: string;
  naics: Array<{
    naics_code: string;
    sector: string;
    sub_sector: string;
    industry_group: string | null;
    naics_industry: string | null;
    national_industry: string | null;
  }>;
  sic: Array<{
    sic_code: string;
    major_group: string;
    industry_group: string;
    industry_sector: string | null;
  }>;
  location: {
    name: string;
    locality: string;
    region: string;
    metro: string;
    country: string;
    continent: string;
    street_address: string | null;
    postal_code: string;
    geo: string;
  };
  linkedin_id: string;
  linkedin_url: string;
  linkedin_slug: string;
  facebook_url: string;
  twitter_url: string;
  profiles: string[];
  website: string;
  ticker: string | null;
  gics_sector: string | null;
  mic_exchange: string | null;
  type: 'private' | 'public';
  summary: string;
  tags: string[];
  headline: string;
  alternative_names: string[];
  alternative_domains: string[];
  affiliated_profiles: string[];
  total_funding_raised: number;
  latest_funding_stage: string;
  last_funding_date: string;
  number_funding_rounds: number;
  funding_stages: string[];
  employee_count_by_country: {
    [country: string]: number;
  };
  dataset_version: string;
  likelihood: number;
}

export const CompanyDetails = ({ company }: { company: Company }) => {
  const formatNumber = (num: number | null | undefined) => {
    if (num == null) return 'N/A';
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'N/A';
    }
  };

  const topCountries = Object.entries(company.employee_count_by_country || {})
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gray-800 rounded-xl shadow-lg p-8 mb-8 border border-gray-700 transform hover:scale-[1.01] transition-transform duration-300">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold text-gray-100 tracking-tight">
              {company.display_name || company.name || 'Unnamed Company'}
            </h1>
            <p className="text-xl text-gray-400 font-light">
              {company.headline || 'No headline available'}
            </p>
            <div className="flex items-center gap-4 text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{company.location?.name || 'Location unknown'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{formatNumber(company.employee_count)} employees</span>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            {company.twitter_url && (
              <a href={`https://${company.twitter_url}`} target="_blank" rel="noopener noreferrer" 
                 className="p-3 rounded-full bg-gray-700 hover:bg-blue-900 transition-colors duration-300">
                <Twitter className="w-6 h-6 text-gray-300 hover:text-blue-400" />
              </a>
            )}
            {company.facebook_url && (
              <a href={`https://${company.facebook_url}`} target="_blank" rel="noopener noreferrer"
                 className="p-3 rounded-full bg-gray-700 hover:bg-blue-900 transition-colors duration-300">
                <Facebook className="w-6 h-6 text-gray-300 hover:text-blue-400" />
              </a>
            )}
            {company.linkedin_url && (
              <a href={`https://${company.linkedin_url}`} target="_blank" rel="noopener noreferrer"
                 className="p-3 rounded-full bg-gray-700 hover:bg-blue-900 transition-colors duration-300">
                <Linkedin className="w-6 h-6 text-gray-300 hover:text-blue-400" />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Key Metrics */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700 hover:border-blue-700 transition-colors duration-300">
          <h2 className="text-xl font-bold text-gray-100 mb-6">Company Overview</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="text-sm text-gray-400">Founded</div>
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-400" />
                <span className="font-semibold text-gray-200">
                  {company.founded || 'N/A'}
                </span>
              </div>
            </div>
            {company.website && (
              <div className="space-y-2">
                <div className="text-sm text-gray-400">Website</div>
                <a href={`https://${company.website}`} target="_blank" rel="noopener noreferrer" 
                   className="flex items-center gap-2 text-blue-400 hover:text-blue-300">
                  <Globe className="w-5 h-5" />
                  <span className="font-semibold truncate">{company.website}</span>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Funding Details */}
        {(company.total_funding_raised || company.latest_funding_stage || company.last_funding_date || company.number_funding_rounds) && (
          <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700 hover:border-green-700 transition-colors duration-300">
            <h2 className="text-xl font-bold text-gray-100 mb-6">Funding Details</h2>
            <div className="grid grid-cols-2 gap-6">
              {company.total_funding_raised > 0 && (
                <div className="space-y-2">
                  <div className="text-sm text-gray-400">Total Raised</div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-400" />
                    <span className="font-semibold text-gray-200">
                      ${formatNumber(company.total_funding_raised)}
                    </span>
                  </div>
                </div>
              )}
              {company.latest_funding_stage && (
                <div className="space-y-2">
                  <div className="text-sm text-gray-400">Latest Stage</div>
                  <div className="flex items-center gap-2">
                    <Tag className="w-5 h-5 text-green-400" />
                    <span className="font-semibold text-gray-200">{company.latest_funding_stage}</span>
                  </div>
                </div>
              )}
              {company.last_funding_date && (
                <div className="space-y-2">
                  <div className="text-sm text-gray-400">Last Funding</div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-green-400" />
                    <span className="font-semibold text-gray-200">
                      {formatDate(company.last_funding_date)}
                    </span>
                  </div>
                </div>
              )}
              {company.number_funding_rounds > 0 && (
                <div className="space-y-2">
                  <div className="text-sm text-gray-400">Funding Rounds</div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-green-400" />
                    <span className="font-semibold text-gray-200">
                      {company.number_funding_rounds}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Employee Distribution */}
        {topCountries.length > 0 && (
          <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700 hover:border-purple-700 transition-colors duration-300">
            <h2 className="text-xl font-bold text-gray-100 mb-6">Employee Distribution</h2>
            <div className="space-y-6">
              {topCountries.map(([country, count]) => (
                <div key={country} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-400 capitalize">{country}</span>
                    <span className="text-sm font-semibold text-gray-200">
                      {formatNumber(count)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${(count / (company.employee_count || 1)) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {company.tags?.length > 0 && (
          <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700 hover:border-indigo-700 transition-colors duration-300">
            <h2 className="text-xl font-bold text-gray-100 mb-6">Industries & Tags</h2>
            <div className="flex flex-wrap gap-2">
              {company.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-indigo-900/50 text-indigo-300 rounded-full text-sm font-medium hover:bg-indigo-800/50 transition-colors duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* About Section */}
      {company.summary && (
        <div className="mt-8 bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700 hover:border-gray-600 transition-colors duration-300">
          <h2 className="text-2xl font-bold text-gray-100 mb-6">About {company.display_name || company.name}</h2>
          <p className="text-gray-400 leading-relaxed whitespace-pre-line">{company.summary}</p>
        </div>
      )}
    </div>
  );
};

export default CompanyDetails;