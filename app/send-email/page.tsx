'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Eye } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface EmailTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  variables: string[];
}

const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: 'FreeUserWelcome',
    name: 'Free User Welcome',
    description: 'Welcome email for new free users',
    category: 'Onboarding',
    variables: ['username', 'userEmail']
  },
  {
    id: 'ProTrialWelcome',
    name: 'Pro Trial Welcome',
    description: 'Welcome email for Pro trial users',
    category: 'Onboarding',
    variables: ['username', 'userEmail']
  },
  {
    id: 'UpgradeConfirmation',
    name: 'Upgrade Confirmation',
    description: 'Confirmation when upgrading to Pro',
    category: 'Onboarding',
    variables: ['username', 'userEmail']
  },
  {
    id: 'Week1PostCreation',
    name: 'Week 1 Post Creation',
    description: 'Week 1 onboarding tips',
    category: 'Weekly Sequence',
    variables: ['username', 'userEmail']
  },
  {
    id: 'Week2PostCreation',
    name: 'Week 2 Post Creation',
    description: 'Week 2 AI features',
    category: 'Weekly Sequence',
    variables: ['username', 'userEmail']
  },
  {
    id: 'Week3PostCreation',
    name: 'Week 3 Post Creation',
    description: 'Week 3 use cases',
    category: 'Weekly Sequence',
    variables: ['username', 'userEmail']
  },
  {
    id: 'Week4PostCreation',
    name: 'Week 4 Post Creation',
    description: 'Week 4 power features',
    category: 'Weekly Sequence',
    variables: ['username', 'userEmail']
  },
  {
    id: 'Day3TrialReminder',
    name: 'Day 3 Trial Reminder',
    description: 'Day 3 trial reminder',
    category: 'Trial Management',
    variables: ['username', 'userEmail']
  },
  {
    id: 'Day5TrialEnding',
    name: 'Day 5 Trial Ending',
    description: 'Day 5 trial ending notification',
    category: 'Trial Management',
    variables: ['username', 'userEmail']
  },
  {
    id: 'Day6TrialEndsTomorrow',
    name: 'Day 6 Trial Ends Tomorrow',
    description: 'Day 6 trial ending reminder',
    category: 'Trial Management',
    variables: ['username', 'userEmail']
  },
  {
    id: 'Day7TrialEndsToday',
    name: 'Day 7 Trial Ends Today',
    description: 'Final day of trial',
    category: 'Trial Management',
    variables: ['username', 'userEmail']
  },
  {
    id: 'NoActivityReengagement',
    name: 'No Activity Re-engagement',
    description: 'Re-engagement for inactive users',
    category: 'Re-engagement',
    variables: ['username', 'userEmail']
  },
  {
    id: 'FeedbackSurvey30Days',
    name: 'Feedback Survey (30 Days)',
    description: '30-day feedback survey',
    category: 'Feedback',
    variables: ['username', 'userEmail']
  },
  {
    id: 'Delete',
    name: 'Delete Account',
    description: 'Account deletion confirmation',
    category: 'Account Management',
    variables: ['username', 'userEmail']
  },
  {
    id: 'PaymentError',
    name: 'Payment Error',
    description: 'Payment processing error',
    category: 'Billing',
    variables: ['username', 'userEmail']
  },
  {
    id: 'SubscriptionRenewal',
    name: 'Subscription Renewal (30 Days)',
    description: 'Monthly renewal reminder',
    category: 'Billing',
    variables: ['username', 'userEmail', 'amount']
  },
  {
    id: 'SubscriptionRenewalWeek',
    name: 'Subscription Renewal (1 Week)',
    description: 'Weekly renewal reminder',
    category: 'Billing',
    variables: ['username', 'userEmail', 'amount']
  },
  {
    id: 'SubscriptionRenewalDay',
    name: 'Subscription Renewal (1 Day)',
    description: 'Daily renewal reminder',
    category: 'Billing',
    variables: ['username', 'userEmail', 'amount']
  },
  {
    id: 'SubscriptionRenewed',
    name: 'Subscription Renewed',
    description: 'Renewal confirmation',
    category: 'Billing',
    variables: ['username', 'userEmail', 'amount']
  },
  {
    id: 'SubscriptionCancelled',
    name: 'Subscription Cancelled',
    description: 'Cancellation confirmation',
    category: 'Billing',
    variables: ['username', 'userEmail']
  },
  {
    id: 'Reactivation',
    name: 'Reactivation',
    description: 'Re-engagement email',
    category: 'Re-engagement',
    variables: ['username', 'userEmail']
  },
  {
    id: 'Month1PaidUser',
    name: 'Month 1 Paid User',
    description: '1 month milestone',
    category: 'Milestone',
    variables: ['username', 'userEmail']
  },
  {
    id: 'UnsubscribedAll',
    name: 'Unsubscribed All',
    description: 'Unsubscribe confirmation',
    category: 'Unsubscribe',
    variables: ['username', 'userEmail']
  },
  {
    id: 'UnsubscribeActivePaid',
    name: 'Unsubscribe Active Paid',
    description: 'Unsubscribe but subscription active',
    category: 'Unsubscribe',
    variables: ['username', 'userEmail']
  },
  {
    id: 'Anniversary',
    name: 'Anniversary Email',
    description: 'Anniversary celebration',
    category: 'Milestone',
    variables: ['username', 'userEmail', 'anniversaryDuration']
  },
  {
    id: 'MilestoneEmail',
    name: 'Milestone Email',
    description: 'Milestone achievement',
    category: 'Milestone',
    variables: ['username', 'userEmail']
  },
];

export default function SendEmailPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [showPreview, setShowPreview] = useState(false);
  const [previewHtml, setPreviewHtml] = useState('');
  const [loadingPreview, setLoadingPreview] = useState(false);
  const router = useRouter();

  const selectedTemplateObject = EMAIL_TEMPLATES.find(t => t.id === selectedTemplate);

  const groupedTemplates = EMAIL_TEMPLATES.reduce((acc, template) => {
    if (!acc[template.category]) {
      acc[template.category] = [];
    }
    acc[template.category].push(template);
    return acc;
  }, {} as Record<string, EmailTemplate[]>);

  const handlePreview = async () => {
    if (!selectedTemplate) return;
    
    setLoadingPreview(true);
    try {
      const response = await fetch(`/api/email/preview`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          template: selectedTemplate,
          // Use default values for preview
          variables: {
            username: 'John Doe',
            userEmail: 'john@example.com',
            anniversaryDuration: '1 year',
            amount: '$9.99'
          }
        }),
      });
      
      if (response.ok) {
        const { html } = await response.json();
        setPreviewHtml(html);
        setShowPreview(true);
      }
    } catch (error) {
      console.error('Preview error:', error);
      alert('Failed to load preview');
    } finally {
      setLoadingPreview(false);
    }
  };

  const handleNext = () => {
    if (!selectedTemplate) return;
    router.push(`/send-email/compose?template=${selectedTemplate}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-6000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20">
          <div>
            <h1 className="text-4xl font-bold text-black mb-2">Select Email Template</h1>
            <p className="text-gray-600">Choose a template to send</p>
          </div>
          <Link href="/">
            <Button className="bg-gray-600 hover:bg-gray-700 text-white shadow-md">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Template Selection */}
          <Card className="border-2 bg-white/70 backdrop-blur-md shadow-xl border-white/20">
            <CardHeader className="bg-blue-50/80">
              <CardTitle className="text-black">Available Templates</CardTitle>
            </CardHeader>
            <CardContent className="p-6 max-h-[600px] overflow-y-auto">
              {Object.entries(groupedTemplates).map(([category, templates]) => (
                <div key={category} className="mb-6">
                  <h3 className="font-semibold text-sm text-gray-700 mb-3">{category}</h3>
                  <div className="space-y-2">
                    {templates.map((template) => (
                      <div
                        key={template.id}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                          selectedTemplate === template.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-400'
                        }`}
                        onClick={() => setSelectedTemplate(template.id)}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="radio"
                            checked={selectedTemplate === template.id}
                            onChange={() => setSelectedTemplate(template.id)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-black">{template.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                            <div className="text-xs text-gray-500 mt-2">
                              Variables: {template.variables.join(', ')}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Selected Template Actions */}
          <Card className="border-2 bg-white/70 backdrop-blur-md shadow-xl border-white/20">
            <CardHeader className="bg-green-50/80">
              <CardTitle className="text-black">Selected Template</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {!selectedTemplateObject ? (
                <p className="text-gray-500">No template selected</p>
              ) : (
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded p-4 border-2 border-blue-200">
                    <h3 className="font-semibold text-black">{selectedTemplateObject.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{selectedTemplateObject.description}</p>
                    <div className="mt-3">
                      <span className="text-xs font-medium text-gray-700">Required Variables:</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedTemplateObject.variables.map(variable => (
                          <span key={variable} className="bg-white px-3 py-1 rounded text-sm border">
                            {variable}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Button
                      onClick={handlePreview}
                      disabled={loadingPreview}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      {loadingPreview ? 'Loading Preview...' : 'Preview Template'}
                    </Button>

                    <Button
                      onClick={handleNext}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      Next: Enter Details
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Preview Modal */}
        {showPreview && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 z-50">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-white/20">
              <div className="p-4 border-b flex items-center justify-between bg-white/80">
                <h2 className="text-xl font-bold text-black">Template Preview</h2>
                <Button
                  onClick={() => setShowPreview(false)}
                  className="bg-gray-600 hover:bg-gray-700"
                >
                  Close
                </Button>
              </div>
              <div className="flex-1 overflow-auto p-6">
                <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

