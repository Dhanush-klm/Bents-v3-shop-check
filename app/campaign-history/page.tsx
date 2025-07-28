'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  History, 
  Mail, 
  Users, 
  Calendar,
  RefreshCw,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

interface Campaign {
  id: number;
  template_name: string;
  audience_name: string;
  subject_line: string;
  recipients_count: number;
  when_sent: string;
}

export default function CampaignHistoryPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCampaignHistory();
  }, []);

  const fetchCampaignHistory = async () => {
    try {
      setLoading(true);
      
      const response = await fetch('/api/campaign/history');
      if (response.ok) {
        const data = await response.json();
        setCampaigns(data.campaigns || []);
      } else {
        console.error('Failed to fetch campaign history');
      }
    } catch (error) {
      console.error('Error fetching campaign history:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      })
    };
  };

  const getTemplateCategory = (templateName: string) => {
    if (templateName.toLowerCase().includes('welcome')) return 'welcome';
    if (templateName.toLowerCase().includes('trial')) return 'trial';
    if (templateName.toLowerCase().includes('week')) return 'onboarding';
    if (templateName.toLowerCase().includes('feedback')) return 'feedback';
    if (templateName.toLowerCase().includes('unsubscribed')) return 'unsubscribe';
    if (templateName.toLowerCase().includes('upgrade')) return 'upgrade';
    return 'other';
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'welcome':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Welcome</Badge>;
      case 'trial':
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200">Trial</Badge>;
      case 'onboarding':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Onboarding</Badge>;
      case 'feedback':
        return <Badge className="bg-purple-100 text-purple-800 border-purple-200">Feedback</Badge>;
      case 'unsubscribe':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Unsubscribe</Badge>;
      case 'upgrade':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Upgrade</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Other</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <RefreshCw className="animate-spin h-8 w-8 text-blue-500" />
            <span className="ml-4 text-lg text-black">Loading campaign history...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-black mb-2">Campaign History</h1>
            <p className="text-gray-600">Track your email campaigns and their performance</p>
          </div>
          <div className="flex space-x-3">
            <Button 
              onClick={fetchCampaignHistory}
              className="bg-gray-800 hover:bg-gray-700 text-white"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Link href="/email-manager">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Mail className="h-4 w-4 mr-2" />
                New Campaign
              </Button>
            </Link>
            <Link href="/">
              <Button className="bg-gray-600 hover:bg-gray-700 text-white">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Campaigns</p>
                  <p className="text-3xl font-bold text-black">{campaigns.length}</p>
                </div>
                <History className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Recipients</p>
                  <p className="text-3xl font-bold text-black">
                    {campaigns.reduce((sum, campaign) => sum + campaign.recipients_count, 0)}
                  </p>
                </div>
                <Users className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">This Month</p>
                  <p className="text-3xl font-bold text-black">
                    {campaigns.filter(campaign => {
                      const campaignDate = new Date(campaign.when_sent);
                      const now = new Date();
                      return campaignDate.getMonth() === now.getMonth() && 
                             campaignDate.getFullYear() === now.getFullYear();
                    }).length}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Avg Recipients</p>
                  <p className="text-3xl font-bold text-black">
                    {campaigns.length > 0 
                      ? Math.round(campaigns.reduce((sum, campaign) => sum + campaign.recipients_count, 0) / campaigns.length)
                      : 0
                    }
                  </p>
                </div>
                <Mail className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Campaign History Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-black flex items-center">
              <History className="h-5 w-5 mr-2" />
              Campaign History
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-4 font-semibold text-black">Template</th>
                    <th className="text-left p-4 font-semibold text-black">Subject Line</th>
                    <th className="text-left p-4 font-semibold text-black">Audience</th>
                    <th className="text-center p-4 font-semibold text-black">Recipients</th>
                    <th className="text-left p-4 font-semibold text-black">Sent</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center p-8 text-gray-500">
                        No campaigns found. Start your first campaign!
                      </td>
                    </tr>
                  ) : (
                    campaigns.map((campaign) => {
                      const sentDateTime = formatDate(campaign.when_sent);
                      const category = getTemplateCategory(campaign.template_name);
                      
                      return (
                        <tr key={campaign.id} className="border-b hover:bg-gray-50">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div>
                                <div className="font-medium text-black">{campaign.template_name}</div>
                                {getCategoryBadge(category)}
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="text-black max-w-xs truncate" title={campaign.subject_line}>
                              {campaign.subject_line}
                            </div>
                          </td>
                          <td className="p-4 text-black">{campaign.audience_name}</td>
                          <td className="p-4 text-center">
                            <div className="text-2xl font-bold text-blue-600">{campaign.recipients_count}</div>
                          </td>
                          <td className="p-4 text-black">
                            <div>{sentDateTime.date}</div>
                            <div className="text-sm text-gray-500">{sentDateTime.time}</div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
            {campaigns.length > 0 && (
              <div className="p-4 bg-gray-50 border-t">
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>Total Campaigns: {campaigns.length}</span>
                  <span>
                    Total Recipients Reached: {campaigns.reduce((sum, campaign) => sum + campaign.recipients_count, 0)}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 