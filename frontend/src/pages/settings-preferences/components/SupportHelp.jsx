import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SupportHelp = ({ isExpanded, onToggle }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: '',
    priority: 'medium'
  });

  const faqCategories = [
    {
      title: 'Getting Started',
      icon: 'Play',
      questions: [
        {
          id: 1,
          question: 'How do I add my first cat to the app?',
          answer: `To add your first cat:\n1. Go to Dashboard and click "Add Cat"\n2. Fill in basic information (name, breed, age)\n3. Upload a photo (optional)\n4. Set up initial health records\n5. Start logging daily activities`
        },
        {
          id: 2,
          question: 'What information should I track daily?',
          answer: `We recommend tracking:\n• Feeding times and amounts\n• Water intake\n• Litter box usage\n• Play and exercise activities\n• Any unusual behaviors\n• Medication administration\n• Weight changes (weekly)`
        }
      ]
    },
    {
      title: 'Health Records',
      icon: 'Heart',
      questions: [
        {
          id: 3,
          question: 'How do I add veterinary visit records?',
          answer: `To add vet visit records:\n1. Go to Health Records section\n2. Click "Add Visit"\n3. Enter visit date and veterinarian\n4. Add diagnosis, treatments, and medications\n5. Upload any test results or documents\n6. Set follow-up reminders if needed`
        },
        {
          id: 4,
          question: 'Can I share records with my veterinarian?',
          answer: `Yes! You can:\n• Export records as PDF for email\n• Generate summary reports for visits\n• Enable veterinary access in Privacy settings\n• Print records for physical copies\n• Share specific data ranges or complete history`
        }
      ]
    },
    {
      title: 'Data & Privacy',
      icon: 'Shield',
      questions: [
        {
          id: 5,
          question: 'Is my pet\'s data secure?',
          answer: `Your data is protected with:\n• End-to-end encryption\n• Secure cloud storage\n• Regular security audits\n• No data sharing without consent\n• GDPR compliance\n• Local device storage options`
        },
        {
          id: 6,
          question: 'How do I backup my data?',
          answer: `Data backup options:\n• Automatic daily cloud backup\n• Manual backup to cloud storage\n• Export to local files\n• Email backup copies\n• Multiple restore points\n• Cross-device synchronization`
        }
      ]
    }
  ];

  const supportChannels = [
    {
      title: 'Email Support',
      description: 'Get help within 24 hours',
      icon: 'Mail',
      contact: 'support@catcaretracker.com',
      availability: '24/7'
    },
    {
      title: 'Live Chat',
      description: 'Instant help during business hours',
      icon: 'MessageCircle',
      contact: 'Available in app',
      availability: 'Mon-Fri 9AM-6PM PST'
    },
    {
      title: 'Phone Support',
      description: 'Speak with our support team',
      icon: 'Phone',
      contact: '+1 (555) 123-CATS',
      availability: 'Mon-Fri 9AM-5PM PST'
    }
  ];

  const filteredFaqs = faqCategories?.map(category => ({
    ...category,
    questions: category?.questions?.filter(q => 
      searchQuery === '' || 
      q?.question?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      q?.answer?.toLowerCase()?.includes(searchQuery?.toLowerCase())
    )
  }))?.filter(category => category?.questions?.length > 0);

  const handleContactSubmit = () => {
    // Mock contact form submission
    setContactForm({ subject: '', message: '', priority: 'medium' });
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-colors duration-200"
      >
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
            <Icon name="HelpCircle" size={20} className="text-warning" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Support & Help</h3>
            <p className="text-sm text-muted-foreground">Get help, contact support, and find answers</p>
          </div>
        </div>
        <Icon 
          name="ChevronDown" 
          size={20} 
          className={`text-muted-foreground transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>
      {isExpanded && (
        <div className="px-6 pb-6 border-t border-border">
          <div className="space-y-6">
            {/* Search FAQs */}
            <div>
              <Input
                type="search"
                placeholder="Search help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="mb-4"
              />
            </div>

            {/* FAQ Section */}
            <div>
              <h4 className="font-medium text-foreground mb-4">Frequently Asked Questions</h4>
              <div className="space-y-4">
                {filteredFaqs?.map((category) => (
                  <div key={category?.title} className="border border-border rounded-lg">
                    <div className="p-4 bg-muted/30">
                      <div className="flex items-center space-x-3">
                        <Icon name={category?.icon} size={18} className="text-primary" />
                        <h5 className="font-medium text-foreground">{category?.title}</h5>
                      </div>
                    </div>
                    <div className="divide-y divide-border">
                      {category?.questions?.map((faq) => (
                        <div key={faq?.id}>
                          <button
                            onClick={() => setSelectedFaq(selectedFaq === faq?.id ? null : faq?.id)}
                            className="w-full p-4 text-left hover:bg-muted/30 transition-colors duration-200"
                          >
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-foreground">{faq?.question}</p>
                              <Icon 
                                name="ChevronDown" 
                                size={16} 
                                className={`text-muted-foreground transition-transform duration-200 ${
                                  selectedFaq === faq?.id ? 'rotate-180' : ''
                                }`}
                              />
                            </div>
                          </button>
                          {selectedFaq === faq?.id && (
                            <div className="px-4 pb-4">
                              <div className="bg-muted/20 p-3 rounded-lg">
                                <p className="text-sm text-muted-foreground whitespace-pre-line">
                                  {faq?.answer}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Support */}
            <div className="border-t border-border pt-6">
              <h4 className="font-medium text-foreground mb-4">Contact Support</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {supportChannels?.map((channel) => (
                  <div key={channel?.title} className="p-4 border border-border rounded-lg text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Icon name={channel?.icon} size={20} className="text-primary" />
                    </div>
                    <h5 className="font-medium text-foreground mb-1">{channel?.title}</h5>
                    <p className="text-xs text-muted-foreground mb-2">{channel?.description}</p>
                    <p className="text-xs font-medium text-primary">{channel?.contact}</p>
                    <p className="text-xs text-muted-foreground">{channel?.availability}</p>
                  </div>
                ))}
              </div>

              {/* Contact Form */}
              <div className="bg-muted/30 p-4 rounded-lg">
                <h5 className="font-medium text-foreground mb-4">Send us a message</h5>
                <div className="space-y-4">
                  <Input
                    label="Subject"
                    placeholder="Brief description of your issue"
                    value={contactForm?.subject}
                    onChange={(e) => setContactForm(prev => ({ ...prev, subject: e?.target?.value }))}
                  />
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                    <textarea
                      className="w-full p-3 border border-border rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      rows={4}
                      placeholder="Describe your issue or question in detail..."
                      value={contactForm?.message}
                      onChange={(e) => setContactForm(prev => ({ ...prev, message: e?.target?.value }))}
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <label className="text-sm font-medium text-foreground">Priority:</label>
                    <div className="flex space-x-3">
                      {['low', 'medium', 'high']?.map((priority) => (
                        <button
                          key={priority}
                          onClick={() => setContactForm(prev => ({ ...prev, priority }))}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
                            contactForm?.priority === priority
                              ? priority === 'high' ? 'bg-error text-error-foreground' :
                                priority === 'medium' ? 'bg-warning text-warning-foreground' :
                                'bg-success text-success-foreground' :'bg-muted text-muted-foreground hover:bg-muted/80'
                          }`}
                        >
                          {priority?.charAt(0)?.toUpperCase() + priority?.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                  <Button
                    variant="default"
                    onClick={handleContactSubmit}
                    iconName="Send"
                    iconPosition="left"
                    disabled={!contactForm?.subject || !contactForm?.message}
                  >
                    Send Message
                  </Button>
                </div>
              </div>
            </div>

            {/* App Information */}
            <div className="border-t border-border pt-6">
              <h4 className="font-medium text-foreground mb-4">App Information</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Version:</span>
                  <p className="font-medium text-foreground">1.2.3</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Build:</span>
                  <p className="font-medium text-foreground">2025.08.14</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Platform:</span>
                  <p className="font-medium text-foreground">Web App</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Last Update:</span>
                  <p className="font-medium text-foreground">Aug 10, 2025</p>
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <Button variant="outline" fullWidth iconName="ExternalLink" iconPosition="left">
                  Release Notes
                </Button>
                <Button variant="outline" fullWidth iconName="Star" iconPosition="left">
                  Rate the App
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportHelp;