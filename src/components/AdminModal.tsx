import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, Upload, Image, Trash2, Key, CheckCircle, AlertCircle, X, Plus, ShieldCheck } from 'lucide-react';
import { soundManager } from '../utils/audio';

export interface AdminMemory {
  id: string;
  title: string;
  caption: string;
  imageUrl: string;
  createdAt: string;
}

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMemoryAdded: (memory: AdminMemory) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  onMemoryAdded,
}) => {
  // Login credentials state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Upload memory state
  const [newTitle, setNewTitle] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [adminMemories, setAdminMemories] = useState<AdminMemory[]>([]);

  // Load saved admin memories from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('rakhi_admin_memories');
    if (saved) {
      try {
        setAdminMemories(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved memories', e);
      }
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Valid Admin Credentials:
    // Username: admin or madhuri
    // Password: rakhi123
    const validUsernames = ['admin', 'madhuri', 'brijesh'];
    const validPasswords = ['rakhi123', 'admin123', 'madhuri123'];

    if (
      validUsernames.includes(username.trim().toLowerCase()) &&
      validPasswords.includes(password.trim())
    ) {
      setIsAuthenticated(true);
      setLoginError('');
      soundManager.playBlessingSparkle();
    } else {
      setLoginError('Invalid Username or Password! (Hint: admin / rakhi123)');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagePreview || !newTitle.trim()) return;

    const newMemory: AdminMemory = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      caption: newCaption.trim() || 'A precious Rakhi memory cherished forever.',
      imageUrl: imagePreview,
      createdAt: new Date().toLocaleDateString(),
    };

    const updated = [newMemory, ...adminMemories];
    setAdminMemories(updated);
    localStorage.setItem('rakhi_admin_memories', JSON.stringify(updated));

    onMemoryAdded(newMemory);

    // Reset Form
    setNewTitle('');
    setNewCaption('');
    setImagePreview(null);
    setUploadSuccess(true);
    soundManager.playBlessingSparkle();

    setTimeout(() => setUploadSuccess(false), 3000);
  };

  const handleDeleteMemory = (id: string) => {
    const updated = adminMemories.filter((m) => m.id !== id);
    setAdminMemories(updated);
    localStorage.setItem('rakhi_admin_memories', JSON.stringify(updated));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="w-full max-w-2xl bg-white dark:bg-[#18132B] rounded-3xl p-6 sm:p-8 border-2 border-[#D4AF37] shadow-2xl relative overflow-hidden text-left"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-white hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!isAuthenticated ? (
            /* Login Screen */
            <div className="max-w-md mx-auto py-4">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-[#9E2A2B] to-[#D4AF37] flex items-center justify-center text-white shadow-lg mb-3">
                  <Lock className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#2C221E] dark:text-[#F4F1DE]">
                  Admin Access Portal
                </h3>
                <p className="text-xs text-[#2C221E]/70 dark:text-[#F4F1DE]/70 mt-1 font-light">
                  Please enter admin credentials to upload custom memory photos.
                </p>
              </div>

              {loginError && (
                <div className="mb-4 p-3 rounded-2xl bg-red-50 text-red-600 border border-red-200 text-xs flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-cinzel font-bold uppercase tracking-wider text-[#9E2A2B] mb-1">
                    Username
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. admin or madhuri"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#FAF7F2] dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm text-[#2C221E] dark:text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-cinzel font-bold uppercase tracking-wider text-[#9E2A2B] mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Key className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#FAF7F2] dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm text-[#2C221E] dark:text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#9E2A2B] via-[#E07A5F] to-[#D4AF37] text-white font-medium text-sm shadow-xl hover:scale-102 transition-transform flex items-center justify-center space-x-2"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Login to Admin Portal</span>
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-amber-50 dark:bg-white/5 border border-amber-200 dark:border-white/10 text-[11px] text-amber-800 dark:text-amber-200 text-center">
                  🔐 <strong>Default Credentials:</strong><br />
                  Username: <code className="font-bold">admin</code> or <code className="font-bold">madhuri</code><br />
                  Password: <code className="font-bold">rakhi123</code>
                </div>
              </form>
            </div>
          ) : (
            /* Upload & Manage Memories Dashboard */
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-2xl bg-[#9E2A2B]/10 text-[#9E2A2B]">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-[#2C221E] dark:text-[#F4F1DE]">
                      Admin Memory Upload
                    </h3>
                    <p className="text-xs text-[#2C221E]/70 dark:text-[#F4F1DE]/70">
                      Upload family photos to feature in the Memories Gallery!
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="text-xs text-red-500 hover:underline font-semibold"
                >
                  Logout
                </button>
              </div>

              {uploadSuccess && (
                <div className="mb-4 p-3 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Memory Photo successfully uploaded to gallery!</span>
                </div>
              )}

              <form onSubmit={handleUploadMemory} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-cinzel font-bold text-[#9E2A2B] mb-1">
                      Memory Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Diya Lighting Ceremonies"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-2xl bg-[#FAF7F2] dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm text-[#2C221E] dark:text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-cinzel font-bold text-[#9E2A2B] mb-1">
                      Memory Caption
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sharing smiles and sweets..."
                      value={newCaption}
                      onChange={(e) => setNewCaption(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-2xl bg-[#FAF7F2] dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm text-[#2C221E] dark:text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                {/* File Upload Box */}
                <div>
                  <label className="block text-xs font-cinzel font-bold text-[#9E2A2B] mb-1">
                    Select Image File *
                  </label>
                  <div className="border-2 border-dashed border-[#D4AF37]/60 rounded-3xl p-4 text-center bg-[#FAF7F2]/50 dark:bg-white/5 hover:bg-[#FAF7F2] transition-colors relative cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      required={!imagePreview}
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    {imagePreview ? (
                      <div className="relative aspect-video max-h-48 mx-auto rounded-2xl overflow-hidden shadow-md border border-[#D4AF37]">
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="py-4 flex flex-col items-center justify-center">
                        <Image className="w-8 h-8 text-[#D4AF37] mb-2" />
                        <p className="text-xs font-semibold text-[#2C221E] dark:text-white">
                          Click or drag photo here to upload
                        </p>
                        <p className="text-[10px] text-slate-400 mt-1">PNG, JPG, WEBP formats supported</p>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!imagePreview || !newTitle}
                  className="w-full py-3 rounded-full bg-gradient-to-r from-[#9E2A2B] via-[#E07A5F] to-[#D4AF37] text-white font-semibold text-xs shadow-md disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Memory to Gallery</span>
                </button>
              </form>

              {/* Uploaded Memories List */}
              {adminMemories.length > 0 && (
                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/10">
                  <h4 className="text-xs font-cinzel font-bold text-[#9E2A2B] mb-3">
                    Uploaded Memories ({adminMemories.length})
                  </h4>
                  <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                    {adminMemories.map((m) => (
                      <div
                        key={m.id}
                        className="flex items-center justify-between p-2.5 rounded-2xl bg-[#FAF7F2] dark:bg-white/5 border border-slate-100 dark:border-white/10"
                      >
                        <div className="flex items-center space-x-3">
                          <img src={m.imageUrl} alt={m.title} className="w-10 h-10 rounded-xl object-cover" />
                          <div>
                            <p className="text-xs font-bold text-[#2C221E] dark:text-white">{m.title}</p>
                            <p className="text-[10px] text-slate-500">{m.caption}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteMemory(m.id)}
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
