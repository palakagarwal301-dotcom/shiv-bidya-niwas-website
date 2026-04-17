import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Mail, Phone, Calendar, Filter, Trash2, 
  CheckCircle, Clock, XCircle, LogOut, RefreshCw 
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Check if admin is logged in
    const isLoggedIn = localStorage.getItem('admin_logged_in');
    if (!isLoggedIn) {
      navigate('/admin/login');
    } else {
      fetchInquiries();
    }
  }, [navigate]);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API}/contacts`);
      setInquiries(response.data);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      toast.error('Failed to load inquiries');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_logged_in');
    navigate('/admin/login');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800';
      case 'closed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'new':
        return <Clock className="w-4 h-4" />;
      case 'contacted':
        return <CheckCircle className="w-4 h-4" />;
      case 'closed':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const filteredInquiries = inquiries.filter((inquiry) => {
    if (filter === 'all') return true;
    return inquiry.status === filter;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <RefreshCw className="w-8 h-8 text-amber-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Admin Dashboard
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Manage contact inquiries
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={fetchInquiries}
                className="px-4 py-2 text-slate-700 hover:text-amber-600 transition-colors flex items-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="text-3xl font-bold text-slate-900 mb-1">
              {inquiries.length}
            </div>
            <div className="text-sm text-slate-600">Total Inquiries</div>
          </div>
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <div className="text-3xl font-bold text-blue-900 mb-1">
              {inquiries.filter((i) => i.status === 'new').length}
            </div>
            <div className="text-sm text-blue-700">New</div>
          </div>
          <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
            <div className="text-3xl font-bold text-yellow-900 mb-1">
              {inquiries.filter((i) => i.status === 'contacted').length}
            </div>
            <div className="text-sm text-yellow-700">Contacted</div>
          </div>
          <div className="bg-green-50 rounded-xl p-6 border border-green-200">
            <div className="text-3xl font-bold text-green-900 mb-1">
              {inquiries.filter((i) => i.status === 'closed').length}
            </div>
            <div className="text-sm text-green-700">Closed</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 mb-6">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-slate-600" />
            <div className="flex space-x-2">
              {['all', 'new', 'contacted', 'closed'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    filter === status
                      ? 'bg-amber-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Inquiries List */}
        <div className="space-y-4">
          {filteredInquiries.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center border border-slate-200">
              <p className="text-slate-600">No inquiries found</p>
            </div>
          ) : (
            filteredInquiries.map((inquiry) => (
              <div
                key={inquiry.id}
                className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-bold text-slate-900">
                        {inquiry.name}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(
                          inquiry.status
                        )}`}
                      >
                        {getStatusIcon(inquiry.status)}
                        <span>{inquiry.status}</span>
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center space-x-2 text-slate-600">
                        <Mail className="w-4 h-4" />
                        <span>{inquiry.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-slate-600">
                        <Phone className="w-4 h-4" />
                        <span>{inquiry.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-slate-600">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(inquiry.created_at)}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-slate-600">
                        <span className="font-medium">Service:</span>
                        <span>{inquiry.service}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-slate-700 mb-2">
                    Message:
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {inquiry.message}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <div className="text-xs text-slate-500">
                    ID: {inquiry.id}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
