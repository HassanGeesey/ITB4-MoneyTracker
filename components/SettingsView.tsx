
import React from 'react';
import { isFirebaseConfigured } from '../firebase';

const SettingsView: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-bold text-[#0f181a]">System Settings</h3>
        <p className="text-secondary text-sm">Configure your application data and integrations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Firebase Configuration Card */}
        <div className="bg-white p-6 rounded-2xl border border-[#d1e2e5] shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="size-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined">local_fire_department</span>
              </div>
              <div>
                <h4 className="font-bold text-[#0f181a]">Firebase Integration</h4>
                <div className="flex items-center gap-2">
                  <span className={`size-2 rounded-full ${isFirebaseConfigured ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  <span className="text-[10px] font-bold uppercase text-secondary">
                    {isFirebaseConfigured ? 'Connected' : 'Not Configured'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-secondary leading-relaxed">
              Sync your data across devices by connecting to Google Firebase. This will enable real-time updates and secure cloud storage.
            </p>

            {!isFirebaseConfigured && (
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
                <h5 className="text-xs font-bold text-blue-800 uppercase mb-2">How to connect:</h5>
                <ol className="text-xs text-blue-700 space-y-2 list-decimal ml-4">
                  <li>Go to the <b>Firebase Console</b>.</li>
                  <li>Add a <b>Web App</b> to your project.</li>
                  <li>Copy the configuration object.</li>
                  <li>Paste it into the <code>firebase.ts</code> file in this project.</li>
                  <li>Enable <b>Cloud Firestore</b> in your Firebase dashboard.</li>
                </ol>
              </div>
            )}

            <button className="w-full py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
              {isFirebaseConfigured ? 'Update Configuration' : 'Connect Firebase'}
            </button>
          </div>
        </div>

        {/* Local Storage Stats */}
        <div className="bg-white p-6 rounded-2xl border border-[#d1e2e5] shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="size-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined">database</span>
            </div>
            <div>
              <h4 className="font-bold text-[#0f181a]">Local Database</h4>
              <p className="text-[10px] font-bold uppercase text-secondary">Browser Storage</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-sm text-secondary">Cache Status</span>
              <span className="text-sm font-bold text-green-600">Active</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-sm text-secondary">Last Sync</span>
              <span className="text-sm font-bold text-[#0f181a]">Just now</span>
            </div>
            <p className="text-xs text-secondary italic">
              When Firebase is offline, your data is saved locally in the browser and will sync once connection is restored.
            </p>
            <button className="w-full py-3 border border-red-200 text-red-500 font-bold rounded-xl hover:bg-red-50 transition-all">
              Clear Local Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
