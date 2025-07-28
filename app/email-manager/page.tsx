'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Send, Mail, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  description: string;
  category: string;
  component: string;
}

interface Audience {
  id: string;
  name: string;
  object: string;
  created_at: string;
}

const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: 'free-user-welcome',
    name: 'Free User Welcome',
    subject: 'Welcome to Loft! Start saving smarter today',
    description: 'Welcome email for new free users',
    category: 'Onboarding',
    component: 'FreeUserWelcome'
  },
  {
    id: 'pro-user-welcome',
    name: 'Pro User Welcome',
    subject: 'Welcome to Loft Pro ✨ Your smarter, AI-powered way to save links',
    description: 'Welcome email for new Pro users',
    category: 'Onboarding',
    component: 'ProUserWelcome'
  },
  {
    id: 'upgrade-confirmation',
    name: 'Upgrade Confirmation',
    subject: 'You\'ve unlocked Loft Pro ✨ Smarter saving starts now',
    description: 'Confirmation email when upgrading to Pro',
    category: 'Onboarding',
    component: 'UpgradeConfirmation'
  },
  {
    id: 'week1-post-creation',
    name: 'Week 1 Post Creation',
    subject: 'Getting started with Loft: 3 ways to make it work for you',
    description: 'Week 1 onboarding tips',
    category: 'Weekly Sequence',
    component: 'Week1PostCreation'
  },
  {
    id: 'week2-post-creation',
    name: 'Week 2 Post Creation',
    subject: 'Loft tip: Let AI do the heavy lifting',
    description: 'Week 2 AI features highlight',
    category: 'Weekly Sequence',
    component: 'Week2PostCreation'
  },
  {
    id: 'week3-post-creation',
    name: 'Week 3 Post Creation',
    subject: 'From chaos to clarity: How others use Loft',
    description: 'Week 3 use cases and examples',
    category: 'Weekly Sequence',
    component: 'Week3PostCreation'
  },
  {
    id: 'week4-post-creation',
    name: 'Week 4 Post Creation',
    subject: 'Save smarter. Search faster. Stay organized.',
    description: 'Week 4 power features reminder',
    category: 'Weekly Sequence',
    component: 'Week4PostCreation'
  },
  {
    id: 'day3-trial-reminder',
    name: 'Day 3 Trial Reminder',
    subject: 'Still haven\'t tried Loft? Let\'s get you started',
    description: 'Trial activation reminder',
    category: 'Trial Management',
    component: 'Day3TrialReminder'
  },
  {
    id: 'day5-trial-ending',
    name: 'Day 5 Trial Ending',
    subject: 'Your Loft Pro trial ends in 2 days',
    description: 'Trial ending in 2 days notification',
    category: 'Trial Management',
    component: 'Day5TrialEnding'
  },
  {
    id: 'day6-trial-tomorrow',
    name: 'Day 6 Trial Tomorrow',
    subject: 'Your Loft Pro trial ends tomorrow',
    description: 'Trial ending tomorrow notification',
    category: 'Trial Management',
    component: 'Day6TrialEndsTomorrow'
  },
  {
    id: 'day7-trial-today',
    name: 'Day 7 Trial Today',
    subject: 'Today\'s the last day of your Loft Pro trial',
    description: 'Final day of trial notification',
    category: 'Trial Management',
    component: 'Day7TrialEndsToday'
  },
  {
    id: 'no-activity-reengagement',
    name: 'No Activity Re-engagement',
    subject: 'Still here when you\'re ready',
    description: 'Re-engagement for inactive users',
    category: 'Re-engagement',
    component: 'NoActivityReengagement'
  },
  {
    id: 'feedback-survey-30days',
    name: 'Feedback Survey (30 Days)',
    subject: 'Got a minute? We\'d love your thoughts',
    description: '30-day post-signup feedback survey',
    category: 'Feedback',
    component: 'FeedbackSurvey30Days'
  },
  {
    id: 'unsubscribed-marketing',
    name: 'Unsubscribed Marketing',
    subject: 'You\'ll no longer receive Loft updates — but your subscription is still active',
    description: 'Marketing unsubscribe confirmation',
    category: 'Unsubscribe',
    component: 'UnsubscribedMarketing'
  },
  {
    id: 'unsubscribed-all',
    name: 'Unsubscribed All',
    subject: 'You\'ve unsubscribed — we\'ll miss you in our inbox',
    description: 'All emails unsubscribe confirmation',
    category: 'Unsubscribe',
    component: 'UnsubscribedAll'
  },
  {
    id: 'delete-account',
    name: 'Delete Account',
    subject: 'Your Loft account has been deleted',
    description: 'Account deletion confirmation',
    category: 'Account Management',
    component: 'Delete'
  }
];

export default function EmailManagerPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [audiences, setAudiences] = useState<Audience[]>([]);
  const [selectedAudiences, setSelectedAudiences] = useState<string[]>([]);
  const [customSubject, setCustomSubject] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingAudiences, setLoadingAudiences] = useState(true);

  // Load audiences from Resend
  useEffect(() => {
    fetchAudiences();
  }, []);

  const fetchAudiences = async () => {
    try {
      const response = await fetch('/api/resend/audiences');
      if (response.ok) {
        const result = await response.json();
        // Handle the nested data structure: { data: { data: [...] } }
        const audiencesList = result.data?.data || result.data || [];
        setAudiences(Array.isArray(audiencesList) ? audiencesList : []);
      }
    } catch (error) {
      console.error('Failed to fetch audiences:', error);
      setAudiences([]); // Ensure audiences is always an array
    } finally {
      setLoadingAudiences(false);
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    
    // Auto-update subject when template is selected
    const template = EMAIL_TEMPLATES.find(t => t.id === templateId);
    if (template) {
      setCustomSubject(template.subject);
    }
  };

  const handleAudienceToggle = (audienceId: string) => {
    setSelectedAudiences(prev => {
      if (prev.includes(audienceId)) {
        return prev.filter(id => id !== audienceId);
      } else {
        return [...prev, audienceId];
      }
    });
  };

  const handleSendEmails = async () => {
    if (!selectedTemplate || selectedAudiences.length === 0 || !customSubject) {
      alert('Please select template, audiences, and provide a subject line');
      return;
    }

    setIsLoading(true);
    try {
      // Send to each audience separately
      for (const audienceId of selectedAudiences) {
        const response = await fetch('/api/send-bulk-emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            templateIds: [selectedTemplate],
            audienceId: audienceId,
            subject: customSubject,
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to send emails to audience ${audienceId}`);
        }
      }

      alert('Emails sent successfully to all selected audiences!');
      setSelectedTemplate('');
      setCustomSubject('');
      setSelectedAudiences([]);
    } catch (error) {
      console.error('Error sending emails:', error);
      alert('Failed to send emails. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const groupedTemplates = EMAIL_TEMPLATES.reduce((acc, template) => {
    if (!acc[template.category]) {
      acc[template.category] = [];
    }
    acc[template.category].push(template);
    return acc;
  }, {} as Record<string, EmailTemplate[]>);

  const selectedTemplateObject = EMAIL_TEMPLATES.find(t => t.id === selectedTemplate);
  const selectedAudienceObjects = audiences.filter(a => selectedAudiences.includes(a.id));

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-black mb-2">Email Campaign Manager</h1>
            <p className="text-gray-600">Create and send targeted email campaigns to your audiences</p>
          </div>
          <div className="flex space-x-3">
            <Button 
              onClick={handleSendEmails}
              disabled={!selectedTemplate || selectedAudiences.length === 0 || isLoading}
              className="bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
            >
              {isLoading ? 'Sending...' : 'Send Campaign'}
            </Button>
            <Link href="/">
              <Button className="bg-gray-600 hover:bg-gray-700 text-white">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Template Selection */}
          <Card className="lg:col-span-1 border-2 border-gray-200">
            <CardHeader className="bg-blue-50">
              <CardTitle className="flex items-center gap-2 text-black">
                <Mail className="h-5 w-5 text-blue-600" />
                Available Templates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-h-[600px] overflow-y-auto p-6">
              {Object.entries(groupedTemplates).map(([category, templates]) => (
                <div key={category}>
                  <h3 className="font-semibold text-sm text-black mb-2">{category}</h3>
                  <div className="space-y-2 mb-4">
                    {templates.map((template) => (
                      <div
                        key={template.id}
                        className={`border-2 rounded-lg p-3 cursor-pointer transition-all ${
                          selectedTemplate === template.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-400'
                        }`}
                        onClick={() => handleTemplateSelect(template.id)}
                      >
                        <div className="flex items-start gap-2">
                          <input
                            type="radio"
                            checked={selectedTemplate === template.id}
                            onChange={() => handleTemplateSelect(template.id)}
                            className="mt-1 text-blue-600"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm text-black">{template.name}</h4>
                            <p className="text-xs text-gray-600 mt-1">{template.description}</p>
                            <Badge variant="secondary" className="mt-2 text-xs bg-gray-100 text-black">
                              {template.component}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Separator className="bg-gray-300" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Middle Panel - Selected Template & Subject */}
          <Card className="lg:col-span-1 border-2 border-gray-200">
            <CardHeader className="bg-green-50">
              <CardTitle className="flex items-center gap-2 text-black">
                <ArrowRight className="h-5 w-5 text-green-600" />
                Selected Template
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div>
                <Label className="text-sm font-medium text-black">Selected Template</Label>
                <div className="mt-2">
                  {!selectedTemplateObject ? (
                    <p className="text-sm text-gray-500">No template selected</p>
                  ) : (
                    <div className="bg-blue-50 rounded p-3 border-2 border-blue-200">
                      <span className="text-sm font-medium text-black">{selectedTemplateObject.name}</span>
                      <p className="text-xs text-gray-600 mt-1">{selectedTemplateObject.description}</p>
                    </div>
                  )}
                </div>
              </div>

              <Separator className="bg-gray-300" />

              <div>
                <Label htmlFor="subject-line" className="text-sm font-medium text-black">
                  Email Subject Line
                </Label>
                <Input
                  id="subject-line"
                  value={customSubject}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomSubject(e.target.value)}
                  placeholder="Enter email subject line..."
                  className="mt-2 border-2 border-gray-300 text-black"
                />
              </div>

              <div className="text-center text-black font-medium bg-gray-100 p-3 rounded">
                is sent to
              </div>
            </CardContent>
          </Card>

          {/* Right Panel - Audience Selection */}
          <Card className="lg:col-span-1 border-2 border-gray-200">
            <CardHeader className="bg-red-50">
              <CardTitle className="flex items-center gap-2 text-black">
                <Users className="h-5 w-5 text-red-600" />
                Select Audiences ({selectedAudiences.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              {loadingAudiences ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
                  <p className="text-sm text-black mt-2">Loading audiences...</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {!Array.isArray(audiences) || audiences.length === 0 ? (
                    <p className="text-sm text-gray-500">No audiences found</p>
                  ) : (
                    audiences.map((audience) => (
                      <div
                        key={audience.id}
                        className={`border-2 rounded-lg p-3 cursor-pointer transition-all ${
                          selectedAudiences.includes(audience.id)
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-200 hover:border-gray-400'
                        }`}
                        onClick={() => handleAudienceToggle(audience.id)}
                      >
                        <div className="flex items-center gap-2">
                          <Checkbox
                            checked={selectedAudiences.includes(audience.id)}
                            onChange={() => handleAudienceToggle(audience.id)}
                            className="text-red-600"
                          />
                          <div>
                            <h4 className="font-medium text-sm text-black">{audience.name}</h4>
                            <p className="text-xs text-gray-600">
                              Created: {new Date(audience.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              <Separator className="bg-gray-300" />

              <Button
                onClick={handleSendEmails}
                disabled={isLoading || !selectedTemplate || selectedAudiences.length === 0 || !customSubject}
                className="w-full bg-red-600 hover:bg-red-700 text-white border-2 border-red-600"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Emails
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Summary Card */}
        {(selectedTemplate || selectedAudiences.length > 0 || customSubject) && (
          <Card className="mt-6 border-2 border-gray-200">
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-black">Email Campaign Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <Label className="font-medium text-black">Template Selected:</Label>
                  <p className="text-black">{selectedTemplateObject?.name || 'None'}</p>
                </div>
                <div>
                  <Label className="font-medium text-black">Audiences Selected:</Label>
                  <p className="text-black">{selectedAudiences.length} audience(s)</p>
                  {selectedAudienceObjects.map(audience => (
                    <p key={audience.id} className="text-xs text-gray-600">• {audience.name}</p>
                  ))}
                </div>
                <div>
                  <Label className="font-medium text-black">Subject:</Label>
                  <p className="text-black">{customSubject || 'Not set'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 