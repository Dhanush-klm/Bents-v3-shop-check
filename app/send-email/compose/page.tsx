'use client';

import { useState, useEffect, Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Send, CheckCircle, ChevronDown, ChevronRight, Users } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface TemplateVariables {
  [key: string]: string;
}

const TEMPLATE_VARIABLES: Record<string, string[]> = {
  'FreeUserWelcome': ['username', 'userEmail'],
  'ProTrialWelcome': ['username', 'userEmail'],
  'UpgradeConfirmation': ['username', 'userEmail'],
  'Week1PostCreation': ['username', 'userEmail'],
  'Week2PostCreation': ['username', 'userEmail'],
  'Week3PostCreation': ['username', 'userEmail'],
  'Week4PostCreation': ['username', 'userEmail'],
  'Day3TrialReminder': ['username', 'userEmail'],
  'Day5TrialEnding': ['username', 'userEmail'],
  'Day6TrialEndsTomorrow': ['username', 'userEmail'],
  'Day7TrialEndsToday': ['username', 'userEmail'],
  'NoActivityReengagement': ['username', 'userEmail'],
  'FeedbackSurvey30Days': ['username', 'userEmail'],
  'Delete': ['username', 'userEmail'],
  'PaymentError': ['username', 'userEmail'],
  'SubscriptionRenewal': ['username', 'userEmail', 'amount'],
  'SubscriptionRenewalWeek': ['username', 'userEmail', 'amount'],
  'SubscriptionRenewalDay': ['username', 'userEmail', 'amount'],
  'SubscriptionRenewed': ['username', 'userEmail', 'amount'],
  'SubscriptionCancelled': ['username', 'userEmail'],
  'Reactivation': ['username', 'userEmail'],
  'Month1PaidUser': ['username', 'userEmail'],
  'UnsubscribedAll': ['username', 'userEmail'],
  'UnsubscribeActivePaid': ['username', 'userEmail'],
  'Anniversary': ['username', 'userEmail', 'anniversaryDuration'],
  'MilestoneEmail': ['username', 'userEmail'],
};

// Placeholder examples for each variable type
const VARIABLE_PLACEHOLDERS: Record<string, string> = {
  'username': 'e.g., John Doe',
  'amount': 'e.g., $9.99',
  'anniversaryDuration': 'e.g., 1 year or 6 months',
};

interface Audience {
  id: string;
  name: string;
  object: string;
  created_at: string;
}

interface Contact {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  unsubscribed: boolean;
}

function ComposeEmailContent() {
  const searchParams = useSearchParams();
  const template = searchParams.get('template') || '';
  
  const [sendType, setSendType] = useState<'single' | 'audience'>('single');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [audiences, setAudiences] = useState<Audience[]>([]);
  const [selectedAudiences, setSelectedAudiences] = useState<string[]>([]);
  const [loadingAudiences, setLoadingAudiences] = useState(false);
  const [expandedAudiences, setExpandedAudiences] = useState<Set<string>>(new Set());
  const [audienceContacts, setAudienceContacts] = useState<Record<string, Contact[]>>({});
  const [loadingContacts, setLoadingContacts] = useState<Set<string>>(new Set());
  const [variables, setVariables] = useState<TemplateVariables>({});
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const templateVariables = TEMPLATE_VARIABLES[template] || [];

  // Fetch audiences on mount
  useEffect(() => {
    fetchAudiences();
  }, []);

  const fetchAudiences = async () => {
    try {
      setLoadingAudiences(true);
      const response = await fetch('/api/resend/audiences');
      if (response.ok) {
        const result = await response.json();
        const audiencesList = result.data?.data || result.data || [];
        setAudiences(Array.isArray(audiencesList) ? audiencesList : []);
      }
    } catch (error) {
      console.error('Failed to fetch audiences:', error);
      setAudiences([]);
    } finally {
      setLoadingAudiences(false);
    }
  };

  useEffect(() => {
    // Initialize variables with empty strings
    const initialVars: TemplateVariables = {};
    templateVariables.forEach(varName => {
      // Set userEmail to recipientEmail by default
      if (varName === 'userEmail') {
        initialVars[varName] = recipientEmail;
      } else {
        initialVars[varName] = '';
      }
    });
    setVariables(initialVars);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [template]);

  // Sync userEmail with recipientEmail
  useEffect(() => {
    if (templateVariables.includes('userEmail')) {
      setVariables(prev => ({ ...prev, userEmail: recipientEmail }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipientEmail]);

  const handleVariableChange = (varName: string, value: string) => {
    setVariables(prev => ({ ...prev, [varName]: value }));
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

  const toggleAudienceExpand = async (audienceId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent checkbox toggle
    
    const newExpanded = new Set(expandedAudiences);
    
    if (newExpanded.has(audienceId)) {
      newExpanded.delete(audienceId);
      setExpandedAudiences(newExpanded);
    } else {
      newExpanded.add(audienceId);
      setExpandedAudiences(newExpanded);
      
      // Fetch contacts if not already loaded
      if (!audienceContacts[audienceId]) {
        setLoadingContacts(prev => new Set(prev).add(audienceId));
        
        try {
          const response = await fetch(`/api/resend/audiences/${audienceId}/contacts`);
          if (response.ok) {
            const data = await response.json();
            setAudienceContacts(prev => ({
              ...prev,
              [audienceId]: data.contacts || []
            }));
          }
        } catch (error) {
          console.error('Failed to fetch contacts:', error);
        } finally {
          setLoadingContacts(prev => {
            const newSet = new Set(prev);
            newSet.delete(audienceId);
            return newSet;
          });
        }
      }
    }
  };

  const handleSendEmail = async () => {
    // Validate based on send type
    if (sendType === 'single') {
      if (!recipientEmail || !template) {
        alert('Please enter recipient email');
        return;
      }
    } else {
      if (selectedAudiences.length === 0) {
        alert('Please select at least one audience');
        return;
      }
    }

    // Validate all variables are filled (except username and userEmail which come from contacts)
    const missingVars = templateVariables.filter(
      varName => !variables[varName] && varName !== 'userEmail' && varName !== 'username'
    );
    if (missingVars.length > 0) {
      alert(`Please fill in all required variables: ${missingVars.join(', ')}`);
      return;
    }

    setSending(true);
    try {
      if (sendType === 'single') {
        const response = await fetch('/api/email/send-single', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: recipientEmail,
            template,
            variables,
          }),
        });

        if (response.ok) {
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
            setRecipientEmail('');
            setVariables({});
          }, 3000);
        } else {
          const error = await response.json();
          alert(`Failed to send email: ${error.message || 'Unknown error'}`);
        }
      } else {
        const response = await fetch('/api/email/send-to-audience', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            audienceIds: selectedAudiences,
            template,
            variables, // These are the common variables like amount, anniversaryDuration
          }),
        });

        if (response.ok) {
          const result = await response.json();
          setSuccess(true);
          alert(`✅ Success! Sent ${result.totalSent} emails to ${result.totalContacts} contacts across ${selectedAudiences.length} audience(s)`);
          setTimeout(() => {
            setSuccess(false);
            setSelectedAudiences([]);
            setVariables({});
          }, 3000);
        } else {
          const error = await response.json();
          alert(`Failed to send emails: ${error.message || 'Unknown error'}`);
        }
      }
    } catch (error) {
      console.error('Send error:', error);
      alert('Failed to send email');
    } finally {
      setSending(false);
    }
  };

  if (!template) {
    return (
      <div className="min-h-screen bg-white p-6">
        <div className="max-w-4xl mx-auto text-center mt-20">
          <p className="text-gray-600 mb-4">No template selected</p>
          <Link href="/send-email">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Select Template
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-violet-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-fuchsia-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-6000"></div>
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20">
          <div>
            <h1 className="text-4xl font-bold text-black mb-2">Compose Email</h1>
            <p className="text-gray-600">Template: <span className="font-semibold">{template}</span></p>
          </div>
          <Link href="/send-email">
            <Button className="bg-gray-600 hover:bg-gray-700 text-white shadow-md">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>

        <Card className="border-2 bg-white/70 backdrop-blur-md shadow-xl border-white/20">
          <CardHeader className="bg-blue-50/80">
            <CardTitle className="text-black">Email Details</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Send Type Selection */}
            <div>
              <Label className="text-sm font-medium text-black mb-3 block">
                Send To *
              </Label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="sendType"
                    value="single"
                    checked={sendType === 'single'}
                    onChange={() => setSendType('single')}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-black">Single Recipient</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="sendType"
                    value="audience"
                    checked={sendType === 'audience'}
                    onChange={() => setSendType('audience')}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-black">Send to Audience</span>
                </label>
              </div>
            </div>

            {/* Conditional: Single Recipient Email */}
            {sendType === 'single' && (
              <div>
                <Label htmlFor="recipient-email" className="text-sm font-medium text-black">
                  Recipient Email *
                </Label>
                <Input
                  id="recipient-email"
                  type="email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  placeholder="recipient@example.com"
                  className="mt-2 border-2 border-gray-300 text-black"
                />
              </div>
            )}

            {/* Conditional: Audience Selection */}
            {sendType === 'audience' && (
              <div>
                <Label className="text-sm font-medium text-black mb-2 block">
                  Select Audiences * ({selectedAudiences.length} selected)
                </Label>
                {loadingAudiences ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-sm text-black mt-2">Loading audiences...</p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[300px] overflow-y-auto border-2 border-gray-300 rounded-lg p-4">
                    {!Array.isArray(audiences) || audiences.length === 0 ? (
                      <p className="text-sm text-gray-500">No audiences found</p>
                    ) : (
                      audiences.map((audience) => {
                        const isExpanded = expandedAudiences.has(audience.id);
                        const contacts = audienceContacts[audience.id] || [];
                        const isLoadingContacts = loadingContacts.has(audience.id);
                        
                        return (
                          <div
                            key={audience.id}
                            className={`border-2 rounded-lg transition-all ${
                              selectedAudiences.includes(audience.id)
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-400'
                            }`}
                          >
                            <div 
                              className="p-3 cursor-pointer"
                              onClick={() => handleAudienceToggle(audience.id)}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 flex-1">
                                  <input
                                    type="checkbox"
                                    checked={selectedAudiences.includes(audience.id)}
                                    onChange={() => handleAudienceToggle(audience.id)}
                                    className="w-4 h-4 text-blue-600"
                                  />
                                  <div className="flex-1">
                                    <h4 className="font-medium text-sm text-black">{audience.name}</h4>
                                    <p className="text-xs text-gray-600">
                                      Created: {new Date(audience.created_at).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>
                                
                                <button
                                  onClick={(e) => toggleAudienceExpand(audience.id, e)}
                                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                                  title="View contacts"
                                >
                                  {isExpanded ? (
                                    <ChevronDown className="h-4 w-4 text-gray-600" />
                                  ) : (
                                    <ChevronRight className="h-4 w-4 text-gray-600" />
                                  )}
                                </button>
                              </div>
                            </div>
                            
                            {/* Expanded contacts list */}
                            {isExpanded && (
                              <div className="border-t px-3 py-2 bg-gray-50">
                                {isLoadingContacts ? (
                                  <div className="text-center py-2">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mx-auto"></div>
                                    <p className="text-xs text-gray-600 mt-1">Loading contacts...</p>
                                  </div>
                                ) : contacts.length === 0 ? (
                                  <p className="text-xs text-gray-500 py-2">No contacts in this audience</p>
                                ) : (
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-1 text-xs font-semibold text-gray-700 mb-2">
                                      <Users className="h-3 w-3" />
                                      <span>{contacts.length} contact{contacts.length !== 1 ? 's' : ''}</span>
                                    </div>
                                    <div className="max-h-32 overflow-y-auto space-y-1">
                                      {contacts.map((contact) => (
                                        <div 
                                          key={contact.id} 
                                          className={`text-xs py-1 px-2 rounded ${contact.unsubscribed ? 'text-gray-400 line-through' : 'text-gray-700'}`}
                                        >
                                          <span className="font-medium">
                                            {contact.first_name || contact.last_name 
                                              ? `${contact.first_name || ''} ${contact.last_name || ''}`.trim()
                                              : 'No name'
                                            }
                                          </span>
                                          <span className="text-gray-500"> — {contact.email}</span>
                                          {contact.unsubscribed && (
                                            <span className="text-red-500 ml-1">(unsubscribed)</span>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
                <p className="text-xs text-gray-600 mt-2">
                  ℹ️ Each contact will receive a personalized email using their name from Resend
                </p>
              </div>
            )}

            {/* Template Variables */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-black mb-4">Template Variables</h3>
              <div className="space-y-4">
                {templateVariables
                  .filter(varName => {
                    // For single recipient, skip userEmail
                    // For audience, skip both username and userEmail (they come from contacts)
                    if (sendType === 'audience') {
                      return varName !== 'userEmail' && varName !== 'username';
                    }
                    return varName !== 'userEmail';
                  })
                  .map((varName) => (
                    <div key={varName}>
                      <Label htmlFor={varName} className="text-sm font-medium text-black">
                        {varName} *
                      </Label>
                      <Input
                        id={varName}
                        value={variables[varName] || ''}
                        onChange={(e) => handleVariableChange(varName, e.target.value)}
                        placeholder={VARIABLE_PLACEHOLDERS[varName] || `Enter ${varName}`}
                        className="mt-2 border-2 border-gray-300 text-black"
                      />
                    </div>
                  ))}
              </div>
              
              {sendType === 'single' && templateVariables.includes('userEmail') && (
                <div className="mt-4 p-3 bg-gray-50 rounded border">
                  <p className="text-sm text-gray-600">
                    <strong>Note:</strong> userEmail will be set to the recipient email automatically
                  </p>
                </div>
              )}
              {sendType === 'audience' && (
                <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                  <p className="text-sm text-gray-700">
                    <strong>📧 Personalized Emails:</strong> Each contact will receive an email with their name and email from Resend. Common variables (like amount, anniversaryDuration) will be the same for all recipients.
                  </p>
                </div>
              )}
            </div>

            {/* Send Button */}
            <div className="border-t pt-6">
              <Button
                onClick={handleSendEmail}
                disabled={sending || (sendType === 'single' ? !recipientEmail : selectedAudiences.length === 0)}
                className="w-full bg-green-600 hover:bg-green-700 text-white disabled:opacity-50"
                size="lg"
              >
                {sending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : success ? (
                  <>
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Email Sent Successfully!
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Send Email
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function ComposeEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <ComposeEmailContent />
    </Suspense>
  );
}

