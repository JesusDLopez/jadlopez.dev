// src/components/Contact.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { FaEnvelope, FaGithub, FaLinkedin, FaChevronDown } from 'react-icons/fa';
import '../styles/Contact.css';

export default function Contact({ mode }) {
  const { isDark } = useTheme();
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'jlopezorourke@gmail.com';
  const formspreeId = import.meta.env.VITE_FORMSPREE_ID;
  const formspreeEndpoint = formspreeId ? `https://formspree.io/f/${formspreeId}` : null;

  // Expandable section state
  const [isWhatIDoExpanded, setIsWhatIDoExpanded] = useState(false);

  // Form state management (keeping Formspree integration)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success, error

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formspreeEndpoint) {
      setFormStatus('error');
      return;
    }
    setFormStatus('submitting');

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 5000);
      }
    } catch (error) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  return (
    <main className="contact-wrapper-minimal">
      <div className="contact-container-minimal">

        {/* Title & Subtitle */}
        <motion.div
          className="contact-header-minimal"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <h1 className="contact-title-minimal">
            I code and build<br />
            with biological and clinical insight.
          </h1>
          {/* OLD VERSION (Original - kept for reference):
          <p className="contact-subtitle-minimal">
            Open to freelance and roles — building with teams in genomics, medicine, and AI.
          </p>
          */}

          {/* NEW VERSION (Active): */}
        <p className="contact-subtitle-minimal">
          - I am open to freelance, or working long term with a team. -<br />
          Any involvement on exciting projects where I can help will be welcomed, but my main objective is to keep learning genetics (counselling and/or bioinformatics).
        </p>
        </motion.div>

        {/* Expandable "What I do" Section */}
        <motion.div
          className="expandable-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
        >
          <button
            className="expand-trigger"
            onClick={() => setIsWhatIDoExpanded(!isWhatIDoExpanded)}
            aria-expanded={isWhatIDoExpanded}
          >
            <span>What I do</span>
            <FaChevronDown
              className={`chevron-icon ${isWhatIDoExpanded ? 'rotated' : ''}`}
            />
          </button>

          <AnimatePresence>
            {isWhatIDoExpanded && (
              <motion.div
                className="expandable-content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="capabilities-grid">

                  {/* Tools I build - Adenine Red */}
                  <div className="capability-item">
                    <div className="capability-header">
                      <span className="nucleotide-dot adenine"></span>
                      <h3>Tools I build</h3>
                    </div>
                    <ul>
                      <li>Scientific web apps & visual platforms</li>
                      <li>Statistical interactive reports for research and biotech teams</li>
                    </ul>
                  </div>

                  {/* Scientific engineering - Cytosine Blue */}
                  <div className="capability-item">
                    <div className="capability-header">
                      <span className="nucleotide-dot cytosine"></span>
                      <h3>Scientific engineering</h3>
                    </div>
                    <ul>
                      <li>Functional prototypes for genomics & precision medicine</li>
                      <li>Systems that connect data, biology, and human understanding</li>
                    </ul>
                  </div>

                  {/* AI workflows - Guanine Green */}
                  <div className="capability-item">
                    <div className="capability-header">
                      <span className="nucleotide-dot guanine"></span>
                      <h3>AI workflows</h3>
                    </div>
                    <ul>
                      <li>Custom agent systems for research productivity</li>
                      <li>AI-assisted pipelines and experimental coding environments</li>
                    </ul>
                  </div>

                  {/* Growing domain - Thymine Yellow */}
                  <div className="capability-item">
                    <div className="capability-header">
                      <span className="nucleotide-dot thymine"></span>
                      <h3>Growing domain</h3>
                    </div>
                    <ul>
                      <li>Bioinformatics tooling (VCF, GWAS, variant analysis)</li>
                      <li>Clinical genomics & data interpretation (in development)</li>
                    </ul>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          className="contact-section-minimal"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
        >
          <h2 className="contact-heading-minimal">
            Would love to hear from you and your ideas
          </h2>

          {/* Contact Buttons */}
          <div className="contact-buttons-minimal">
            <a
              href={`mailto:${contactEmail}`}
              className="contact-btn-minimal"
              aria-label="Send email"
            >
              <FaEnvelope />
              <span>Email</span>
            </a>

            <a
              href="https://github.com/JesusDLopez"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-btn-minimal"
              aria-label="Visit GitHub profile"
            >
              <FaGithub />
              <span>GitHub</span>
            </a>

            <a
              href="https://www.linkedin.com/in/jesus-lopez-orourke/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-btn-minimal"
              aria-label="Visit LinkedIn profile"
            >
              <FaLinkedin />
              <span>LinkedIn</span>
            </a>
          </div>

          {/* Contact Form */}
          <form className="contact-form-minimal" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group-minimal">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Name"
                />
              </div>

              <div className="form-group-minimal">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Email"
                />
              </div>
            </div>

            <div className="form-group-minimal">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Tell me about your project or opportunity..."
              />
            </div>

            {/* Honeypot for spam protection */}
            <input
              type="text"
              name="_gotcha"
              style={{ display: 'none' }}
              tabIndex="-1"
              autoComplete="off"
            />

            <button
              type="submit"
              className="submit-button-minimal"
              disabled={formStatus === 'submitting' || !formspreeEndpoint}
            >
              {formspreeEndpoint
                ? formStatus === 'submitting' ? 'Sending...' : 'Send Message'
                : 'Form Disabled'}
            </button>

            {formStatus === 'success' && (
              <div className="form-message success">
                Message sent! I'll get back to you soon.
              </div>
            )}

            {formStatus === 'error' && (
              <div className="form-message error">
                {formspreeEndpoint
                  ? 'Something went wrong. Please try again or email me directly.'
                  : 'Contact form is not configured. Please email me directly.'}
              </div>
            )}
          </form>
        </motion.div>

      </div>
    </main>
  );
}
