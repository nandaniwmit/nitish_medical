import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { X, Send, Phone, Upload, Image as ImageIcon, Trash2, Calendar, FileText } from 'lucide-react';
import { BUSINESS_INFO } from '../data';

interface WhatsAppOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WhatsAppOrderModal({ isOpen, onClose }: WhatsAppOrderModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    address: '',
    medicines: '',
    hasPrescription: 'No',
    message: '',
    deliveryTime: 'Anytime (8 AM - 10 PM)'
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setFormData(prev => ({ ...prev, hasPrescription: 'Yes' }));

      // Create object URL for image preview
      if (file.type.startsWith('image/')) {
        const previewUrl = URL.createObjectURL(file);
        setFilePreview(previewUrl);
      } else {
        setFilePreview(null); // PDF or other document
      }
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
    setFormData(prev => ({ ...prev, hasPrescription: 'No' }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Format the WhatsApp Message based on exact prompt format requirements
    const formattedMessage = `Hello Nitish Medical

*CUSTOMER ORDER DETAILS*
-----------------------------
*Customer Name:* ${formData.name}
*Phone:* ${formData.mobile}
*Email:* ${formData.email || 'N/A'}
*Medicine Required:* ${formData.medicines}
*Address:* ${formData.address}
*Prescription:* ${formData.hasPrescription}${selectedFile ? ` (${selectedFile.name})` : ''}
*Preferred Delivery Time:* ${formData.deliveryTime}
*Message:* ${formData.message || 'None'}
-----------------------------
Please check the availability and send the bill. Thank you!`;

    const encodedText = encodeURIComponent(formattedMessage);
    const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodedText}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" id="whatsapp-order-modal">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-2xl bg-white dark:bg-slate-900 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-xl border border-gray-100 dark:border-slate-800 animate-in zoom-in-95 duration-200">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 flex items-center justify-between text-white">
            <div className="flex items-center space-x-2.5">
              <div className="p-1.5 bg-white/10 rounded-lg">
                <FileText className="w-5 h-5 text-emerald-100" />
              </div>
              <div>
                <h3 className="text-lg font-bold">WhatsApp Order Form</h3>
                <p className="text-xs text-emerald-100/90">Fast medicine delivery in Tekari</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 hover:bg-white/10 text-white/90 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                  Customer Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                  className="w-full px-3 py-2 border border-gray-200 dark:border-slate-800 rounded-lg bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  name="mobile"
                  required
                  pattern="[0-9]{10}"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="10-digit mobile number"
                  className="w-full px-3 py-2 border border-gray-200 dark:border-slate-800 rounded-lg bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="yourname@gmail.com"
                  className="w-full px-3 py-2 border border-gray-200 dark:border-slate-800 rounded-lg bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                  Preferred Delivery Time
                </label>
                <select
                  name="deliveryTime"
                  value={formData.deliveryTime}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-slate-800 rounded-lg bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                >
                  <option>Anytime (8 AM - 10 PM)</option>
                  <option>Morning (8 AM - 12 PM)</option>
                  <option>Afternoon (12 PM - 4 PM)</option>
                  <option>Evening (4 PM - 8 PM)</option>
                  <option>Late Night (8 PM - 10 PM)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                Full Delivery Address *
              </label>
              <textarea
                name="address"
                required
                rows={2}
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Village/Street, Landmark, Ward, Tekari, Bihar"
                className="w-full px-3 py-2 border border-gray-200 dark:border-slate-800 rounded-lg bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                Medicines Required *
              </label>
              <textarea
                name="medicines"
                required
                rows={3}
                value={formData.medicines}
                onChange={handleInputChange}
                placeholder="List your required medicine names, syrup quantities, or tablet counts"
                className="w-full px-3 py-2 border border-gray-200 dark:border-slate-800 rounded-lg bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
              />
            </div>

            {/* File Upload Area */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                Upload Doctor Prescription (Optional)
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*,application/pdf"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center space-x-2 px-4 py-2.5 border-2 border-dashed border-gray-200 dark:border-slate-800 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:border-teal-500 hover:text-teal-500 dark:hover:border-teal-400 dark:hover:text-teal-400 transition"
                >
                  <Upload className="w-4 h-4" />
                  <span>Choose Image / PDF</span>
                </button>
                {selectedFile && (
                  <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[200px]">
                    {selectedFile.name}
                  </span>
                )}
              </div>

              {/* Prescription Image Preview */}
              {filePreview && (
                <div className="mt-3 relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200 dark:border-slate-800">
                  <img src={filePreview} alt="Prescription Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={removeFile}
                    className="absolute top-1 right-1 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full transition"
                    aria-label="Remove prescription"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                Extra Message or Instructions (Optional)
              </label>
              <textarea
                name="message"
                rows={2}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Any special remarks for our delivery team or pharmacist..."
                className="w-full px-3 py-2 border border-gray-200 dark:border-slate-800 rounded-lg bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
              />
            </div>

            {/* Action Buttons */}
            <div className="border-t border-gray-100 dark:border-slate-800 pt-4 flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="flex items-center justify-center space-x-2 py-2.5 px-4 border border-teal-600 text-teal-600 hover:bg-teal-50 dark:text-teal-400 dark:border-teal-400 dark:hover:bg-teal-950/25 rounded-xl font-bold text-sm text-center flex-1 transition"
              >
                <Phone className="w-4 h-4" />
                <span>Call Store First</span>
              </a>

              <button
                type="submit"
                className="flex items-center justify-center space-x-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white rounded-xl font-bold text-sm shadow-md flex-1 transition"
              >
                <Send className="w-4 h-4" />
                <span>Send via WhatsApp</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
