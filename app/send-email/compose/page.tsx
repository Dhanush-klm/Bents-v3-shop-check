'use client';

import { useState, useEffect, Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Send, CheckCircle } from 'lucide-react';
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

function ComposeEmailContent() {
  const searchParams = useSearchParams();
  const template = searchParams.get('template') || '';
  
  const [recipientEmail, setRecipientEmail] = useState('');
  const [variables, setVariables] = useState<TemplateVariables>({});
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const templateVariables = TEMPLATE_VARIABLES[template] || [];

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
  }, [template]);

  // Sync userEmail with recipientEmail
  useEffect(() => {
    if (templateVariables.includes('userEmail')) {
      setVariables(prev => ({ ...prev, userEmail: recipientEmail }));
    }
  }, [recipientEmail]);

  const handleVariableChange = (varName: string, value: string) => {
    setVariables(prev => ({ ...prev, [varName]: value }));
  };

  const handleSendEmail = async () => {
    if (!recipientEmail || !template) {
      alert('Please enter recipient email');
      return;
    }

    // Validate all variables are filled
    const missingVars = templateVariables.filter(
      varName => !variables[varName] && varName !== 'userEmail'
    );
    if (missingVars.length > 0) {
      alert(`Please fill in all required variables: ${missingVars.join(', ')}`);
      return;
    }

    setSending(true);
    try {
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
          // Reset form
          setRecipientEmail('');
          setVariables({});
        }, 3000);
      } else {
        const error = await response.json();
        alert(`Failed to send email: ${error.message || 'Unknown error'}`);
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
            {/* Recipient Email */}
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

            {/* Template Variables */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-black mb-4">Template Variables</h3>
              <div className="space-y-4">
                {templateVariables
                  .filter(varName => varName !== 'userEmail') // Skip userEmail as it's auto-filled
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
              
              {templateVariables.includes('userEmail') && (
                <div className="mt-4 p-3 bg-gray-50 rounded border">
                  <p className="text-sm text-gray-600">
                    <strong>Note:</strong> userEmail will be set to the recipient email automatically
                  </p>
                </div>
              )}
            </div>

            {/* Send Button */}
            <div className="border-t pt-6">
              <Button
                onClick={handleSendEmail}
                disabled={sending || !recipientEmail}
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

